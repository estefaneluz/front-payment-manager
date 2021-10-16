import { useContext } from 'react';
import { ReportsStatesContext } from '../../contexts/ReportsStatesContext';
import { useHistory } from 'react-router-dom';

import './styles.css';
import Card from '../../components/Card';
import CardCounter from '../../components/CardCounter';
import userIcon from '../../assets/user-icon.svg';
import moneyIcon from '../../assets/money-icon.svg';

function Home() {
    const { setReportFilter } = useContext(ReportsStatesContext);
    const history = useHistory();

    const handleReportFilter = (filter) => {
        setReportFilter(filter);
        history.push('/reports');
    }

    return(
        <>
        <div className="home-container">
            <Card icon={userIcon} title="Clientes">
                <CardCounter 
                    color="green"
                    text="Em dia"
                    number="0"
                    handleReportFilter={() => handleReportFilter(
                        {page: 'Clientes', status: 'Em dia'}
                    )}
                />
                <CardCounter 
                    color="red"
                    text="Inadimplentes"
                    number="0"
                    handleReportFilter={() => handleReportFilter(
                        {page: 'Clientes', status: 'Inadimplentes'}
                    )}
                />
            </Card>
            <Card icon={moneyIcon} title="Cobranças">
                <CardCounter 
                    color="blue"
                    text="Previstas"
                    number="0"
                    handleReportFilter={() => handleReportFilter(
                        {page: 'Cobranças', status: 'Previstas'}
                    )}
                />
                <CardCounter 
                    color="red"
                    text="Vencidas"
                    number="0"
                    handleReportFilter={() => handleReportFilter(
                        {page: 'Cobranças', status: 'Vencidas'}
                    )}
                />
                <CardCounter 
                    color="green"
                    text="Pagas"
                    number="0"
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