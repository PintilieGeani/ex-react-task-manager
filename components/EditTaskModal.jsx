import { useState } from "react"
import { useTasks } from "../context/Taskcontext"

export default function EditTaskModal({ show,
    onClose,
    task,
    onSave,
    title,
    confirmText,
    onConfirm }) {

    const { setTasks, updateTask } = useTasks()


    //Stato locale per gestire stati modificabili

    const [formData, setFormData] = useState({
        title: task.title || "",
        description: task.description || "",
        status: task.status || ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target

        setFormData((cur) => ({
            ...cur,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const updatedTask = {
            ...task,
            ...formData,
        }

        updateTask(updatedTask)
    }

    console.log(task)



    return (
        <div className="edit-modal">
            <div className="modal-content">
                <h1>{title}</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            name="title"
                            type="text"
                            value={formData.title}
                            onChange={handleChange}
                        />
                        <div></div>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                        >
                            <option value="">Seleziona</option>
                            <option value="To do">To do</option>
                            <option value="Doing">Doing</option>
                            <option value="Done">Done</option>
                        </select>

                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        >
                        </textarea>
                        <p>{confirmText}</p>
                        <div>
                            <button className="btn" type="submit">Salva</button>
                            <button className="btn" type="button" onClick={onClose}>Annulla</button>
                        </div>
                    </form>
            </div>
        </div>
    )

}