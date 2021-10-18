import './styles.css';
import { useState, useEffect, useContext } from 'react';
import arrowIcon from '../../assets/arrow-right-icon.svg';
import Dropdown from '../Dropdown';
import { ReportsStatesContext } from '../../contexts/ReportsStatesContext';

const clients_options = ['Em dia', 'Inadimplentes'];
const charges_options = ['Previstas', 'Pagas', 'Vencidas'];
const pages_options = ['Clientes', 'Cobranças'];

function ReportNavigation(props) {
    const { reportFilter } = useContext(ReportsStatesContext);
    const [options, setOptions] = useState([]);
    const [openDropdown, setOpenDropdown] = useState({page: false, status: false});

    useEffect(() => {
        if(reportFilter.page === 'Clientes') {
            setOptions(clients_options);
        } else {
            setOptions(charges_options);
        }
    }, [reportFilter]);

    const handleDropdownStatus = () => {
        if(openDropdown.page && !openDropdown.status) handleDropdownPage();
     
        setOpenDropdown((prevState) => { 
            return {...prevState, status: !openDropdown.status}
        })
    }

    const handleDropdownPage = () => {
        if(!openDropdown.page && openDropdown.status) handleDropdownStatus();

        setOpenDropdown((prevState) => { 
            return {...prevState, page: !openDropdown.page}
        })
    }

    return(
        <div className="flex-row navigation-container">
            <div>
                <p className="navigation-title" onClick={handleDropdownPage}>
                    {reportFilter.page}
                </p>
                {openDropdown.page && <Dropdown options={pages_options} />}
            </div>
            <img src={arrowIcon} alt="icone de seta"/>
            <div>
                <p className="navigation-title" onClick={handleDropdownStatus}>
                    {reportFilter.status}
                </p>
                {openDropdown.status && <Dropdown options={options} />}
            </div>
        </div>
    )
}

export default ReportNavigation;