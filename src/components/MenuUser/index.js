import './styles.css';
import userPicture from '../../assets/user-picture.jpg';

function MenuUser() {
    return (
        <div className="user-menu">
            <img 
                className="user-picture"
                src={userPicture} 
                alt="imagem do usuário" 
            />
        </div>
    );
}

export default MenuUser;