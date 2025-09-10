import { Form, useParams } from "react-router-dom"
import { useTasks } from "../context/Taskcontext"
import ModaleConferma from "../components/ModaleConferma"
import { useState } from "react"
import EditTaskModal from "../components/EditTaskModal"
import DialogBubble from "../components/DialogBubble"
import VillainCharacter from "../components/Characters"

export default function DettailPage() {
    const { tasks, removeTask, updateTask } = useTasks()
    const { id } = useParams()
    const task = tasks.find((curtask) => curtask.id === parseInt(id))
    const [showModal, setShowModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)



    return (
        <>
            {task &&

                <div className="impaginazione-dettagli">
                    <h1>Dettagli incantesimo</h1>
                    <div className="dettagli">
                        <h2>Nome della Task: {task.title}</h2>
                        <p>Status della Task: {task.status}</p>
                        <p>Descrizione: {task.description}</p>
                        <p>Creato il: {new Date(task.createdAt).toLocaleDateString("it-IT")}</p>
                        <div>
                            <button className="btn" onClick={() => setShowModal(true)}>Elimina Task</button>
                            <button className="btn" onClick={() => setShowEditModal(true)}>Modifica Task</button>
                        </div>
                    </div>
                </div>

            }

            {showEditModal && <EditTaskModal
                show={showEditModal}
                task={task}
                title="Modifica Task"
                confirmText="Vuoi salvare le modifiche?"
                onClose={() => setShowEditModal(false)}
                onConfirm={() => updateTask(task)}
            />}




            <VillainCharacter
                rightText={showModal && "mio signore, vuole DAVVERO eliminare questo incatesimo?"}
                onConfirmRight={() => removeTask(id)}
                onCancelRight={() => setShowModal(false)}
                leftText={showEditModal && "ah... come modifica lei gli incantesimi, mio signore..."}
            />

        </>
    )
}