import { Form, useParams } from "react-router-dom"
import { useTasks } from "../context/Taskcontext"
import ModaleConferma from "../components/ModaleConferma"
import { useState } from "react"
import EditTaskModal from "../components/EditTaskModal"

export default function DettailPage() {
    const { tasks, removeTask, updateTask } = useTasks()
    const { id } = useParams()
    const task = tasks.find((curtask) => curtask.id === parseInt(id))
    const [showModal, setShowModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)


    const handleCloseModalForm = () => {
        console.log("Chiudo Modale")
    }






    return (
        <>
            {task &&
                <div>
                    <h2>Nome della Task: {task.title}</h2>
                    <p>Status della Task: {task.status}</p>
                    <p>Descrizione: {task.description}</p>
                    <p>Creato il: {new Date(task.createdAt).toLocaleDateString("it-IT")}</p>
                </div>}
            <div>
                <button onClick={() => setShowModal(true)}>Elimina Task</button>
                <button onClick={() => setShowEditModal(true)}>Modifica Task</button>
            </div>
            <div>
                {showModal && <ModaleConferma
                    title={"Sicuro di voler eliminare questa task?"}
                    content={"Questa task verrà eliminata definitivamente. Eliminare?"}
                    show={showModal}
                    onClose={() => setShowModal(false)}
                    onConfirm={() => removeTask(parseInt(id))}
                />}

            </div>

            {showEditModal && <EditTaskModal
                show={showEditModal}
                task={task}
                title="Modifica Task"
                confirmText="Vuoi salvare le modifiche?"
                onClose={handleCloseModalForm}
                onConfirm={() => updateTask(task)}
            />}
            
        </>
    )
}