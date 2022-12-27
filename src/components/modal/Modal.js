import React from 'react'
import './Modal.css';

export default function Modal({ name, value, action, close }) {
    return (
        <>
            <div className="modal">
                <div className="modal-content">
                    <div>
                        <p>Anda yakin ingin menghapus data {name} ?</p>
                    </div>
                    <div>
                        <button
                            className='btn_modal'
                            value={value}
                            onClick={action}
                        >OK</button>
                        <button
                            className='btn_modal'
                            onClick={close}
                        >Batal</button>
                    </div>
                </div>
            </div>
        </>
    )
}


