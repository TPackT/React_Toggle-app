import { TimeEntry } from '@/types/timeEntry'
import { formatDate } from '@/helpers/formatDate'

type Props = {
  timeEntries: TimeEntry[]
  onSelect: (id: number) => () => void
  onDelete: (id: number) => () => void
}



export const TimeEntryList = ({ 
  timeEntries: timeEntry, 
  onSelect, 
  onDelete }: Props) => {
return (
  <div className="overflow-x-auto">
    <table className="table">
      {/* head */}
      <thead>
      <tr>
        <th />
        <th>Task</th>
        <th>Start</th>
        <th>End</th>
        <th>Project</th>
      </tr>
      </thead>
      <tbody>{
        timeEntry.map((te) => (
          <tr key={te.id} >
            <th>{te.id}</th>
            <td>{te.task}</td>
            <td>{formatDate(new Date(te.start))}</td>
            <td>{formatDate(new Date(te.end))}</td>
            <td>{te.project_name}</td>
            <th>
              <button className="btn btn-neutral btn-sm mr-4"
              onClick={onSelect(te.id!)}
              >edit</button>
              <button className="btn btn-neutral btn-sm mr-4"
              onClick={onDelete(te.id!)}
              >delete</button>
          
            </th>
          </tr>
          )
        )
      }</tbody>
    </table>
  </div>
  )
}