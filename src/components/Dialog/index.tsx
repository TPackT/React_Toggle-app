
type Props = {
  open: boolean
  children: React.ReactNode
  close: () => void
}
export const Dialog = ({children, open, close}: Props) => {
  return (
    <dialog className="modal z-10" open={open}>
      <div className="modal-box">
        {children}
        <button className="btn btn-neutral" onClick={close}>Close</button>
      </div>
    </dialog>
  )
}