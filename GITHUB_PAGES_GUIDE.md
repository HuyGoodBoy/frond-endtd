# Hướng dẫn chi tiết triển khai lên GitHub Pages

## Nguyên nhân và cách khắc phục lỗi trang trắng (blank page) trên GitHub Pages

Khi bạn triển khai ứng dụng React lên GitHub Pages, có một số vấn đề thường gặp có thể dẫn đến việc trang web hiển thị trắng. Dưới đây là hướng dẫn chi tiết để khắc phục.

### 1. Kiểm tra cấu hình base URL trong Vite

File `vite.config.js` cần có cấu hình base URL đúng:

```js
export default defineConfig({
  plugins: [react()],
  base: './',  // Đảm bảo cấu hình này tồn tại
  // ...
})
```

### 2. Kiểm tra đường dẫn trong mã nguồn

- Đảm bảo tất cả các đường dẫn trong code đều sử dụng đường dẫn tương đối (bắt đầu bằng `./`)
- Không sử dụng đường dẫn tuyệt đối (bắt đầu bằng `/`)
- Kiểm tra các đường dẫn trong:
  - Tệp CSS/SCSS
  - Các thẻ `<img>`, `<link>`, `<script>`
  - Import statements trong JavaScript/React

### 3. Kiểm tra cấu hình React Router (nếu sử dụng)

Nếu bạn sử dụng React Router, cần cấu hình basename:

```jsx
<Router basename={process.env.PUBLIC_URL}>
  {/* Routes */}
</Router>
```

hoặc đối với React Router v6:

```jsx
<BrowserRouter basename="/">
  {/* Routes */}
</BrowserRouter>
```

Trong một số trường hợp, bạn cần sử dụng HashRouter thay vì BrowserRouter:

```jsx
<HashRouter>
  {/* Routes */}
</HashRouter>
```

### 4. Quy trình triển khai chính xác

1. **Chuẩn bị repository**:
   - Đảm bảo repository là public
   - Cấu hình `vite.config.js` với `base: './'`
   - Đảm bảo `homepage: "."` trong package.json

2. **Build và triển khai**:
   - Chạy `npm run predeploy` (script này sẽ build và chuẩn bị tệp để triển khai)
   - Chạy `npm run deploy` (script này sẽ đẩy lên branch gh-pages)

3. **Cấu hình GitHub Pages**:
   - Truy cập repository trên GitHub
   - Đi đến Settings > Pages
   - Chọn branch `gh-pages` và thư mục `/ (root)`
   - Nhấn Save

4. **Kiểm tra triển khai**:
   - Đợi vài phút để GitHub Pages xây dựng trang web
   - Truy cập `https://[username].github.io/[repository-name]/`
   - Kiểm tra console (F12) để xem lỗi nếu có

### 5. Khắc phục sự cố trang trắng

Nếu bạn vẫn gặp trang trắng sau khi triển khai:

1. **Kiểm tra console trình duyệt**:
   - Mở developer tools (F12)
   - Xem tab Console để tìm lỗi JavaScript
   - Xem tab Network để kiểm tra các tệp bị lỗi 404

2. **Lỗi 404 cho JavaScript/CSS**:
   - Nếu bạn thấy lỗi 404, đường dẫn đến tệp không chính xác
   - Kiểm tra lại cấu hình `base` trong vite.config.js

3. **Kiểm tra cấu trúc thư mục gh-pages**:
   - Đảm bảo thư mục gh-pages có file `index.html` ở thư mục gốc
   - Đảm bảo các tệp tài nguyên (assets) được bao gồm

4. **Thử dùng HashRouter thay vì BrowserRouter**:
   - HashRouter thường hoạt động tốt hơn với GitHub Pages vì nó sử dụng # trong URL

5. **Xóa cache trình duyệt**:
   - Đôi khi cache trình duyệt có thể gây ra vấn đề
   - Thử tải lại trang với Ctrl+F5

### 6. Checklist cuối cùng

- [ ] `vite.config.js` có cấu hình `base: './'`
- [ ] `package.json` có `"homepage": "."`
- [ ] Tất cả đường dẫn trong code dùng đường dẫn tương đối
- [ ] Branch gh-pages có file index.html ở thư mục gốc
- [ ] Cài đặt GitHub Pages chỉ đến branch gh-pages và thư mục / (root)
- [ ] Đợi đủ thời gian để GitHub Pages xây dựng trang web (vài phút)
- [ ] Kiểm tra console trình duyệt để xem lỗi

## Lệnh hữu ích

```bash
# Cài đặt các gói cần thiết
npm install gh-pages fs-extra --save-dev

# Build và chuẩn bị tệp để triển khai
npm run predeploy

# Triển khai lên GitHub Pages
npm run deploy
``` 