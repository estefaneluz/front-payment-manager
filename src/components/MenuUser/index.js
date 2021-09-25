import { useState, useEffect } from 'react';
import './styles.css';
import userPicture from '../../assets/user-picture.jpg';
import editIcon from '../../assets/edit-icon.svg';
import logoutIcon from '../../assets/logout-icon.svg';

function MenuUser() {
    const [dropdown, setDropdown] = useState(false);

    const toggleDropdown = () => {
        setDropdown(!dropdown);
    }

    return (
        <div className="user-container">
            <img 
                className="user-picture"
                src={userPicture} 
                alt="imagem do usuário" 
                onClick={toggleDropdown}
            />
            { dropdown &&
                <div className="user-dropdown">
                    <div>
                        <img src={editIcon} alt="icone de editar" />
                        <p>Editar</p>
                    </div>

                    <div>
                        <img src={logoutIcon} alt="icone de deslogar" />
                        <p>Deslogar</p>
                    </div>
                </div>
            }
        </div>
    );
}

export default MenuUser;