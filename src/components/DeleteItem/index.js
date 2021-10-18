import './styles.css';
import { useState } from 'react';
import trashIcon from '../../assets/trash-icon.svg';

function DeleteItem({functionDelete}) {
    const [popup, setPopup] = useState(false);

    const handlePopup = () => setPopup(!popup);

    return(
        <div className="flex-row delete-item-container">
            <div className="delete-item" onClick={handlePopup}>
                <img src={trashIcon} alt="icone de lixeira (deletar). "/>
                <p>Excluir cobrança</p>
            </div>
            {popup &&
                <div className="popup-delete">
                    <p>Apagar item?</p>
                    <div>
                        <button 
                            type="button" 
                            className="delete-btn --blue" 
                            onClick={functionDelete}
                        >
                            Sim
                        </button>
                        <button className="delete-btn --red" onClick={handlePopup}>
                            Não
                        </button>
                    </div>
                </div>
            }
        </div>
    )
}

export default DeleteItem;