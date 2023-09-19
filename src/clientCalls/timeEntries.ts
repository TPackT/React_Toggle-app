import { generateLocalUrl } from '@/helpers/generate_url'
import { TimeEntry } from '@/types/timeEntry'


export const getAllTEs = async () => {
  return await fetch(generateLocalUrl("/time-entries"), {
    cache: "no-store"
  })
}

export const getTEById = async (id: number) => {
  const idToGet = id
  const timeEntries = await getAllTEs()
  const timeEntriesJson = await timeEntries.json()
  const timeEntryById = timeEntriesJson.find((e: any) => e.id === idToGet)
  return timeEntryById
}


export const createTE = async (timeEntry: TimeEntry) => {
  return await fetch(generateLocalUrl('/time-entries'), {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(timeEntry)
    
  })
}

export const deleteTE = async (idToDelete: number, user_name: string) => {
  const res = await fetch(generateLocalUrl("/time-entries"), {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ idToDelete, user_name})
  })
}


export const updateTE = async (timeEntry: TimeEntry) => {
  return await fetch(generateLocalUrl('/time-entries'), {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(timeEntry)
  })
}