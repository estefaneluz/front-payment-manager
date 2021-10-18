import './styles.css';
import { useContext } from 'react';
import { OrderTableStatesContext } from '../../contexts/OrderTableStatesContext';
import arrowAscIcon from '../../assets/arrow-asc-icon.svg';
import arrowDescIcon from '../../assets/arrow-desc-icon.svg';

function Table({titles, children}) {
    const { orderTable, setOrderTable } = useContext(OrderTableStatesContext);


    const handleOrderClients = () => {
        if(orderTable === 'asc') {
            return setOrderTable('desc');
        }

        return setOrderTable('asc');
    }

    return (
        <table className="text-left">
            <tr className="table-header">
                {titles.map(title => 
                    <th> 
                        <div 
                            onClick={handleOrderClients}
                            className={`table-titles ${title === 'Cliente' ? '--order' : ''}`}
                        >
                            <p> {title} </p> 
                            {title === 'Cliente' && 
                                <img 
                                    src={orderTable === 'asc' ? arrowAscIcon : arrowDescIcon} 
                                    alt="Icone de ordenação" 
                                />
                            }
                        </div>
                    </th>
                )}
            </tr>
            {children}
        </table>
    )
}

export default Table;
