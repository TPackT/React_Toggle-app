import { useEffect, useState } from "react"
import { getAllProjects } from "@/clientCalls/projects"
import { Project } from "@/types/project"

type Props = {
    name: string
    value: string
    handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export const UserSelector = ({name , value, handleChange}: Props) => {
    const [users, setUsers] = useState<string[]>([""])
    useEffect(() => {
        getAllProjects()
        .then((response) => response.json())
        .then((data) => {
            const users = data.data.map((p: Project) => p.user_name)
            const uniqueNamesSet: Set<string> = new Set(users)
            setUsers(Array.from(uniqueNamesSet))
        })
    }, [])

    return (
        <select
        name={name}
        value={value ?? null}
        onChange={handleChange}
        className="select select-bordered w-full max-w-xs"
        >
        <option key={0} value={""}>---</option>
        {users.map((user) => (
            <option key={user} value={user}>
                {user}
            </option>
        ))}
        </select>
    )
}