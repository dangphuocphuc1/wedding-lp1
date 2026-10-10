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
- Đặt ảnh thật trong `public/images/`, rồi dùng đường dẫn `/images/ten-anh.webp` trong cấu hình. Ảnh minh họa Unsplash đã lưu tại dự án; font tải từ Google Fonts, cần mạng và có font dự phòng. Có thể lưu font tại dự án trước khi phát hành.

Ảnh minh họa gốc: [1](https://images.unsplash.com/photo-1519741497674-611481863552), [2](https://images.unsplash.com/photo-1511285560929-80b456fea0bc), [3](https://images.unsplash.com/photo-1523438885200-e635ba2c371e), [4](https://images.unsplash.com/photo-1529636798458-92182e662485).

## Có sẵn

Màn mở thiệp và điều hướng, lời mời, hai gia đình, câu chuyện, album với cửa sổ xem ảnh lớn (phím trái/phải và Escape), lễ/tiệc, đếm ngược, tải lịch `.ics`, liên kết chỉ đường, lịch trình, dress code, RSVP, lưu bút, hộp quà và lời cảm ơn. Có menu điện thoại, hỗ trợ bàn phím, giảm chuyển động và trạng thái khi ngày cưới đã qua.

## Giới hạn bản khung

RSVP và lời chúc chỉ lưu trong `localStorage` của trình duyệt, chưa gửi cho chủ thiệp hay chia sẻ giữa thiết bị. Để gửi khách thật, thay các hàm trong `src/lib/storage.ts` bằng API, bổ sung xác thực dữ liệu phía server, hạn chế spam, quyền truy cập danh sách khách và duyệt lời chúc. Không đưa khóa bí mật vào frontend.

Phần quà mừng không dùng tài khoản giả. Thêm mục vào `wedding.gifts` để hiển thị QR và nút sao chép. Cập nhật địa chỉ đầy đủ của từng sự kiện và `mapUrl` trước khi sử dụng. Nhạc nền và trang quản lý chưa nằm trong bản khung.

Chưa triển khai hosting. `dist/` sau khi build là tài nguyên tĩnh để triển khai khi nội dung và chức năng thật đã sẵn sàng.
