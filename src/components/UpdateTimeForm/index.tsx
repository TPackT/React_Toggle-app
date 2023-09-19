import { TimeEntry } from "@/types/timeEntry"
import { useState, useEffect, FC } from "react"
import { formatDate } from "@/helpers/formatDate"
import { useRouter } from "next/navigation"
import { updateTE } from "@/clientCalls/timeEntries"
import { Input } from "@/components/Input"
import { ProjectSelector } from "@/components/ProjectSelector"

type Props = {
    initialValue: TimeEntry
    onSave: () => void
}

export const UpdateTimeForm: FC<Props> = ({ initialValue, onSave}) => {
    const router = useRouter()
    const [timeEntry, setTimeEntry] = useState<TimeEntry>(initialValue)

    useEffect(() => {
        const {start, end, ...rest } = timeEntry
        setTimeEntry({
            ...rest,
            start: formatDate(new Date(start)),
            end: formatDate(new Date(end)),
        })
    }, [])

    const handleSave = () => {
        updateTE({
            ...timeEntry,
            user_name: process.env.NEXT_PUBLIC_USERNAME,
        }).then(() => {
            onSave()
            router.refresh()
        })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setTimeEntry({ ...timeEntry, [name]: value})
    }

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.currentTarget
        setTimeEntry({ ...timeEntry, [name]: value })
    }

    return (
        <form className="flex flex-wrap items-end">
            <Input label="Task" name="task" value={timeEntry.task} onChange={handleChange} />
            <Input label="Start" name="start" value={timeEntry.start} onChange={handleChange} type="datetime-local" />
            <Input label="End" name="end" value={timeEntry.end} onChange={handleChange} type="datetime-local" />
            <ProjectSelector name="project_id" value={timeEntry.project_id} handleChange={handleSelectChange} />
            <button className="btn btn-neutral" onClick={() => handleSave()}>Save</button>
    </form>
    )

}
