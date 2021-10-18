import { useState, useEffect, useContext } from 'react';
import ReportNavigation from "../../components/ReportNavigation";
import Table from '../../components/Table';
import RowClient from "../../components/RowClient";
import RowCharge from '../../components/RowCharge';
 import Search from '../../components/Search';

import { clientTitles } from '../Client';
import { chargesTitles } from '../Charges';
import { GlobalStatesContext } from '../../contexts/GlobalStatesContext';
import { ReportsStatesContext } from '../../contexts/ReportsStatesContext';
import { OrderTableStatesContext } from '../../contexts/OrderTableStatesContext';
import { sortDataByName, sortData } from '../../functions/sortDataByName';

function Reports() {
    const [charges, setCharges] = useState([]);
    const [clients, setClients] = useState([]);
    const [search, setSearch] = useState('');
    const { token, setLoading } = useContext(GlobalStatesContext);
    const { reportFilter } = useContext(ReportsStatesContext);
    const { orderTable } = useContext(OrderTableStatesContext);

    const handleStatusParam = () => {
        if(reportFilter.status === 'Em dia') return 'em-dia'
        return reportFilter.status.toLowerCase();
    }

    const getClients = async () => {
        setLoading(true);
        const status = handleStatusParam();
        const request = await fetch(
            `https://api-payment-manager.herokuapp.com/relatorios/clientes?status=${status}`,
            {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            }
        );
        const response = await request.json();
        response.sort(sortDataByName);
        setLoading(false);

        if(orderTable === 'desc') {
            return response.reverse();
        }

        return response;
    }

    const getCharges = async () => {
        setLoading(true);
        const status = handleStatusParam();
        const request = await fetch(
            `https://api-payment-manager.herokuapp.com/relatorios/cobrancas?status=${status}`,
            {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            }
        );

        const response = await request.json();
        setLoading(false);

        if(Array.isArray(response)) {
            response.sort(sortDataByName);

            if(orderTable === 'desc') {
                return response.reverse();
            }
        }
        return response;
    }

    const searchCharge = async () => {
        const chargesCopy = await getCharges();

        if (!search) {
            setCharges(chargesCopy);
            return;
        }

        const filteredCharges = chargesCopy.filter((charge) =>
            (
                charge.name.toLowerCase().includes(search.toLowerCase()) ||  
                charge.id.toString().includes(search) 

            )
        );
        setCharges(filteredCharges);
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
            if(reportFilter.page === 'Clientes') {
                setCharges([]);
                setClients(await getClients());
            } else {
                setClients([]);
                setCharges(await getCharges());
            }
        }

        awaitGetClients();
    }, [reportFilter]);

    useEffect(() => {
        if(reportFilter.page === 'Clientes') {
            sortData(clients, setClients, orderTable);
        } else {
            sortData(charges, setCharges, orderTable);
        }
    }, [orderTable]);

    return(
        <div className="container">
            <div className="flex-row items-center space-between">
                <ReportNavigation />
                <Search 
                    search={search} 
                    setSearch={setSearch} 
                    getSearch={reportFilter.page === 'Clientes' ? searchClient :  searchCharge} 
                />
            </div>
            <Table titles={reportFilter.page === 'Clientes' ? clientTitles :  chargesTitles}>
                {reportFilter.page === 'Clientes' ?
                    <RowClient clients={clients} getClients={getClients} setClients={setClients} />
                :   <RowCharge charges={charges} getCharges={getCharges} setCharges={setCharges}/>
                }
            </Table>
        </div>
    );
}

export default Reports;