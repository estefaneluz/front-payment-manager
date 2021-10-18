import { useState, useContext, useEffect } from 'react';
import { ReportsStatesContext } from '../../contexts/ReportsStatesContext';
import { GlobalStatesContext } from '../../contexts/GlobalStatesContext';
import { useHistory } from 'react-router-dom';

import './styles.css';
import Card from '../../components/Card';
import CardCounter from '../../components/CardCounter';
import userIcon from '../../assets/user-icon.svg';
import moneyIcon from '../../assets/money-icon.svg';

function Home() {
    const [count, setCount] = useState({});
    const { setReportFilter } = useContext(ReportsStatesContext);
    const { token, setLoading } = useContext(GlobalStatesContext);
    const history = useHistory();

    const handleReportFilter = (filter) => {
        setReportFilter(filter);
        history.push('/reports');
    }

    const getCount = async () => {
        setLoading(true);
        const request = await fetch(
            "https://api-payment-manager.herokuapp.com/relatorios/",
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
        const awaitGetCount = async () => {
            setCount(await getCount());
        }

        awaitGetCount();
    }, [])

    return(
        <>
        <div className="home-container">
            <Card icon={userIcon} title="Clientes">
                <CardCounter 
                    color="green"
                    text="Em dia"
                    number={!!count.clients && count.clients.onDay}
                    handleReportFilter={() => handleReportFilter(
                        {page: 'Clientes', status: 'Em dia'}
                    )}
                />
                <CardCounter 
                    color="red"
                    text="Inadimplentes"
                    number={!!count.clients && count.clients.overdue}
                    handleReportFilter={() => handleReportFilter(
                        {page: 'Clientes', status: 'Inadimplentes'}
                    )}
                />
            </Card>
            <Card icon={moneyIcon} title="Cobranças">
                <CardCounter 
                    color="blue"
                    text="Previstas"
                    number={!!count.charges && count.charges.expected}
                    handleReportFilter={() => handleReportFilter(
                        {page: 'Cobranças', status: 'Previstas'}
                    )}
                />
                <CardCounter 
                    color="red"
                    text="Vencidas"
                    number={!!count.charges && count.charges.overdue}
                    handleReportFilter={() => handleReportFilter(
                        {page: 'Cobranças', status: 'Vencidas'}
                    )}
                />
                <CardCounter 
                    color="green"
                    text="Pagas"
                    number={!!count.charges && count.charges.paid}
                    handleReportFilter={() => handleReportFilter(
                        {page: 'Cobranças', status: 'Pagas'}
                    )}
                />
            </Card>
        </div>
        </>
    );
}

export default Home;