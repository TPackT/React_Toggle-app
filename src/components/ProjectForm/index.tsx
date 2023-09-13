import { Project } from '@/types/project'
import { useState } from 'react'

type Props = {
  initialValues: Project
  onSave: (project: Project) => void
  onCancel: () => void
}

export const ProjectForm = ({initialValues, onSave}: Props) => {
  const [project, setProject] = useState(initialValues)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(project)
  }

  return (
    <form onSubmit={handleSave}>

      <button className="btn btn-primary" onClick={handleSave}>Save</button>
    </form>
  )

}