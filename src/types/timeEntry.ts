export type TimeEntry = {
  id?: number
  project_id: number
  task: string
  start: string
  end: string
  user_name: string
  project_name?: string
}