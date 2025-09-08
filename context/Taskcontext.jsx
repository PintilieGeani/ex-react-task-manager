import { Children, createContext, useContext, useEffect, useState, } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TaskContext = createContext()


export const TaskProvider = ({ children }) => {
    // Stati
    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    // Url del mio back-end
    const apiUrl = import.meta.env.VITE_API_URL

    // Recupero dei dati dal mio api attraverso axios
    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await axios.get(apiUrl)
                setTasks(response.data)
            }
            catch (error) {
                console.error("Errore nel recupero delle Task", error)
            }
            finally {
                setLoading(false)
            }
        }

        fetchTask()

    }, [])

    const addTask = async ({ title, description, status }) => {

        try {
            const response = await axios.post(apiUrl, {
                title,
                description,
                status,
            })
            const data = response.data
            if (data.success) {
                setTasks((curr) => [...curr, data.task])
                alert("Dati mandati con successo")
                console.log("Task aggiunta con successo:", data)
            } else {
                throw new Error(data.message)
            }
        }
        catch (error) {
            console.log(error || "errore nella creazione della task")
        }
    }

    const removeTask = async (taskId) => {
        try {
            const response = await axios.delete(`${apiUrl}/${taskId}`)
            console.log("Task Eliminata", response.data)
            if (response.data.success) {
                setTasks((cur) =>
                    cur.filter((elem) => elem.id !== taskId)
                )
                alert("Task Eliminata")
                navigate("/")
            }
            else {
                alert("Non posso eliminare questa Task")
            }
        }
        catch (error) {
            console.error("Errore nella DELETE", error.message)
        }

    }

    const updateTask = async (task) => {
        try {
            const response = await axios.put(`${apiUrl}/${task.id}`, task)
            if (response.data.success) {
                // aggiorno i dati anche per lo stato locale
                setTasks((cur) => cur.map((elem) => (
                    elem.id === task.id ? response.data.task : elem
                )))

                console.log("I dati sono stati aggiornati", response.data.task);
                alert("Dati aggiornati con successo")
                navigate("/")
            } else {
                throw new Error(response.data.message) || "Errore Generico"
            }
        }
        catch (error) {
            console.error("Errore durante l'aggiornamento", error.message)
            alert("Errore durante l'aggiornamento della task.");
        }
    }


    return (
        <TaskContext.Provider
            value={{
                tasks,
                setTasks,
                loading,
                addTask,
                removeTask,
                updateTask,
            }}
        >
            {children}
        </TaskContext.Provider>
    );

}

// Creo un hook personalizzato per il mio context che si chiamerà useTask()

export const useTasks = () => useContext(TaskContext)