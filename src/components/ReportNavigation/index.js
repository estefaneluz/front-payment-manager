import './styles.css';
import arrowIcon from '../../assets/arrow-right-icon.svg';
import Dropdown from '../Dropdown';

function ReportNavigation(props) {
    return(
        <>
        <div className="flex-row navigation-container">
            <div>
                <p className="navigation-title">
                    Clientes
                </p>
                <Dropdown options={['Clientes', 'Cobranças']} />
            </div>
            <img src={arrowIcon} alt="icone de seta"/>
            <div>
                <p className="navigation-title">
                    Em dia
                </p>
                <Dropdown options={['Em dia', 'Inadimplentes']} />
            </div>
        </div>
        </>
    )
}

export default ReportNavigation;