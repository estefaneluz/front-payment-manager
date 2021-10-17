import './styles.css';
import { useState, useContext } from 'react';
import { OrderTableStatesContext } from '../../contexts/OrderTableStatesContext';
import arrowAscIcon from '../../assets/arrow-asc-icon.svg';
import arrowDescIcon from '../../assets/arrow-desc-icon.svg';

function Table({titles, children}) {
    return (
        <table className="text-left">
            <tr className="table-header">
                {titles.map(title => 
                    <th> 
                        <div className={`table-titles ${title === 'Cliente' ? '--order' : ''}`}>
                            <p> {title} </p> 
                            {title === 'Cliente' && 
                                <img src={arrowDescIcon} alt="Icone de ordenação" />
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
