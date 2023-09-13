import { generateUrl } from '@/helpers/generate_url'
import { Project } from '@/types/project'

export const getAllProjects = async () => {
  return await fetch(generateUrl('/projects'), {
    cache: "no-store",
  })
}

export const createProject = async (project: Project) => {
  return await fetch(generateUrl('/projects'), {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(project)
  })
}

export const updateProject = async (project: Project) => {
  return await fetch(generateUrl('/projects'), {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(project)
  })
}
