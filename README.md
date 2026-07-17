# Todo Dashboard

Ứng dụng quản lý công việc dạng dashboard, xây bằng React, TypeScript, Vite, Tailwind CSS và Ant Design.

## Tính năng

- Hiển thị danh sách công việc theo dạng card.
- Thêm, chỉnh sửa, xóa công việc bằng modal.
- Xác nhận trước khi xóa task.
- Tự động gán `createdAt` bằng thời gian hiện tại khi tạo mới.
- Lọc theo tiêu đề, trạng thái, độ ưu tiên.
- Sắp xếp theo deadline gần nhất hoặc task mới tạo nhất.
- Phân trang, tối đa 9 task mỗi trang.
- Lưu task và bộ lọc vào `localStorage`.

## Công nghệ

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Ant Design
- Ant Design Icons

## Cấu trúc chính

```text
src/
  components/
    FilterBar.tsx      # Bộ lọc và sắp xếp
    Sidebar.tsx        # Sidebar và nút thêm task
    TaskCard.tsx       # Card hiển thị một task
    TaskList.tsx       # Danh sách card + phân trang
    TaskModal.tsx      # Form thêm/sửa/xóa task
  data/
    tasks.ts           # Mock task ban đầu
  hooks/
    useLocalStorage.ts # Hook lưu và đồng bộ localStorage
  types/
    task.ts            # Type Task, Status, Priority, FilterState
  utils/
    date.ts            # Format ngày giờ
  App.tsx              # Ghép layout, state, filter/sort, handlers
```

