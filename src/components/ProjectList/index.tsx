import { Project } from '@/types/project'

type Props = {
  projects: Project[]
  onSelect: (id: number) => () => void
  onToggle: (id: number) => () => void
}

export const ProjectList = ({ projects, onSelect, onToggle }: Props) => {
return (
  <div className="overflow-x-auto">
    <table className="table">
      {/* head */}
      <thead>
      <tr>
        <th />
        <th>Name</th>
        <th>Owner</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>{
        projects.map((project) => (
          <tr key={project.id} className={project.active ? undefined : 'line-through'}  >
            <th>{project.id}</th>
            <td>{project.name}</td>
            <td>{project.user_name}</td>
            <th>
              <button className="btn btn-neutral btn-sm mr-4"
              onClick={onSelect(project.id!)}
              >edit</button>
              <button className="btn btn-primary btn-sm"
                onClick={onToggle(project.id!)}
              >toggle</button>
            </th>
          </tr>
          )
        )
      }</tbody>
    </table>
  </div>
      )
}