import './styles.css';

function Table({titles, children}) {
    return (
        <table className="text-left">
            <tr className="table-header">
                <th>Clientes</th>
                <th>Cobranças Feitas</th>
                <th>Cobranças recebidas</th>
                <th>Status</th>
            </tr>
            {children}
        </table>
    )
}

export default Table;
