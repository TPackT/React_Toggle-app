import { getAllProjects } from "@/serverCalls/projects"
import { getAllTEs } from "@/serverCalls/timeEntries"
import { Reports } from "@/components/Reports"


async function getData() {
  const res = await getAllProjects()
  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }
  return res.json()
}

async function getTEData() {
  const res = await getAllTEs()
  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }
  return res.json()
}

export default async function Page() {
  const data = await getData()
  const teData = await getTEData() 
  return (
    <>
      <h1>Reports</h1>
      <Reports projects={data} timeEntries={teData}/>
    </>
  )
}