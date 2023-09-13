'use client'
import { useRouter } from 'next/navigation'
import { TimeEntry } from '@/types/timeEntry'
import { useEffect, useState } from 'react'
import { Input } from '@/components/Input'
import { formatDate } from '@/helpers/formatDate'
import { createTE } from '@/clientCalls/timeEntries'

const initValue: TimeEntry = {
  end: '',
  start: '',
  task: '',
  project_id: 4,
  user_name: process.env.NEXT_PUBLIC_USERNAME
}

export const TimeForm = () => {
  const router = useRouter()
  const [timeEntry, setTimeEntry] = useState<TimeEntry>(initValue)

  useEffect(() => {
    if (timeEntry.start && timeEntry.end && timeEntry.task) {
      createTE(timeEntry)
        .then(() => {
          setTimeEntry(initValue)
          router.refresh()
        })
    }
  }, [router, timeEntry])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target
    setTimeEntry({ ...timeEntry, [name]: value})
  }
  return (
    <form className="flex flex-wrap items-end">
      <Input label="Task" name="task" value={timeEntry.task} onChange={handleChange} />
      <Input label="Start" name="start" value={timeEntry.start} onChange={handleChange} type="datetime-local" />
      <Input label="End" name="end" value={timeEntry.end} onChange={handleChange} type="datetime-local" />
      {timeEntry.start && (
        <button
          className="btn btn-neutral"
          disabled={timeEntry.end !== ''}
          onClick={() => {setTimeEntry({...timeEntry, end: formatDate(new Date())})}}
        >Stop</button>
      )}
      {!timeEntry.start && (
        <button
          className="btn btn-neutral"
          onClick={() => {setTimeEntry({...timeEntry, start: formatDate(new Date())})}}
        >Start</button>
      )}
    </form>
  )
}