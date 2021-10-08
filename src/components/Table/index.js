import './styles.css';

function Table({titles, children}) {
    return (
        <table className="text-left">
            <tr className="table-header">
                {titles.map(title => <th> {title} </th>)}
            </tr>
            {children}
        </table>
    )
}

export default Table;
