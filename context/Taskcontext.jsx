import { Children, createContext, useContext, useEffect, useReducer, useState, } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { taskReducer, initialState } from "../customHooks/taskReducer";

const TaskContext = createContext()


export const TaskProvider = ({ children }) => {
    // Stati
    const [state, dispatch] = useReducer(taskReducer, initialState)
    const navigate = useNavigate()

    // Url del mio back-end
    const apiUrl = import.meta.env.VITE_API_URL

    // Recupero dei dati dal mio api attraverso axios
    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await axios.get(apiUrl)
                dispatch({ type: "LOAD_TASKS", payload: response.data })
            }
            catch (error) {
                console.error("Errore nel recupero delle Task", error)
            }
        }

        fetchTask()

    }, [])

    const addTask = async ({ title, description, status }) => {

        // Controllo la presenza di una task con lo stesso titolo
        const presente = state.tasks.some((elem) => elem.title.toLowerCase() === title.toLowerCase())
        if (presente) {
            alert("Esiste già una task con questo titolo");
            return;
        }

        // Procedo con la chiamata post controllo
        try {
            const response = await axios.post(apiUrl, {
                title,
                description,
                status,
            })
            const data = response.data
            if (data.success) {
                dispatch({ type: "ADD_TASK", payload: data.task })
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
                dispatch({ type: "REMOVE_TASK", payload: taskId })
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

        // Controllo se esiste già il titolo escludendo se stessa.
        const presente = state.tasks.some((elem) => elem.title.toLowerCase === task.title.toLowerCase && elem.id !== task.id)
        if(presente){
            alert("Esiste già una task con questo titolo")
            return
        }

        // Procedo con la chiamata post controllo
        try {
            const response = await axios.put(`${apiUrl}/${task.id}`, task)
            if (response.data.success) {
                // aggiorno i dati anche per lo stato locale
                dispatch({ type: "UPDATE_TASK", payload: response.data.task })
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

    const removeSelection = async (selected) => {
        try {
            await Promise.all(selected.map((id) => axios.delete(`${apiUrl}/${id}`)))
            console.log("le task sono state eliminate con successo", selected)

            // Reset delle task dopo eliminazione
            dispatch({ type: "REMOVE_MULTIPLE_TASKS", payload: selected })
            alert(`Le task con id: ${selected} sono state eliminate con successo`)
        }
        catch (error) {
            console.error("Errore nella esecuzione della fatch", error)
            alert(error.message)
        }

    }


    return (
        <TaskContext.Provider
            value={{
                tasks: state.tasks,
                loading: state.loading,
                addTask,
                removeTask,
                updateTask,
                removeSelection
            }}
        >
            {children}
        </TaskContext.Provider>
    );

}

// Creo un hook personalizzato per il mio context che si chiamerà useTask()

export const useTasks = () => useContext(TaskContext)