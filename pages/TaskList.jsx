import { useTasks } from "../context/Taskcontext.jsx"
import React, { useEffect, useState, useMemo } from "react"

// Ottimizzo il render delle task con un React.memo 
const TaskRow = React.memo(function task({ tasks, selectedTasks, onToggle }) {


    return tasks.map((task) => {

        const isChecked = selectedTasks.includes(task.id)

        return (
            <tr key={task.id}>
                <td><a href={`/task/${task.id}`}><img src="/bibbia.svg" alt="bibbia" /><span>{task.title}</span></a></td>
                <td className={`${task.status.replaceAll(" ", "")}`}> <img src="/teschio-brutto.svg" alt="teschio" /> <span>{task.status}</span></td>
                <td><img src="/asce.svg" alt="asce" /> <span>{new Date(task.createdAt).toLocaleDateString("it-IT")}</span></td>
                <td>
                    <label className="custom-checkbox">
                        <input
                            checked={isChecked}
                            onChange={() => onToggle(task.id)}
                            type="checkbox" />
                            <span className="checkbox-img"></span>
                    </label>
                </td>
            </tr>
        )
    })
})




export default function TaskList() {
    // Recupero delle task dal content
    const { tasks, loading, setTasks, addTask, removeTask, updateTask, removeSelection } = useTasks()
    const [sortBy, setSortBy] = useState("createdAt")
    const [sortOrder, setSortOrder] = useState(1)


    const [selectedTasks, setSelectedTasks] = useState([])





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


    const handleToggle = (taskId) => {
        setSelectedTasks((cur) => cur.includes(taskId)
            ? cur.filter(id => id !== taskId)
            : [...cur, taskId]
        )
    }


    // Funzione per gestire il click sul pulsante "Elimina selezione", che andrà ad eseguire la funzione removeSelection, setSelectedTask([]) (per ora, poi aggingerò un modale di conferma)
    const handleSelection = (ogg) => {
        removeSelection(ogg)
        setSelectedTasks([])

    }



    return (
        <>
            <div className="impaginazione">
                <h1>To-Die List</h1>
                <h3>Per non dimenticare nemmeno un rituale oscuro</h3>
                <input
                    className="ricerca"
                    type="text"
                    value={query}
                    placeholder="Cerca..."
                    onChange={(e) => setQuery(e.target.value)}
                />

                <div className="custom-table">
                    <table>
                        <thead>
                            <tr>
                                <th onClick={() => handleSort("title")}>Voce del Testamento</th>
                                <th onClick={() => handleSort("status")}>Fase di Putrefazione</th>
                                <th onClick={() => handleSort("createdAt")}>Ultima Volontà</th>
                                <th >Promesso all’Oltretomba</th>
                            </tr>

                        </thead>
                    </table>
                </div>

                <div className="table-body-wrapper">
                    <table className="custom-table ">
                        <tbody >
                            <TaskRow
                                tasks={sortedTasks}
                                selectedTasks={selectedTasks}
                                onToggle={handleToggle}
                            />
                        </tbody>
                    </table>
                </div>
                {
                    selectedTasks.length > 0 &&
                    <div>
                        <button onClick={() => handleSelection(selectedTasks)}>Elimina Selezione</button>
                    </div>
                }
            </div >




        </>
    )
}
