import { useParams } from "react-router-dom"
import { useTasks } from "../context/Taskcontext"

export default function DettailPage() {
    const { tasks, removeTask } = useTasks()
    const { id } = useParams()
    const task = tasks.find((curtask) => curtask.id === parseInt(id))
    return (
        <>
            {task && 
            <div>
                <h2>Nome della Task: {task.title}</h2>
                <p>Status della Task: {task.status}</p>
                <p>Descrizione: {task.description}</p>
                <p>Creato il:{task.createdAt}</p>
            </div>}
            <div>
                <button onClick={() => removeTask(parseInt(id))}>Elimina Task</button>
            </div>

        </>
    )
}