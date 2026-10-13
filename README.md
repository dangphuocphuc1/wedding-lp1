# Thiệp cưới · Khu vườn nhỏ

Bộ khung React + TypeScript + Vite, ưu tiên điện thoại. Nội dung và ảnh hiện tại là minh họa.

## Chạy trong máy

```sh
npm install
npm run dev
```

Mở URL Vite in ra (thường là http://localhost:5173).

```sh
npm run build
npm run preview
```

## Đổi nội dung

- `src/data/wedding.ts`: tên, gia đình, ngày giờ, địa điểm, câu chuyện, ảnh, lịch trình, dress code, tài khoản/QR.
- `index.html`: tiêu đề, mô tả và metadata chia sẻ của thiệp thật.
- `src/styles.css`: màu sắc, font, bố cục và responsive.
- `src/theme.css`: phong cách toàn web theo thiệp giấy màu nước, bảng màu olive/đỏ rượu, khung ảnh, thẻ sự kiện và sổ lời chúc; được nạp sau CSS cơ bản.
- `src/cover.css`: bố cục thiệp mở đầu trên laptop/điện thoại, sử dụng font viết tay lưu tại `public/fonts/`.
- `src/ornaments.css`: bộ họa tiết hoa hồng phấn, đèn lồng, vải xanh và bình phong; ảnh trang trí tại `public/images/wedding-lantern-floral.png` và `public/images/wedding-floral-sprig.png`. Prompt được lưu trong `docs/floral-ornaments.md`.
- `src/watercolor.css`: quạt giấy xanh sage, nền giấy màu nước và cánh hoa hồng rơi; ba ảnh tại `public/images/wedding-sage-fan.png`, `wedding-watercolor-paper.png` và `wedding-petal.png`. Prompt trong `docs/fans-watercolor.md`.
- `src/celebration-layout.css`: trang đầu phủ chiều rộng/cao màn hình laptop từ 1024px, thiệp dọc trên điện thoại, các cụm đèn lồng treo và nền màu nước/trắng xen kẽ với chuyển tiếp mềm.
- Đặt ảnh thật trong `public/images/`, rồi dùng đường dẫn `/images/ten-anh.webp` trong cấu hình. Ảnh minh họa Unsplash đã lưu tại dự án; font tải từ Google Fonts, cần mạng và có font dự phòng. Có thể lưu font tại dự án trước khi phát hành.

Ảnh minh họa gốc: [1](https://images.unsplash.com/photo-1519741497674-611481863552), [2](https://images.unsplash.com/photo-1511285560929-80b456fea0bc), [3](https://images.unsplash.com/photo-1523438885200-e635ba2c371e), [4](https://images.unsplash.com/photo-1529636798458-92182e662485).

## Có sẵn

### Thư mời theo URL

Link `/?invite=ph` tự mở lá thư riêng cho khách có mã `ph`. Thư gồm tên người được mời, lời mời tham dự, thời gian/địa điểm tiệc và lời cảm ơn. Có thể đóng bằng nút ×, Escape hoặc “Xem thiệp cưới”, rồi mở lại bằng nút “Thư mời” ở góc màn hình.

Danh sách khách được quản lý trong bảng `public.invitees` trên Supabase. Thiết lập lần đầu:

1. Trong **SQL Editor** của project Supabase đang dùng cho lời chúc, chạy toàn bộ `supabase/invitees.sql`. File tạo bảng, quyền tra mã và nhập danh sách hiện tại (`ph → Phúc`); chạy lại không ghi đè khách đã có.
2. Vào **Table Editor → invitees** để thêm/sửa khách: `code` là mã viết thường, `name` là tên hiển thị, `active` bật/tắt thư mời. Ví dụ `code=al`, `name=Chị Lan`, `active=true`.
3. Gửi link `/?invite=al`. Thay đổi tên hoặc thêm khách trên DB có hiệu lực khi mở/tải lại link, không cần build lại website.

Sử dụng cùng `VITE_SUPABASE_URL` và `VITE_SUPABASE_PUBLISHABLE_KEY` trong `.env.local`. Mã dài tối đa 64 ký tự, bắt đầu bằng chữ/số, gồm chữ thường, số, `_` hoặc `-`; tên dài tối đa 100 ký tự và có thể gồm cách xưng hô hoặc tên gia đình. Không có mã hoặc không tìm thấy khách đang bật thì website hiển thị bình thường. Lỗi kết nối có nút thử lại và không dùng tên từ danh sách cũ.

Website chỉ gọi RPC `lookup_invitee` để tra một mã; không có quyền đọc cả bảng, thêm/sửa/xóa khách. File `src/data/invitees.ts` chỉ giữ bản lưu danh sách cũ, không còn được website sử dụng. Tham khảo cách giới hạn quyền cho RPC trong [tài liệu Supabase](https://supabase.com/docs/guides/database/functions). Kiểm tra logic bằng `npm run test:invitation`.

Màn mở thiệp và điều hướng, lời mời, hai gia đình, câu chuyện, album với cửa sổ xem ảnh lớn (phím trái/phải và Escape), lễ/tiệc, đếm ngược, tải lịch `.ics`, liên kết chỉ đường, lịch trình, dress code, RSVP, lưu bút, hộp quà và lời cảm ơn. Có menu điện thoại, hỗ trợ bàn phím, giảm chuyển động và trạng thái khi ngày cưới đã qua.

## Giới hạn bản khung

RSVP vẫn lưu trong `localStorage` của trình duyệt. Lời chúc hỗ trợ Supabase theo hướng dẫn dưới đây; khi chưa có cấu hình, chỉ lưu thử trên thiết bị. Không tự đưa lời chúc thử lên cơ sở dữ liệu. Danh sách lời chúc dài cuộn nối tiếp theo vòng lặp, ẩn scrollbar, hỗ trợ cuộn tay/tạm dừng và chế độ giảm chuyển động.

## Lưu lời chúc dùng chung trên web

1. Tạo project tại [Supabase](https://supabase.com/dashboard).
2. Mở **SQL Editor**, chạy toàn bộ `supabase/wishes.sql` để tạo bảng và quyền đọc/gửi. Khách không có quyền sửa hoặc xóa lời chúc.
3. Copy `.env.example` thành `.env.local`, điền **Project URL** và **publishable key** (hoặc anon key cũ). URL ở Integrations → Data API; key ở Settings → API Keys. Không dùng secret hoặc service_role key trong các biến `VITE_*`.

   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_your_key
   ```

4. Khởi động lại `npm run dev`. Gửi lời chúc từ một trình duyệt rồi mở trình duyệt khác để kiểm tra dữ liệu dùng chung.
5. Khi triển khai hosting, thêm hai biến môi trường vào cấu hình **build** và build/deploy lại. Vite đưa cấu hình vào bundle lúc build; sửa biến trên hosting mà không build lại sẽ chưa áp dụng.

Danh sách tải 200 lời chúc mới nhất, làm mới mỗi 30 giây khi trang đang mở. Lời chúc được lưu tại Supabase ngay khi gửi thành công, không cần giữ trình duyệt mở. Nếu gửi lỗi, form giữ nguyên nội dung và không báo thành công hay chuyển sang lưu cục bộ.

Tên và lời chúc được hiển thị công khai. SQL giới hạn độ dài và quyền truy cập; chưa bổ sung CAPTCHA, giới hạn tần suất hay quy trình duyệt lời chúc. Trước khi chia sẻ rộng rãi, có thể thêm các phần này qua endpoint server. RSVP cần backend riêng nếu muốn thu thập tập trung.

Tham khảo: [Data REST API](https://supabase.com/docs/guides/api), [API keys](https://supabase.com/docs/guides/getting-started/api-keys), [Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security).

Phần quà mừng không dùng tài khoản giả. Thêm mục vào `wedding.gifts` để hiển thị QR và nút sao chép. Cập nhật địa chỉ đầy đủ của từng sự kiện và `mapUrl` trước khi sử dụng. Nhạc nền và trang quản lý chưa nằm trong bản khung.

Chưa triển khai hosting. `dist/` sau khi build là tài nguyên tĩnh để triển khai khi nội dung và chức năng thật đã sẵn sàng.
