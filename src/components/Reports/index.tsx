'use client'

import { TimeEntry } from "@/types/timeEntry"
import { Project } from "@/types/project"
import { ProjectSelector } from "../ProjectSelector"
import { useState, useEffect } from "react"
import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
    projects: Project[]
    timeEntries: TimeEntry[]
}


type Stats = {
    tasksDone: number
    tasksInProgress: number
    tasksToStart: number
    taskDesc: string[]
}

const initialPieChartData = {
    labels: ["Tasks Done", "Tasks In progress", "Tasks To Start"],
    datasets: [
      {
        data: [0, 0, 0],
        backgroundColor: ["green", "blue", "red"],
      },
    ],
  }

export const Reports = ({ projects, timeEntries }: Props) => {
    const [project, setProject] = useState<Project>()
    const [stats, setStats] = useState<Stats>({
        tasksDone: 0,
        tasksInProgress: 0,
        tasksToStart: 0,
        taskDesc: [],
    })
    const [pieChartData, setPieChartData] = useState(initialPieChartData)

    useEffect(() => {
        if (!project) {
          return
        }

        const relevantTimeEntries = timeEntries.filter(
            (te) => te.project_id === project.id,
          )
          const now = new Date()
          const newStats = relevantTimeEntries.reduce(
            (acc, curr) => {
              if (new Date(curr.end) < now) {
                acc["tasksDone"] = acc["tasksDone"] + 1
              }
              if (new Date(curr.end) >= now && new Date(curr.start) <= now) {
                acc["tasksInProgress"] = acc["tasksInProgress"] + 1
              }
              if (new Date(curr.start) > now) {
                acc["tasksToStart"] = acc["tasksToStart"] + 1
              }
              acc["taskDesc"].push(curr.task)
      
              return acc
            },
            {
                tasksDone: 0,
                tasksInProgress: 0,
                tasksToStart: 0,
                taskDesc: [],
            } as Stats,
          )

        setStats(newStats)

    setPieChartData((prevState) => ({
      ...prevState,
      datasets: [
        {
          data: [
            newStats.tasksDone,
            newStats.tasksInProgress,
            newStats.tasksToStart,
          ],
          backgroundColor: ['green', 'blue', 'red'],
        },
      ],
    }))
  }, [project, timeEntries])




    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target
        const selectedProject = projects.find(
          (p) => p.id === Number.parseInt(value),
        )
        setProject(selectedProject)
      }


    return (
        <>
          <ProjectSelector
            name='project_id'
            value={project?.id ?? 0}
            handleChange={handleSelectChange}
          />
          <div className='grid grid-cols-2 gap-2'>
            <div>
              <Pie data={pieChartData} />
            </div>
            <div>
              <h2>Task names</h2>
              {stats.taskDesc.map((desc, i) => (
                <div key={i}>{desc}</div>
              ))}
            </div>
          </div>
        </>
      )
}



