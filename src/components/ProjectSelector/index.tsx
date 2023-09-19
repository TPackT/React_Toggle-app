import { useEffect, useState } from 'react'
import { getAllProjects } from '@/clientCalls/projects'
import { Project } from '@/types/project'

type Props = {
  name: string
  value: number
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  getInitialId?: (projectId: number) => void
}

export const ProjectSelector = ({name, value, handleChange, getInitialId}: Props) => {
  const [projects, setProjects] = useState<Project[]>([])
  useEffect(() => {
    getAllProjects()
      .then((response) => response.json())
      .then((data) => {
        const pjs = data.data.filter(
          (item: { active: boolean }) => item.active === true,
        )
        setProjects(pjs)
        getInitialId?.(pjs[0].id)
      }
      )
  }, [])

  return (
    <select 
    name={name} 
    value={value} 
    onChange={handleChange}
    className="select select-bordered w-full max-w-xs"
            >
      {projects.map((p) => (
        <option key={p.id!} value={p.id!}>{p.name}</option>
      ))}
    </select>
  )

}