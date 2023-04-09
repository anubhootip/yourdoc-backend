import './Modal.css';

export function Modal({ title, isShowModal, modalBodyComponent, onClose }) {
  const onModalClick = (e) => {
    e.stopPropagation();
    if (e.target !== e.currentTarget) {
      return;
    }
    onClose();
  }
  return <div id="myModal" className={isShowModal ? "modal" : "!hidden modal"} onClick={onModalClick}>
    <div className="modal-content">
      <div className="modal-header">
        <span className="close" onClick={onClose}>&times;</span>
        <h2 className='p-2'>{title}</h2>
      </div>
      <div className="modal-body !p-4">
        {modalBodyComponent}
      </div>
    </div>
  </div>
}