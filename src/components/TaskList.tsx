import { Pagination } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import type { Task } from '../types/task'
import TaskCard from './TaskCard'

interface TaskListProps {
  currentPage: number
  onPageChange: (page: number) => void
  onTaskClick: (task: Task) => void
  pageSize: number
  tasks: Task[]
}

const TaskList = ({
  currentPage,
  onPageChange,
  onTaskClick,
  pageSize,
  tasks,
}: TaskListProps) => {
  const [currentTime, setCurrentTime] = useState(0)

  const paginatedTasks = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize
    return tasks.slice(startIndex, startIndex + pageSize)
  }, [currentPage, pageSize, tasks])

  useEffect(() => {
    const updateCurrentTime = () => {
      setCurrentTime(Date.now())
    }

    updateCurrentTime()
    const intervalId = window.setInterval(updateCurrentTime, 30000)

    return () => window.clearInterval(intervalId)
  }, [])

  if (tasks.length === 0) {
    return (
      <div className="mt-10 rounded-lg border border-dashed border-[#cfd6e4] bg-white p-8 text-center text-sm font-semibold text-[#778196]">
        Không tìm thấy công việc phù hợp với bộ lọc.
      </div>
    )
  }

  return (
    <>
      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {paginatedTasks.map((task) => (
          <TaskCard
            currentTime={currentTime}
            key={task.id}
            onClick={onTaskClick}
            task={task}
          />
        ))}
      </div>

      {tasks.length > pageSize ? (
        <div className="mt-8 flex justify-center">
          <Pagination
            current={currentPage}
            onChange={onPageChange}
            pageSize={pageSize}
            showSizeChanger={false}
            total={tasks.length}
          />
        </div>
      ) : null}
    </>
  )
}

export default TaskList
