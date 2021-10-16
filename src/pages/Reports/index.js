import { useState, useEffect, useContext } from 'react';
import ReportNavigation from "../../components/ReportNavigation";
import Table from '../../components/Table';
import RowClient from "../../components/RowClient";
import Search from '../../components/Search';
import { clientTitles } from '../Client';
import { chargesTitles } from '../Charges';
import { GlobalStatesContext } from '../../contexts/GlobalStatesContext';

function Reports() {
    const [clients, setClients] = useState([]);
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

    return(
        <div className="container">
            <div className="flex-row items-center space-between">
                <ReportNavigation />
                <Search />
            </div>
            <Table titles={clientTitles}>
                <RowClient clients={clients} getClients={getClients} />
            </Table>
        </div>
    );
}

export default Reports;