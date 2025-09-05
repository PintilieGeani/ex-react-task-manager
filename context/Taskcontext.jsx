import { Children, createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const TaskContext = createContext()

export const TaskProvider = ({ children }) => {
    // Stati
    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(true)

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

    const addTask = async ({title, description, status}) => {

        try{
            const response = await axios.post(apiUrl, {
                title,
                description,
                status,
            })
            const data = response.data
            if(data.success) {
                setTasks((curr) => [...curr, data.task])
                console.log("Task aggiunta con successo:" , data)
            } else{
                throw new Error(data.message)
            }
        }
        catch(error){
            console.log(error || "errore nella creazione della task")
        }
    }

    const removeTask = () => {
        console.log("Task rimossa")
    }

    const updateTask = () => {
        console.log("Task aggiornata")
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