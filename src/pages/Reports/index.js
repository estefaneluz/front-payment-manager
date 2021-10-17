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
import { handleStatus } from '../../functions/handleStatus';

function Reports() {
    const [charges, setCharges] = useState([]);
    const [clients, setClients] = useState([]);
    const { token, setLoading } = useContext(GlobalStatesContext);
    const { reportFilter } = useContext(ReportsStatesContext);

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

    const filterClientsByStatus = async () => {
        const allClients = await getClients();
        let filteredClients;
        if(reportFilter.status === 'Em dia'){
            filteredClients = allClients.filter(client => client.isLate === false);
        } else {
            filteredClients = allClients.filter(client => client.isLate === true);
        }

        return filteredClients;
    }

    const getCharges = async () => {
        setLoading(true);
        const request = await fetch(
            "https://api-payment-manager.herokuapp.com/cobrancas/",
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


    const filterChargesByStatus = async () => {
        const allCharges = await getCharges();
        let filteredCharges;
        if(reportFilter.status === 'Previstas') {
            filteredCharges = allCharges.filter(charge => {
                const status = handleStatus(charge.status, charge.due_date);
                if(status.text === 'Pendente') return charge;
            });
        } else if (reportFilter.status === 'Pagas') {
            filteredCharges = allCharges.filter(charge => {
                const status = handleStatus(charge.status, charge.due_date);
                if(status.text === 'Pago') return charge;
            });
        } else {
            filteredCharges = allCharges.filter(charge => {
                const status = handleStatus(charge.status, charge.due_date);
                if(status.text === 'Vencido') return charge;
            });
        }

        return filteredCharges;
    }

    useEffect(() => {
        const awaitGetClients = async () => {
            if(reportFilter.page === 'Clientes') {
                setCharges([]);
                setClients(await filterClientsByStatus());
            } else {
                setClients([]);
                setCharges(await filterChargesByStatus());
            }
        }

        awaitGetClients();
    }, [reportFilter]);

    return(
        <div className="container">
            <div className="flex-row items-center space-between">
                <ReportNavigation />
                <Search />
            </div>
            <Table titles={reportFilter.page === 'Clientes' ? clientTitles :  chargesTitles}>
                {reportFilter.page === 'Clientes' ?
                    !!clients[0]?.id && 
                        <RowClient clients={clients} getClients={filterChargesByStatus} setClients={setClients} />
                    : !!charges[0]?.id &&
                        <RowCharge charges={charges} getCharges={filterChargesByStatus} setCharges={setCharges}/>
                }
            </Table>
        </div>
    );
}

export default Reports;