import './styles.css'
import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalStatesContext } from '../../contexts/GlobalStatesContext';

import Table from '../../components/Table';
import ModalEditClient from '../../components/ModalEditClient';
import ModalClientData from '../../components/ModalClientData'
import { phoneMask } from '../../functions/stringMasks';
import NoRecords from '../../components/NoRecords';
import Search from '../../components/Search';

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
    const [open, setOpen] = useState({ modalEdit: false, modalData: false });
    const [clients, setClients] = useState([]);
    const [idClient, setIdClient] = useState(null);
    const { token, setLoading } = useContext(GlobalStatesContext);

    const getClients = async () => {
        setLoading(true);
        const response = await fetch(
            "https://api-payment-manager.herokuapp.com/clientes/",
            {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            }
        );
        setClients(await response.json());
        setLoading(false);
    }

    useEffect(() => {
        const awaitGetClients = async () => {
            await getClients();
        }

        awaitGetClients();
    }, [!open.modalEdit]);

    const handleDetailedClient = (id) => {
        setIdClient(id);
        setOpen((prevState) => { return {...prevState, modalData: true}})
    }

    const handleEditClient = (id) => {
        setIdClient(id);
        setOpen((prevState) => { return {...prevState, modalEdit: true}})
    }

    const clearStates = () => {
        setIdClient(null);
        setOpen({modalEdit: false, modalData: false});
    }

    return (
        <>
            <div className="container"> 
                <div className="flex-row items-center space-between">
                    <Link className="btn btn-border-pink" to="/clients/new"> 
                        Adicionar Cliente
                    </Link> 
                    <Search />
                </div>
                <Table titles={tableTitles}>
                    {!!clients[0]?.id ? (clients.map( client => (
                        <tr>
                            <td className="table-client-data" >
                                <p 
                                    className="table-client-name"
                                    onClick={() => handleDetailedClient(client.id)}
                                >
                                    {client.name}
                                </p>
                                <div className="table-client-contact">
                                    <div>
                                        <img src={emailIcon} alt="icone de e-mail"/>
                                        <p>{client.email}</p>
                                    </div>
                                    <div>
                                        <img src={phoneIcon} alt="icone de telefone"/>
                                        <p>{phoneMask(client.phone)}</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                R$ {!!client.totalAmountCharges ? client.totalAmountCharges / 100 : '0'}
                            </td>
                            <td>
                                R$ {!!client.totaAmountReceived ? client.totaAmountReceived / 100 : '0'}
                            </td>
                            <td>
                                <div className={
                                    `table-client-status text-status --${client.isLate ? 'red' : 'green'}`}
                                >
                                    <p> {client.isLate ? 'Inadimplente' : 'Em dia'} </p>
                                    <img 
                                        src={editIcon} 
                                        alt="Icone de editar cliente" 
                                        onClick={() => handleEditClient(client.id)}
                                    />
                                </div>
                            </td>
                        </tr>
                    )))
                    : <NoRecords element='clientes' pronoun='o' link='/clients/new' />
                }
                </Table>
            </div>

            {!!open.modalEdit ? (
                <ModalEditClient onClick= {clearStates} id={idClient}/>
            ) : '' }

            {!!open.modalData && (
                <ModalClientData onClick= {clearStates} id={idClient} />
            )}
        </>
    )
}

export default Client;