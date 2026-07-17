import {
  AppstoreOutlined,
  LogoutOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons'
import { Button } from 'antd'

interface SidebarProps {
  onCreateTask: () => void
}

const navItems = [{ label: 'Dashboard', icon: AppstoreOutlined, active: true }]

const Sidebar = ({ onCreateTask }: SidebarProps) => {
  return (
    <aside className="fixed inset-y-0 left-0 z-20 hidden w-[255px] border-r border-[#d8deea] bg-[#f1f3ff] px-4 py-5 lg:flex lg:flex-col">
      <div className="px-2">
        <h1 className="text-[26px] font-extrabold leading-7 text-[#0758d8]">
          Task Manager
        </h1>
      </div>

      <nav className="mt-9 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              className={`flex h-10 w-full items-center gap-3 rounded-md px-3 text-sm font-bold transition ${
                item.active
                  ? 'bg-[#cfe1fb] text-[#657085]'
                  : 'text-[#6d7484] hover:bg-white/70'
              }`}
              key={item.label}
              type="button"
            >
              <Icon className="text-lg" />
              {item.label}
            </button>
          )
        })}
      </nav>

      <div className="mt-auto">
        <Button
          block
          className="h-12 text-base font-extrabold shadow-[0_7px_18px_rgba(7,88,216,0.24)]"
          icon={<PlusOutlined />}
          onClick={onCreateTask}
          type="primary"
        >
          Thêm công việc
        </Button>

        <div className="mt-5 border-t border-[#d8deea] pt-4">
          <button
            className="flex h-10 w-full items-center gap-3 px-3 text-sm font-bold text-[#6d7484]"
            type="button"
          >
            <QuestionCircleOutlined className="text-lg" />
            Help
          </button>
          <button
            className="flex h-10 w-full items-center gap-3 px-3 text-sm font-bold text-[#6d7484]"
            type="button"
          >
            <LogoutOutlined className="text-lg" />
            Logout
          </button>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
