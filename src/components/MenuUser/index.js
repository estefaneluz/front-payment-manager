import { useState, useEffect } from 'react';
import './styles.css';
import userPicture from '../../assets/user-picture.jpg';
import editIcon from '../../assets/edit-icon.svg';
import logoutIcon from '../../assets/logout-icon.svg';
import ModalEditUser from '../ModalEditUser';

function MenuUser() {
    const [dropdown, setDropdown] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const toggleModal = () => {
        setOpenModal(!openModal);
        setDropdown(!dropdown);
    }

    return (
        <div className="user-container">
            <img 
                className="user-picture"
                src={userPicture} 
                alt="imagem do usuário" 
                onClick={() => setDropdown(!dropdown)}
            />
            { dropdown &&
                <div className="user-dropdown">
                    <div onClick={toggleModal}>
                        <img src={editIcon} alt="icone de editar" />
                        <p> Editar </p>
                    </div>

                    <div>
                        <img src={logoutIcon} alt="icone de deslogar" />
                        <p>Deslogar</p>
                    </div>
                </div>
            }

            { openModal && 
                <ModalEditUser open={openModal} setOpen={setOpenModal} /> 
            }
        </div>
    );
}

export default MenuUser;