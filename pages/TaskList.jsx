import { useTasks } from "../context/Taskcontext.jsx"
import React, { useEffect, useState, useMemo } from "react"

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
    const [sortBy, setSortBy] = useState("createdAt")
    const [sortOrder, setSortOrder] = useState(1)

    //la query iniziale
    const [query, setQuery] = useState("")
    // query dopo il debounce
    const [debouncedQuery, setDebouncedQuery] = useState(query)


    //Ordina, crescente o decrescente se la colonna è  selezionata
    const handleSort = (column) => {
        if (sortBy === column) {
            setSortOrder((cur) => -cur)
        } else {
            setSortBy(column);
            setSortOrder(1)
        }
    }


    // Setto il debounce della query e la trasformo in debouncequery da usare nella useMemo
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(query)
        }, 300) // 300ms di debounce

        return () => {
            clearTimeout(handler)
        }
    }, [query])


    //Funzione sia per ordinare sia per filtrare dove uso debounceQuery per applicare il ritardo nella ricerca.
    const sortedTasks = useMemo(() => {
        const statusOrder = {
            "To do": 0,
            "Doing": 1,
            "Done": 2
        }

        const filtered = debouncedQuery
            ? tasks.filter(elem => elem.title.toLowerCase().includes(debouncedQuery.toLowerCase()))
            : tasks

        const sorted = [...filtered].sort((a, b) => {
            let compare = 0;

            if (sortBy === "title") {
                compare = a.title.localeCompare(b.title);
            } else if (sortBy === "status") {
                compare = statusOrder[a.status] - statusOrder[b.status];
            } else if (sortBy === "createdAt") {
                compare = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            }

            return compare * sortOrder
        })

        return sorted;

    }, [tasks, sortBy, sortOrder, debouncedQuery])



    return (
        <>
            <input
                type="text"
                value={query}
                placeholder="Cerca..."
                onChange={(e) => setQuery(e.target.value)}
            />
            <h1>Le mie task</h1>
            <table>
                <thead>
                    <tr>
                        <th onClick={() => handleSort("title")}>Task:</th>
                        <th onClick={() => handleSort("status")}>Stato:</th>
                        <th onClick={() => handleSort("createdAt")}>Data di creazione:</th>
                    </tr>

                </thead>
                <tbody>
                    <TaskRow tasks={sortedTasks} />
                </tbody>
            </table>

            <button onClick={addTask}>Aggiungi</button>
            <button onClick={removeTask}>Rimuovi</button>
            <button onClick={updateTask}>Aggiorna</button>
        </>
    )
}
