export default interface _Event {
  id: string;
  longitude: number;
  latitude: number;
  name: string;
  description: string;
  date: string; // ISO 8601 date format
  charity: number;
  charity_name: string;
  tasks: Task[];
}

export interface Task {
  id: number;
  task_name: string;
  description: string;
  volunteer_limit: number;
  event: number;
}
