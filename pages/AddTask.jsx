import { useEffect, useRef, useState } from "react"
import { useTasks } from "../context/Taskcontext"

export default function AddTask() {

    const [nome, setNome] = useState("")
    const [nomeValid, setNomeValid] = useState(false)
    const description = useRef(null)
    const status = useRef(null)
    const{addTask} = useTasks()

    const handleForm = async (e) => {
        e.preventDefault()
        if(nomeValid){
            const task = {
                title: nome,
                description: description.current.value,
                status: status.current.value
            }
            try{
                await addTask(task)
                setNome("")
                description.current.value = ""
                status.current.value = ""
            }
            catch(error){console.error("errore qua dentro")}

        }
        
        else{
            alert("Completa tutti i campi obligatori")
            console.error("Nome non valido")
        }
    }

    useEffect(() => {
        const symbols = "!@#$%^&*()-_=+[]{}|;:'\\,.<>?/`~";
        const validationNome = () => {
            const contiene = symbols.split("").some(simbolo => nome.includes(simbolo))
            if (!contiene && nome.trim() !== "") {
                setNomeValid(true)
            } else {
                setNomeValid(false)
            }
        }
        validationNome()

    }, [nome])




    return (
        <>
            <h1>Sono la pagina di agginta delle Task</h1>
            <form onSubmit={handleForm}>
                <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Titolo della task"
                />
                {nome.length !== 0 && <p>{ nomeValid ? "valido": "non valido" }</p>}

                <textarea
                    placeholder="descrizione"
                    ref={description}
                >
                </textarea>
                <select ref={status}>
                    <option value="">Seleziona opzione</option>
                    <option value="To do">To do</option>
                    <option value="Doing">Doing</option>
                    <option value="Done">Done</option>
                </select>

                <button>Submit</button>
            </form>
        </>
    )
}