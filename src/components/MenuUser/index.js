import { useState, useEffect, useRef, useContext } from 'react';
import './styles.css';
import { GlobalStatesContext } from '../../contexts/GlobalStatesContext';
import userPicture from '../../assets/user-picture.jpg';
import editIcon from '../../assets/edit-icon.svg';
import logoutIcon from '../../assets/logout-icon.svg';
import ModalEditUser from '../ModalEditUser';

const useClickOutside = (handler) => {
    const domNode = useRef();

    useEffect(() => {
        function maybeHandler(e) {
            if (!domNode.current?.contains(e.target)) {
                handler();
            }
        }

        document.addEventListener('click', maybeHandler);

        return () => {
            document.removeEventListener('click', maybeHandler);
        };
    });

    return domNode;
};

function MenuUser() {
    const [dropdown, setDropdown] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const { logout } = useContext(GlobalStatesContext);

    const refDropdown = useClickOutside(() => setDropdown(false));

    const toggleModal = () => {
        setOpenModal(!openModal);
        setDropdown(!dropdown);
    }
    
    return (
        <div className="user-container">
            <img 
                ref={refDropdown}
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

                    <div onClick={logout}>
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