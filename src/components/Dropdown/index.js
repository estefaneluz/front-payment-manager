import './styles.css';
import { useContext } from 'react';
import { ReportsStatesContext } from '../../contexts/ReportsStatesContext';

function Dropdown({options}) {
    const { reportFilter, setReportFilter } = useContext(ReportsStatesContext)

    const handleReportFilter = (filter) => {

        if(filter === 'Cobranças') {
            setReportFilter({
                page: filter,
                status: 'Previstas'
            })
            return;
        } else if (filter === 'Clientes') {
            setReportFilter({
                page: filter,
                status: 'Em dia'
            })
            return;
        }

        setReportFilter({
            page: reportFilter.page,
            status: filter
        });
    }

    return (
        <div className="dropdown-container">
            {options.map(op => 
                <p  className={
                    (reportFilter.status === op) || (reportFilter.page === op) 
                    ? '--selected' 
                    : ''}
                    onClick={() => handleReportFilter(op)}
                >
                    {op}
                </p>
            )}
        </div>
    );
}

export default Dropdown;