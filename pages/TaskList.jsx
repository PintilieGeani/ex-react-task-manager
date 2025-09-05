import { useTasks } from "../context/Taskcontext.jsx"
import React, { useEffect, useState } from "react"

// Ottimizzo il render delle task con un React.memo 
const TaskRow = React.memo(function task({ tasks }) {
    return tasks.map((task) => {
        return (
            <tr key={task.id}>
                <td><a href={`/task/${task.id}`}>{task.title}</a></td>
                <td className={`${task.status.replaceAll(" ", "")}`}>{task.status}</td>
                <td>{task.createdAt}</td>
            </tr>
        )
    })
})
export default function TaskList() {
    // Recupero delle task dal content
    const { tasks, loading, setTasks, addTask, removeTask, updateTask } = useTasks()

    console.log(tasks)

    return (
        <>
            <h1>Le mie task</h1>
            <table>
                <thead>
                    <tr>
                        <th>Task:</th>
                        <th>Stato:</th>
                        <th>Data di creazione:</th>
                    </tr>

                </thead>
                <tbody>
                    <TaskRow tasks={tasks} />
                </tbody>
            </table>

            <button onClick={addTask}>Aggiungi</button>
            <button onClick={removeTask}>Rimuovi</button>
            <button onClick={updateTask}>Aggiorna</button>
        </>
    )
}