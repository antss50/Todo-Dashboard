import type { Task } from '../types/task'

export const initialTasks: Task[] = [
  {
    id: '1697364000000',
    title: 'Hoàn thành báo cáo quý',
    description:
      'Tổng hợp số liệu, rà soát biểu đồ và gửi bản cuối cho quản lý trước thời hạn.',
    deadline: new Date('2023-10-15T17:00:00'),
    status: 'In Progress',
    priority: 'Urgent',
    createdAt: new Date('2023-10-12T09:00:00'),
  },
  {
    id: '1700883000000',
    title: 'Họp team marketing',
    description:
      'Chuẩn bị agenda, cập nhật tiến độ chiến dịch và chốt kế hoạch nội dung tuần tới.',
    deadline: new Date('2023-11-25T09:30:00'),
    status: 'To Do',
    priority: 'Medium',
    createdAt: new Date('2023-11-20T08:30:00'),
  },
  {
    id: '1699603200000',
    title: 'Gửi email cho đối tác',
    description:
      'Gửi bản proposal mới, xác nhận timeline triển khai và các đầu mối liên hệ.',
    deadline: new Date('2023-11-10T14:00:00'),
    status: 'Done',
    priority: 'Low',
    createdAt: new Date('2023-11-09T10:00:00'),
  },
  {
    id: '1701513000000',
    title: 'Thiết kế màn hình đăng nhập',
    description:
      'Hoàn thiện layout form, trạng thái lỗi và responsive cho màn hình đăng nhập.',
    deadline: new Date('2023-12-02T16:30:00'),
    status: 'In Progress',
    priority: 'High',
    createdAt: new Date('2023-11-28T09:15:00'),
  },
  {
    id: '1701662400000',
    title: 'Kiểm tra API danh sách task',
    description:
      'Test dữ liệu trả về, trạng thái lỗi và mapping field trước khi nối UI thật.',
    deadline: new Date('2023-12-04T11:00:00'),
    status: 'To Do',
    priority: 'Medium',
    createdAt: new Date('2023-11-30T13:20:00'),
  },
  {
    id: '1701853200000',
    title: 'Cập nhật tài liệu hướng dẫn',
    description:
      'Bổ sung luồng tạo task, chỉnh sửa task và xóa task vào tài liệu nội bộ.',
    deadline: new Date('2023-12-06T15:00:00'),
    status: 'Done',
    priority: 'Low',
    createdAt: new Date('2023-12-01T10:40:00'),
  },
  {
    id: '1702006200000',
    title: 'Review pull request dashboard',
    description:
      'Rà soát component, style Tailwind và cách xử lý state trước khi merge.',
    deadline: new Date('2023-12-08T10:30:00'),
    status: 'In Progress',
    priority: 'High',
    createdAt: new Date('2023-12-04T08:50:00'),
  },
  {
    id: '1702132200000',
    title: 'Chuẩn bị demo cuối tuần',
    description:
      'Sắp xếp dữ liệu mẫu, kiểm tra flow thêm sửa xóa và chuẩn bị checklist demo.',
    deadline: new Date('2023-12-09T17:30:00'),
    status: 'To Do',
    priority: 'Urgent',
    createdAt: new Date('2023-12-05T14:10:00'),
  },
  {
    id: '1702357200000',
    title: 'Tối ưu trạng thái loading',
    description:
      'Thêm skeleton cho danh sách task và disabled state khi form đang lưu.',
    deadline: new Date('2023-12-12T09:00:00'),
    status: 'To Do',
    priority: 'Medium',
    createdAt: new Date('2023-12-07T16:25:00'),
  },
  {
    id: '1702550700000',
    title: 'Đồng bộ màu với design system',
    description:
      'So khớp token màu, border, shadow và trạng thái ưu tiên với file thiết kế.',
    deadline: new Date('2023-12-14T13:45:00'),
    status: 'In Progress',
    priority: 'Low',
    createdAt: new Date('2023-12-08T11:35:00'),
  },
]
