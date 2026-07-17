import { CalendarOutlined, CheckCircleFilled, WarningOutlined } from '@ant-design/icons'
import type { Priority, Task } from '../types/task'
import  { formatDateTime }  from '../utils/date'

interface TaskCardProps {
  currentTime: number
  task: Task
  onClick: (task: Task) => void
}

const priorityStyles: Record<Priority, string> = {
  Urgent: 'bg-[#ffe1e0] text-[#ff5f5d]',
  High: 'bg-[#ffe7e7] text-[#e03131]',
  Medium: 'bg-[#dcecff] text-[#64758b]',
  Low: 'bg-[#e6f8f1] text-[#2b9f87]',
}

const priorityLabels: Record<Priority, string> = {
  Urgent: 'GẤP',
  High: 'CAO',
  Medium: 'TRUNG BÌNH',
  Low: 'THẤP',
}

const TaskCard = ({ currentTime, task, onClick }: TaskCardProps) => {
  const isInProgress = task.status === 'In Progress'
  const isDone = task.status === 'Done'
  const deadlineTime = new Date(task.deadline).getTime()
  const isOverdue = !isDone && currentTime > 0 && deadlineTime < currentTime

  return (
    <article
      className="flex flex-col h-full cursor-pointer rounded-xl border border-[#d8deea] bg-white p-5 shadow-[0_1px_4px_rgba(29,44,75,0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(29,44,75,0.13)]"
      onClick={() => onClick(task)}
      role="button"
      tabIndex={0}
    >
      <div className="flex items-center justify-between gap-3">
        <span className={`rounded px-2.5 py-1 text-xs font-bold ${priorityStyles[task.priority]}`}>
          {priorityLabels[task.priority]}
        </span>

        {isDone ? (
            <span className="flex items-center gap-1 text-xs font-bold text-[#00cc33]">
                <CheckCircleFilled className="text-lg text-[#22c58b]" />
                Đã hoàn thành
            </span>
        ) : isOverdue ? (
          <span className="flex items-center gap-1 text-xs font-extrabold text-[#e03131]">
            <WarningOutlined />
            Quá hạn
          </span>
        ) : isInProgress ? (
            <span className="flex items-center gap-1 text-xs font-extrabold text-[#1f6bf8]">
            Đang thực hiện
          </span>
        ) : (
            <span className="flex items-center gap-1 text-xs font-extrabold text-[#64758b]">
            Cần thực hiện
          </span>
        )}
      </div>

      <h4 className={`mt-5 text-lg font-extrabold line-clamp-2 min-h-14 wrap-break-word ${isDone ? 'text-[#4a5060] decoration-2' : 'text-[#30343d]'}`}>
        {task.title}
      </h4>

      <div className={`mt-4 flex items-center gap-2 text-sm font-medium ${ isOverdue ? 'text-[#ff5f5d]' : 'text-[#4b5567]'}`}>
        <CalendarOutlined />
        <span>
            {formatDateTime(task.deadline)}
        </span>
      </div>
    </article>
  )
}

export default TaskCard
