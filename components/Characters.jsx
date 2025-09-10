import DialogBubble from "./DialogBubble"

export default function VillainCharacter({
  leftText,
  rightText,
  onConfirmLeft,
  onCancelLeft,
  onConfirmRight,
  onCancelRight
}) {
  return (
    <>
      <div className="character-sinistra">
        <img src="/character3.png" alt="Character sinistro" />
        {leftText && (
          <DialogBubble
            text={leftText}
            onConfirm={onConfirmLeft}
            onCancel={onCancelLeft}
            position="left"
          />
        )}
      </div>

      <div className="character-destra">
        <img src="/character1.png" alt="Character destro" />
        {rightText && (
          <DialogBubble
            text={rightText}
            onConfirm={onConfirmRight}
            onCancel={onCancelRight}
            position="right"
          />
        )}
      </div>
    </>
  )
}