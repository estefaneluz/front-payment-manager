import { Link } from 'react-router-dom';
import Table from '../../components/Table'

function Client() {
    return (
        <div className="container"> 
            <Link className="btn btn-border-pink" to="/clients/new"> 
                Adicionar Cliente
            </Link> 
            <Table>
                <tr>
                    <td>Ralf</td>
                    <td>26</td>
                    <td>324</td>
                    <td>Em diaaaaaaaaaaaaa <button>aa</button></td>
                </tr>
            </Table>
        </div>
    )
}

export default Client;