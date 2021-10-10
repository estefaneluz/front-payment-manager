import './styles.css'
import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalStatesContext } from '../../contexts/GlobalStatesContext';

import Table from '../../components/Table';
import ModalEditClient from '../../components/ModalEditClient';
import ModalClientData from '../../components/ModalClientData'

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
    const [selectedClient, setSelectedClient] = useState({});
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
    }, []);

    useEffect(() => {
        console.log(clients);
    }, [clients])

    const handleDetailedClient = (data) => {
        setSelectedClient(data);
        setOpen((prevState) => { return {...prevState, modalData: true}})
    }

    const clearStates = () => {
        setSelectedClient({});
        setOpen({modalEdit: false, modalData: false});
    }

    return (
        <>
            <div className="container"> 
                <Link className="btn btn-border-pink" to="/clients/new"> 
                    Adicionar Cliente
                </Link> 
                <Table titles={tableTitles}>
                    {!!clients && (clients.map( client => (
                        <tr>
                            <td className="table-client-data" >
                                <p 
                                    className="table-client-name"
                                    onClick={() => handleDetailedClient(client)}
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
                                        <p>{client.phone}</p>
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
                                <div className="table-client-status text-status --red">
                                    <p> Inadimplente </p>
                                    <img 
                                        src={editIcon} 
                                        alt="Icone de editar cliente" 
                                        onClick={ () => 
                                            setOpen((prevState) => { return {...prevState, modalEdit: true}})
                                        }
                                    />
                                </div>
                            </td>
                        </tr>
                    )))}
                </Table>
            </div>

            {!!open.modalEdit ? (
                <ModalEditClient onClick={ () => 
                    setOpen((prevState) => { return {...prevState, modalEdit: false}})
                }/>
            ) : '' }

            {!!open.modalData && (
                <ModalClientData 
                    onClick= {clearStates}
                    client={selectedClient}
                />
            )}
        </>
    )
}

export default Client;