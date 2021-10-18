import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalStatesContext } from '../../contexts/GlobalStatesContext';
import { OrderTableStatesContext } from '../../contexts/OrderTableStatesContext';
import { sortDataByName, sortData} from '../../functions/sortDataByName';

import Table from '../../components/Table';
import Search from '../../components/Search';
import RowClient from '../../components/RowClient';


export const clientTitles = [
    "Cliente",
    "Cobranças Feitas",
    "Cobranças Recebidas",
    "Status"
]

function Client() {
    const [clients, setClients] = useState([]);
    const [search, setSearch] = useState('');
    const { token, setLoading } = useContext(GlobalStatesContext);
    const { orderTable } = useContext(OrderTableStatesContext);

    const getClients = async () => {
        setLoading(true);
        const request = await fetch(
            "https://api-payment-manager.herokuapp.com/clientes/",
            {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            }
        );

        const response = await request.json();
        if(Array.isArray(response)) {
            response.sort(sortDataByName);
            setLoading(false);

            if(orderTable === 'desc') {
                return response.reverse();
            }
        }
        return response;
    }

    const searchClient = async () => {
        const clientsCopy = await getClients();

        if (!search) {
            setClients(clientsCopy);
            return;
        }

        const filteredClients = clientsCopy.filter((client) =>
            (
                client.name.toLowerCase().includes(search.toLowerCase()) ||  
                client.email.toLowerCase().includes(search.toLowerCase())
            )
        );
        setClients(filteredClients);
    }

    useEffect(() => {
        const awaitGetClients = async () => {
            setClients(await getClients());
        }

        awaitGetClients();
    }, []);

    useEffect(() => {
        sortData(clients, setClients, orderTable)
    }, [orderTable]);

    return (
        <>
            <div className="container"> 
                <div className="flex-row items-center space-between">
                    <Link className="btn btn-border-pink" to="/clients/new"> 
                        Adicionar Cliente
                    </Link> 
                    <Search search={search} setSearch={setSearch} getSearch={searchClient} />
                </div>
                <Table titles={clientTitles}>
                    <RowClient clients={clients} getClients={getClients} setClients={searchClient}/>
                </Table>
            </div>
        </>
    )
}

export default Client;