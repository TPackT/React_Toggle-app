'use client'
import { useState } from "react"
import { Dialog } from "../Dialog"
import { TimeEntry } from "@/types/timeEntry"
import { TimeEntryList } from "../TimeEntryList"
import { UpdateTimeForm } from "../UpdateTimeForm"
import { deleteTE } from "@/serverCalls/timeEntries"
import { useRouter } from "next/navigation"


type Props = {
  timeEntries: TimeEntry[]
}

export const TimeEntries = ({ timeEntries }: Props) => {
  const router = useRouter()
  const [editingTimeEntry, setEditingTimeEntry] = useState<TimeEntry | undefined>(undefined)
 

  const selectTE = (id: number) => () => {
    setEditingTimeEntry(timeEntries.find((p) => p.id === id))
  }

  
  const deleteHandler = (id: number) => async () => {
    const teD = timeEntries.find((timeEntries) => timeEntries.id === id)!;
    const res = await deleteTE(teD.id!, process.env.NEXT_PUBLIC_USERNAME!);
    if (res.ok) {
      router.refresh();
    }
  }

  
  return (
    <>
    <Dialog open={editingTimeEntry !== undefined} close={() => setEditingTimeEntry(undefined)}>
      {editingTimeEntry !== undefined && (
        <UpdateTimeForm 
          initialValue={editingTimeEntry} 
          onSave={() => {
            setEditingTimeEntry(undefined)
        }}
      />
      )}
    </Dialog>
    <TimeEntryList timeEntries={timeEntries} onSelect={selectTE} onDelete={deleteHandler}/>
    </>
  )
}