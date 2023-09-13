'use client'

import { useState } from 'react'
import { Project } from '@/types/project'
import { ProjectList } from '@/components/ProjectList'
import { updateProject } from '@/clientCalls/projects'
import { revalidatePath } from 'next/cache'
import { useRouter } from 'next/navigation'
import { Dialog } from '@/components/Dialog'


type Props = {
  projects: Project[]
}

export const Projects = ({ projects }: Props) => {
  const [editingProject, setEditingProject] = useState<Project | undefined>(undefined)
  const router = useRouter()

  const selectProject = (id: number) => () => {
    setEditingProject(projects.find((p) => p.id === id))
  }

  const toggleProject = (id: number) => async () => {
    const p = projects.find((p) => p.id === id)!
    const res = await updateProject({ ...p, active: !p.active})
    if (res.ok) {
      router.refresh()
    }
  }

  return (
   <>
     <Dialog open={editingProject !==undefined} close={() => setEditingProject(undefined)}>
       <p>{JSON.stringify(editingProject)}</p>
     </Dialog>

     <ProjectList projects={projects} onSelect={selectProject} onToggle={toggleProject} />
   </>
  )
}