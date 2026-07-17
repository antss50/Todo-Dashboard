import { BellOutlined, PlusOutlined, SettingOutlined } from '@ant-design/icons'
import { ConfigProvider } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import './App.css'
import FilterBar from './components/FilterBar'
import Sidebar from './components/Sidebar'
import TaskList from './components/TaskList'
import TaskModal from './components/TaskModal'
import { initialTasks } from './data/mockData'
import useLocalStorage from './hooks/useLocalStorage'
import type { FilterState, Task } from './types/task'

const TASKS_STORAGE_KEY = 'todo-dashboard:tasks'
const FILTERS_STORAGE_KEY = 'todo-dashboard:filters'
const TASKS_PER_PAGE = 9

const defaultFilter: FilterState = {
  search: '',
  status: 'All',
  priority: 'All',
  sortBy: 'deadline',
}

const App = () => {
  const [tasks, setTasks] = useLocalStorage<Task[]>(
    TASKS_STORAGE_KEY,
    initialTasks,
  )
  const [filters, setFilters] = useLocalStorage<FilterState>(
    FILTERS_STORAGE_KEY,
    defaultFilter,
  )
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        const matchesSearch = task.title.toLowerCase().includes(filters.search.trim().toLowerCase())
        const matchesStatus = filters.status === 'All' || task.status === filters.status
        const matchesPriority = filters.priority === 'All' || task.priority === filters.priority
        return matchesSearch && matchesStatus && matchesPriority
      })
      .sort((a, b) => {
        if (filters.sortBy === 'createdAt') {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        }
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
      })
  }, [filters, tasks])

  const totalPages = Math.max(1, Math.ceil(filteredTasks.length / TASKS_PER_PAGE))

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentPage(1)
  }, [filters])

  useEffect(() => {
    if (currentPage > totalPages) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrentPage(totalPages)
    }
  }, [currentPage, totalPages])

  const openCreateModal = () => {
    setSelectedTask(null)
    setIsModalOpen(true)
  }

  const openTaskModal = (task: Task) => {
    setSelectedTask(task)
    setIsModalOpen(true)
  }

  const handleSaveTask = (task: Task) => {
    setTasks((currentTasks) => {
      const exists = currentTasks.some((item) => item.id === task.id)
      if (exists) {
        return currentTasks.map((item) => (item.id === task.id ? task : item))
      }
      return [task, ...currentTasks]
    })
    setIsModalOpen(false)
  }

  const handleDeleteTask = (taskId: string) => {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId))
    setIsModalOpen(false)
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#0758d8',
          borderRadius: 8,
          colorText: '#2b2f3a',
          fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        }
      }}
    >
      <main className="min-h-screen bg-[#f6f8fc] text-[#2b2f3a]">
        <Sidebar onCreateTask={openCreateModal} />

        <section className="lg:pl-63.75">
          <header className="flex h-19.5 items-center justify-between border-b border-[#e3e7f0] bg-white/72 px-5 backdrop-blur md:px-7">
            <h2 className="text-[26px] font-extrabold leading-7 text-[#0758d8]">
              Efficient Workflow
            </h2>
            <div className="flex items-center gap-5 text-[#5d6575]">
              <BellOutlined className="text-xl" />
              <SettingOutlined className="text-xl" />
              <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-[#c9d8ef] bg-[linear-gradient(135deg,#a9c8e8,#24384e)] shadow-sm">
                <div className="mx-auto mt-2 h-7 w-4 rounded-t-full bg-[#26384f]" />
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-252.5 px-5 py-7 md:px-7">
            <div>
              <h3 className="text-2xl font-extrabold">To Do Dashboard</h3>
              <p className="mt-1 text-sm font-semibold text-[#748096]">
                Quản lý hiệu quả các công việc của bạn
              </p>
            </div>

            <FilterBar filters={filters} onChange={setFilters} />

            <TaskList
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              onTaskClick={openTaskModal}
              pageSize={TASKS_PER_PAGE}
              tasks={filteredTasks}
            />
          </div>
        </section>

        <button
          className="fixed bottom-5 right-5 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-[#0758d8] text-white shadow-xl lg:hidden"
          onClick={openCreateModal}
          type="button"
        >
          <PlusOutlined />
        </button>

        <TaskModal
          onCancel={() => setIsModalOpen(false)}
          onDelete={handleDeleteTask}
          onSave={handleSaveTask}
          open={isModalOpen}
          task={selectedTask}
        />
      </main>
    </ConfigProvider>
  )
}

export default App
