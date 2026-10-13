import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import ts from "typescript";

const source = await readFile(new URL("../src/lib/invitation.ts", import.meta.url), "utf8");
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022 },
});
const { getInviteCode, loadInvitee } = await import(
  `data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`
);
const config = { projectUrl: "https://example.supabase.co", publicKey: "sb_publishable_test" };

test("đúng mã mở thư cho đúng người, hỗ trợ hoa thường và mã URL", () => {
  assert.equal(getInviteCode("?invite=ph"), "ph");
  assert.equal(getInviteCode("?other=1&invite=%20PH%20"), "ph");
  assert.equal(getInviteCode("?invite=lan-02"), "lan-02");
});

test("không gửi truy vấn khi thiếu mã, sai định dạng, quá dài hoặc URL lỗi", () => {
  for (const search of ["", "?other=ph", "?invite=", "?invite=%E0%A4%A", "?invite=__proto__", `?invite=${"a".repeat(65)}`, "?invite=<script>"]) {
    assert.equal(getInviteCode(search), null);
  }
});

test("tra đúng mã qua RPC, không tải danh sách, chuyển tiếp tín hiệu hủy", async (t) => {
  const controller = new AbortController();
  t.mock.method(globalThis, "fetch", async (url, options) => {
    assert.equal(url, "https://example.supabase.co/rest/v1/rpc/lookup_invitee");
    assert.equal(options.method, "POST");
    assert.deepEqual(JSON.parse(options.body), { invite_code: "ph" });
    assert.equal(options.headers.apikey, config.publicKey);
    assert.equal(options.headers.Authorization, undefined);
    assert.equal(options.signal, controller.signal);
    return Response.json(" Phúc ");
  });
  assert.equal(await loadInvitee("ph", config, controller.signal), "Phúc");
});

test("không mở thư khi DB không tìm thấy mã", async (t) => {
  t.mock.method(globalThis, "fetch", async () => Response.json(null));
  assert.equal(await loadInvitee("unknown", config), null);
});

test("lỗi kết nối và dữ liệu lỗi cần hiển thị thử lại", async (t) => {
  const responses = [new Response("", { status: 500 }), Response.json([]), Response.json("   ")];
  t.mock.method(globalThis, "fetch", async () => responses.shift());
  for (let index = 0; index < 3; index++) await assert.rejects(loadInvitee("ph", config));
});

test("giữ hành vi hủy yêu cầu khi chuyển link", async (t) => {
  const controller = new AbortController();
  controller.abort();
  t.mock.method(globalThis, "fetch", async (_url, options) => {
    options.signal.throwIfAborted();
  });
  await assert.rejects(loadInvitee("ph", config, controller.signal), { name: "AbortError" });
});

test("không gửi yêu cầu khi thiếu cấu hình hoặc dùng secret key", async (t) => {
  const fetchMock = t.mock.method(globalThis, "fetch", async () => { throw new Error("Không được gọi"); });
  await assert.rejects(loadInvitee("ph", { projectUrl: "", publicKey: "" }));
  await assert.rejects(loadInvitee("ph", { ...config, publicKey: "sb_secret_test" }));
  assert.equal(fetchMock.mock.callCount(), 0);
});

test("hỗ trợ anon JWT cũ", async (t) => {
  t.mock.method(globalThis, "fetch", async (_url, options) => {
    assert.equal(options.headers.Authorization, "Bearer eyJtest");
    return Response.json("Chị Lan");
  });
  assert.equal(await loadInvitee("al", { ...config, publicKey: "eyJtest" }), "Chị Lan");
});
