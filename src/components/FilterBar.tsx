import { Input, Select } from 'antd'
import type { FilterState, Priority, Status } from '../types/task'

interface FilterBarProps {
  filters: FilterState
  onChange: (filters: FilterState) => void
}

const statusOptions: Record<Status | 'All', string> = {
  'All': 'Tất cả',
  'To Do': 'Cần thực hiện',
  'In Progress': 'Đang thực hiện',
  'Done': 'Hoàn thành',
}

const priorityOptions: Record<Priority | 'All', string> = {
  'All': 'Tất cả',
  'Urgent': 'Gấp',
  'High': 'Cao',
  'Medium': 'Trung bình',
  'Low': 'Thấp',
}

const FilterBar = ({ filters, onChange }: FilterBarProps) => {
  return (
    <section className="mt-8 rounded-xl border border-[#d8deea] bg-white p-6 shadow-[0_1px_3px_rgba(29,44,75,0.08)]">
      <div className="grid gap-5 lg:grid-cols-[1fr_180px_180px_200px]">
        <label className="block">
          <span className="mb-2 block text-sm font-extrabold text-[#5f687b]">
            Tìm kiếm theo tiêu đề
          </span>
          <Input
            className="h-10"
            onChange={(event) =>
              onChange({ ...filters, search: event.target.value })
            }
            placeholder="Nhập tên công việc..."
            value={filters.search}
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-extrabold text-[#5f687b]">
            Trạng thái
          </span>
          <Select
            className="h-10 w-full"
            onChange={(status) => onChange({ ...filters, status })}
            options={Object.entries(statusOptions).map(([value, label]) => ({ value, label }))}
            value={filters.status}
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-extrabold text-[#5f687b]">
            Độ ưu tiên
          </span>
          <Select
            className="h-10 w-full"
            onChange={(priority) => onChange({ ...filters, priority })}
            options={Object.entries(priorityOptions).map(([value, label]) => ({ value, label }))}
            value={filters.priority}
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-extrabold text-[#5f687b]">
            Sắp xếp
          </span>
          <Select
            className="h-10 w-full"
            onChange={(sortBy) => onChange({ ...filters, sortBy })}
            options={[
              { value: 'deadline', label: 'Deadline gần nhất' },
              { value: 'createdAt', label: 'Mới tạo nhất' },
            ]}
            value={filters.sortBy}
          />
        </label>
      </div>
    </section>
  )
}

export default FilterBar
