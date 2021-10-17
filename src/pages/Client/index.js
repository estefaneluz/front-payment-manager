import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalStatesContext } from '../../contexts/GlobalStatesContext';

import Table from '../../components/Table';
import Search from '../../components/Search';
import RowClient from '../../components/RowClient';


export const clientTitles = [
    "Clientes",
    "Cobranças Feitas",
    "Cobranças Recebidas",
    "Status"
]

function Client() {
    const [clients, setClients] = useState([]);
    const { token, setLoading } = useContext(GlobalStatesContext);

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
        setLoading(false);
        return response;
    }

    useEffect(() => {
        const awaitGetClients = async () => {
            setClients(await getClients());
        }

        awaitGetClients();
    }, []);

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
                    <RowClient clients={clients} getClients={getClients} setClients={setClients}/>
                </Table>
            </div>
        </>
    )
}

export default Client;