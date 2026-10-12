# Bộ họa tiết hoa và đèn lồng

Tạo bằng công cụ imagegen tích hợp (built-in), lấy ảnh người dùng gửi làm tham khảo phong cách. Hai ảnh nền trong suốt được lưu trong dự án:

- `public/images/wedding-lantern-floral.png`: cụm hoa, đèn lồng, vải xanh nhạt và bình phong.
- `public/images/wedding-floral-sprig.png`: nhánh hoa nhỏ dùng ở viền, tiêu đề, avatar trang trí và góc thẻ.

`src/components/Botanical.tsx` sử dụng hai ảnh mới thay cho họa tiết SVG cũ. `src/ornaments.css` điều chỉnh kích thước và vị trí trên desktop/điện thoại. Nội dung và dữ liệu khách giữ nguyên. Ảnh cover cũ được giữ trong thư mục nhưng không còn được dùng ở trang đầu.

## Prompt 1 — Cụm trang trí

Use case: stylized-concept. Asset type: transparent botanical ornament for a Vietnamese wedding invitation website. Create a refined photorealistic cut-paper floral installation inspired by traditional Vietnamese wedding decoration: abundant blush pink lotus-like peonies and pale pink orchids, a few pink roses, long delicate white flowering branches extending diagonally to the upper left, green lotus seed pods and sparse natural leaves, a translucent pale sage and ivory organza drape hanging in a long graceful loop, two warm pale yellow round ribbed silk lanterns with tassels at staggered heights, and a narrow natural brown carved wooden folding screen behind the right edge. Entire installation visible in a tall portrait composition, ornament anchored on the right with stems extending slightly left. Soft natural daylight, romantic muted colors, fine realistic botanical details, lightweight editorial stationery collage rather than illustration. Everything outside the installation must be genuinely transparent alpha. No backdrop, no floor, no scenery, no white rectangle, no paper texture background, no text, no watermark, no signatures. Keep branches and drape elegant and slender. Do not include green paper fans or cartoon daisy flowers.

## Prompt 2 — Nhánh hoa nhỏ

Use case: stylized-concept. Asset type: small transparent floral embellishment for a Vietnamese wedding invitation website. Create a small elegant blush pink floral sprig: two soft pale pink lotus-peony blossoms and a tiny pale orchid blossom, a few natural muted sage leaves, a green lotus seed pod and a slender twig with tiny ivory flowering buds. Close-up photorealistic cut-paper botanical collage in soft daylight, muted romantic vintage stationery style, fine realistic layered petals, light and airy rather than dense bouquet. Compact diagonal composition suitable for corner decorations and small ornaments. Every area outside the flowers and twig must be genuinely transparent alpha. No paper, no background, no vase, no lanterns, no wood screen, no text, no watermark, no flat vector or cartoon flowers.
