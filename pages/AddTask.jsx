import { useEffect, useRef, useState } from "react"

export default function AddTask() {

    const [nome, setnome] = useState("")
    const [nomeValid, setNomeValid] = useState(false)
    const description = useRef(null)
    const status = useRef(null)

    const handleForm = (e) => {
        e.preventDefault()
        if(nomeValid){
            const task = {
                Nome: nome,
                Descrizione: description.current.value,
                Status: status.current.value
            }
            console.log(task)
        }else{
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
                    onChange={(e) => setnome(e.target.value)}
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