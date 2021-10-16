import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalStatesContext } from '../../contexts/GlobalStatesContext';

import Table from '../../components/Table';
import ModalEditClient from '../../components/ModalEditClient';
import ModalClientData from '../../components/ModalClientData'
import { phoneMask } from '../../functions/stringMasks';
import NoRecords from '../../components/NoRecords';
import Search from '../../components/Search';
import RowClient from '../../components/RowClient';

import emailIcon from '../../assets/email-icon.svg';
import phoneIcon from '../../assets/phone-icon.svg';
import editIcon from '../../assets/edit-icon.svg';

export const clientTitles = [
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
                <Table titles={clientTitles}>
                    <RowClient clients={clients} />
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