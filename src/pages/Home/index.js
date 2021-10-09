import './styles.css';
import Card from '../../components/Card';
import CardCounter from '../../components/CardCounter';
import userIcon from '../../assets/user-icon.svg';
import moneyIcon from '../../assets/money-icon.svg';

function Home() {
    return(
        <>
        <div className="home-container">
            <Card icon={userIcon} title="Clientes">
                <CardCounter 
                    color="green"
                    text="Em dia"
                    number="0"
                />
                <CardCounter 
                    color="red"
                    text="Inadimplentes"
                    number="0"
                />
            </Card>
            <Card icon={moneyIcon} title="Cobranças">
                <CardCounter 
                    color="blue"
                    text="Previstas"
                    number="0"
                />
                <CardCounter 
                    color="red"
                    text="Vencidas"
                    number="0"
                />
                <CardCounter 
                    color="green"
                    text="Pagas"
                    number="0"
                />
            </Card>
        </div>
        </>
    );
}

export default Home;