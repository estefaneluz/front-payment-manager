import './styles.css'
import '../../styles/global.css';
import { Link, useLocation } from 'react-router-dom';

import logoWhite from '../../assets/logo-white.svg';
import homeIcon from '../../assets/home-icon.svg';
import moneyIcon from '../../assets/money-icon.svg';
import userIcon from '../../assets/user-icon.svg';


function Sidebar() {
    const location = useLocation();

    return (
        <nav className="sidebar">
            <img 
                src={logoWhite} 
                alt={"Logo da cubos academy"}
                className="logo"
            />
            <div className="sidebar-menu">
                <Link
                    to="/home" 
                    className={location.pathname.includes('/home') && 'activated'}
                >
                    <img src={homeIcon} alt="icone da opção home" />
                    <p>Home</p>
                </Link>

                <Link 
                    to="/cobrancas"
                    className={location.pathname.includes('/cobrancas') && 'activated'}
                >
                    <img src={moneyIcon} alt="icone da opção cobranças" />
                    <p>Cobranças</p>
                </Link>

                <Link 
                    to="/clientes"
                    className={location.pathname.includes('/clientes') && 'activated'}
                >
                    <img src={userIcon} alt="icone da opção clientes" />
                    <p>Clientes</p>
                </Link>
            </div>
            <button className="btn btn-pink">Criar cobrança</button>
        </nav>
    )
}

export default Sidebar;