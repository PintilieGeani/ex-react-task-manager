import { useState } from "react";

export default function ModaleConferma({title, content, show, onClose, onConfirm}){
    
    return(
        <>
        <div>
            <h1>{title}</h1>
            <p>{content}</p>
            <button onClick={onClose}>Annulla</button>
            <button onClick={onConfirm}>Conferma</button>
        </div>
        </>
    )
}