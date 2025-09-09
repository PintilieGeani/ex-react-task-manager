export default function DialogBubble({text, onConfirm, onCancel, position = ""}) {
    
    return(
        <div className={`dialog-bubble ${position}`}>
            <p>{text}</p>
            <div className="dialog-buttons">
                {onConfirm && <button onClick={onConfirm}>Conferma</button>}
                {onCancel && <button onClick={onCancel}>Cancella</button>}
            </div>
        </div>
    )
}