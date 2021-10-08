import './styles.css'
import { useState } from 'react';
import { Link } from 'react-router-dom';

import Table from '../../components/Table';
import ModalEditClient from '../../components/ModalEditClient';
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
    const [open, setOpen] = useState(false);

    return (
        <>
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
                                <img 
                                    src={editIcon} 
                                    alt="Icone de editar cliente" 
                                    onClick={() => setOpen(true)}
                                />
                            </div>
                        </td>
                    </tr>
                </Table>
            </div>

            {open && (
                <ModalEditClient setOpen={setOpen}/>
            )}
        </>
    )
}

export default Client;