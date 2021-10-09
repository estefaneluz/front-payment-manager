import './styles.css';
import Table from '../../components/Table';

const tableTitles = [
    "Id",
    "Cliente",
    "Descrição",
    "Valor",
    "Status",
    "Vencimento"
]

function Charges() {
    return (
        <div className="container">
            <Table titles={tableTitles}>
                <tr>
                    <td className="text-bold">#90</td>
                    <td>Nome da Cliente</td>
                    <td>Pagamento referente à...</td>
                    <td>R$ 00.000,00</td>
                    <td className="text-status --green">Pago</td>
                    <td>12/12/2020</td>
                </tr>
            </Table>
        </div>
    );
}

export default Charges;