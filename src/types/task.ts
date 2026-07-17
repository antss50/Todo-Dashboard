export type Priority = 'Low' | 'Medium' | 'High' | 'Urgent';
export type Status = 'To Do' | 'In Progress' | 'Done';

export interface Task {
  id: string;
  title: string;
  description: string;
  deadline: Date;
  status: Status;
  priority: Priority;
  createdAt: Date;
}

export interface FilterState {
    search: string;
    status: Status | 'All';
    priority: Priority | 'All';
    sortBy: 'createdAt' | 'deadline';
}