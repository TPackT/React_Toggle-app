import { useEffect, useState } from 'react'
import { getAllProjects } from '@/clientCalls/projects'

type Props = {
  name: string
  value: number
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export const ProjectSelector = ({name, value, handleChange}: Props) => {
  const [projects, setProjects] = useState([])
  useEffect(() => {
    getAllProjects()
      .then((response) => response.json())
      .then(data => setProjects(data.data.filter((item) => item.active === true)))
  }, [])

  return (
    <select name={name} value={value} onChange={handleChange}
            className="select select-bordered w-full max-w-xs"
            >
      {projects.map((p) => (
        <option key={p.id} value={p.id}>{p.name}</option>
      ))}
    </select>
  )

}