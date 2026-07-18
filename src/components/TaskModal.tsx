import { CalendarOutlined, CloseOutlined, DeleteOutlined } from '@ant-design/icons'
import { Button, DatePicker, Form, Input, Modal, Select } from 'antd'
import dayjs from 'dayjs'
import type { Priority, Status, Task } from '../types/task'
import { formatDateTime } from '../utils/date'

interface TaskModalProps {
  open: boolean
  task: Task | null
  onCancel: () => void
  onSave: (task: Task) => void
  onDelete: (taskId: string) => void
}

interface TaskFormValues {
  title: string
  description: string
  deadline: dayjs.Dayjs
  status: Status
  priority: Priority
}

const statusOptions: Status[] = ['To Do', 'In Progress', 'Done']
const priorityOptions: Priority[] = ['Urgent', 'High', 'Medium', 'Low']

const priorityDot: Record<Priority, string> = {
  Urgent: '#ef3333',
  High: '#ef3333',
  Medium: '#5f8fd7',
  Low: '#2bbf8a',
}

const buildTaskId = () => {
  return crypto.randomUUID?.() ?? `${Date.now()}`
}

const TaskModal = ({ open, task, onCancel, onDelete, onSave }: TaskModalProps) => {
  const [form] = Form.useForm<TaskFormValues>()
  const isEditing = Boolean(task)
  const createdAt = task?.createdAt ?? new Date()

  const initialValues: TaskFormValues = {
    title: task?.title ?? '',
    description: task?.description ?? '',
    deadline: dayjs(task?.deadline ?? new Date()),
    status: task?.status ?? 'To Do',
    priority: task?.priority ?? 'Low',
  }

  const handleFinish = (values: TaskFormValues) => {
    onSave({
      id: task?.id ?? buildTaskId(),
      title: values.title,
      description: values.description,
      deadline: values.deadline.toDate(),
      createdAt: task?.createdAt ?? new Date(),
      status: values.status,
      priority: values.priority,
    })
  }

  const handleConfirmDelete = () => {
    if (!task) return
    
    Modal.confirm({
      title: (
        <span>
          Bạn có chắc chắn muốn xóa?
        </span>
      ),
      okText: 'Xóa',
      cancelText: 'Hủy',
      okButtonProps: { danger: true },
      onOk: () => onDelete(task.id),
    })
  }

  return (
    <Modal
      centered
      className="task-detail-modal"
      closeIcon={<CloseOutlined className="text-[#717989]" />}
      footer={null}
      onCancel={onCancel}
      open={open}
      title={
        <div className="flex items-center gap-3">
          <span className="text-xl font-extrabold text-[#343946]">
            Chi tiết công việc
          </span>
          <span className="rounded bg-[#eceff8] px-2 py-1 text-xs font-extrabold text-[#727b91]">
            #{task?.id ?? 'TASK-NEW'}
          </span>
        </div>
      }
      width={670}
      afterOpenChange={(visible) => {
        if (visible) {
          form.setFieldsValue(initialValues)
        }
      }}
    >
      <Form
        form={form}
        initialValues={initialValues}
        layout="vertical"
        onFinish={handleFinish}
        requiredMark={false}
      >
        <div className="border-t border-[#e4e8f0] px-6 py-6">
          <Form.Item
            label="Tiêu đề công việc"
            name="title"
            rules={[{ message: 'Nhập tiêu đề công việc', required: true }]}
          >
            <Input className="h-10" placeholder="Nhập tiêu đề công việc" />
          </Form.Item>

          <Form.Item
            label="Nội dung chi tiết"
            name="description"
            rules={[{ message: 'Nhập nội dung chi tiết', required: true }]}
          >
            <Input.TextArea
              className="resize-none"
              placeholder="Mô tả công việc..."
              rows={5}
            />
          </Form.Item>

          <div className="grid gap-5 md:grid-cols-2">
            <Form.Item
              label="Hạn hoàn thành"
              name="deadline"
              rules={[{ message: 'Chọn hạn hoàn thành', required: true }]}
            >
              <DatePicker
                className="h-10 w-full"
                format="DD/MM/YYYY hh:mm A"
                showTime
                suffixIcon={<CalendarOutlined />}
              />
            </Form.Item>

            <Form.Item label="Ngày tạo">
              <Input
                className="h-10"
                disabled
                value={formatDateTime(createdAt)}
              />
            </Form.Item>

            <Form.Item label="Trạng thái" name="status">
              <Select
                className="h-10"
                options={statusOptions.map((status) => ({
                  label: status === 'In Progress' ? 'Đang thực hiện' : status,
                  value: status,
                }))}
              />
            </Form.Item>

            <Form.Item label="Độ ưu tiên" name="priority">
              <Select
                className="h-10"
                options={priorityOptions.map((priority) => ({
                  label: (
                    <span className="inline-flex items-center gap-2">
                      <span
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: priorityDot[priority] }}
                      />
                      {priority === 'Urgent' ? 'Gấp'
                        : priority === 'High' ? 'Cao'
                          : priority === 'Medium' ? 'Trung bình'
                            : 'Thấp'}
                    </span>
                  ),
                  value: priority,
                }))}
              />
            </Form.Item>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-[#e4e8f0] px-6 py-5">
          <Button
            danger
            disabled={!isEditing}
            icon={<DeleteOutlined />}
            onClick={handleConfirmDelete}
          >
            Xóa công việc
          </Button>

          <div className="flex items-center gap-5">
            <Button onClick={onCancel} type="text">
              Hủy bỏ
            </Button>
            <Button
              className="min-w-32 shadow-[0_7px_18px_rgba(7,88,216,0.24)]"
              htmlType="submit"
              type="primary"
            >
              Lưu thay đổi
            </Button>
          </div>
        </div>
      </Form>
    </Modal>
  )
}

export default TaskModal
