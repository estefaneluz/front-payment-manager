import './styles.css'
import { Link } from 'react-router-dom';
import Table from '../../components/Table';
import emailIcon from '../../assets/email-icon.svg';
import phoneIcon from '../../assets/phone-icon.svg';
import editIcon from '../../assets/edit-icon.svg';

const tableTitles = [
    "Clientes",
    "Cobranças Feitas",
    "Cobranças Recebidas",
    "Status"
]

function Client() {
    return (
        <div className="container"> 
            <Link className="btn btn-border-pink" to="/clients/new"> 
                Adicionar Cliente
            </Link> 
            <Table titles={tableTitles}>
                <tr>
                    <td className="table-client-data">
                        <p className="table-client-name">Nome e Sobrenome da Cliente</p>
                        <div className="table-client-contact">
                            <div>
                                <img src={emailIcon} alt="icone de e-mail"/>
                                <p>email@email.com</p>
                            </div>
                            <div>
                                <img src={phoneIcon} alt="icone de telefone"/>
                                <p>(71) 99999999</p>
                            </div>
                        </div>
                    </td>
                    <td>R$ 00.000,00</td>
                    <td>R$ 00.000,00</td>
                    <td>
                        <div className="table-client-status text-red">
                            <p> Inadimplente </p>
                            <img src={editIcon} alt="Icone de editar cliente"/>
                        </div>
                    </td>
                </tr>
            </Table>
        </div>
    )
}

export default Client;