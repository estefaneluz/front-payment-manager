import './styles.css';
import arrowIcon from '../../assets/arrow-right-icon.svg';
import Dropdown from '../Dropdown';

const clients_options = ['Em dia', 'Inadimplentes'];
const charges_options = ['Pendente', 'Pago', 'Vencido'];
const pages_options = ['Clientes', 'Cobrancas'];

function ReportNavigation(props) {
    return(
        <div className="flex-row navigation-container">
            <div>
                <p className="navigation-title">
                    Clientes
                </p>
                <Dropdown options={pages_options} />
            </div>
            <img src={arrowIcon} alt="icone de seta"/>
            <div>
                <p className="navigation-title">
                    Em dia
                </p>
                <Dropdown options={clients_options} />
            </div>
        </div>
    )
}

export default ReportNavigation;