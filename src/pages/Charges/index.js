import './styles.css';
import { useState, useEffect, useContext } from 'react';
import Table from '../../components/Table';
import { GlobalStatesContext } from '../../contexts/GlobalStatesContext';
import timestampToDate from '../../functions/timestampToDate';
import { handleStatus } from '../../functions/handleStatus';
import NoRecords from '../../components/NoRecords';
import Search from '../../components/Search';
import ModalEditCharge from '../../components/ModalEditCharge';

const tableTitles = [
    "Id",
    "Cliente",
    "Descrição",
    "Valor",
    "Status",
    "Vencimento"
]

function Charges() {
    const [charges, setCharges] = useState([]);    
    const { token, setLoading } = useContext(GlobalStatesContext);

    const getCharges = async () => {
        setLoading(true);
        const response = await fetch(
            "https://api-payment-manager.herokuapp.com/cobrancas/",
            {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            }
        );
        setCharges(await response.json());
        setLoading(false);
    }

    useEffect(() => {
        const awaitGetCharges = async () => {
            await getCharges();
        }

        awaitGetCharges();
    }, []);

    return (
        <div className="container">
            <Search className="self-end" />
            <Table titles={tableTitles}>
                {!!charges[0]?.id ?
                    charges.map( charge => (
                        <tr key={charge.id}>
                            <td className="text-bold">{`#${charge.id}`}</td>
                            <td>{charge.name}</td>
                            <td className="charge-description">{charge.description}</td>
                            <td>R$ {charge.amount / 100}</td>
                            <td className={`text-status 
                                --${handleStatus(charge.status, charge.due_date).className}`}
                            >
                                {handleStatus(charge.status, charge.due_date).text}
                            </td>
                            <td>{timestampToDate(charge.due_date)}</td>
                        </tr>
                    ))

                    : <NoRecords element='cobranças' pronoun='a' link='/charges/new' />
                }
            </Table>

            <ModalEditCharge />
        </div>
    );
}

export default Charges;