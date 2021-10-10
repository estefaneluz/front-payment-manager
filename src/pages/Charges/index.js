import './styles.css';
import { useState, useEffect, useContext } from 'react';
import Table from '../../components/Table';
import { GlobalStatesContext } from '../../contexts/GlobalStatesContext';

const tableTitles = [
    "Id",
    "Cliente",
    "Descrição",
    "Valor",
    "Status",
    "Vencimento"
]

function Charges() {
    const [charges, setCharges] = useState();
    const { token } = useContext(GlobalStatesContext);

    const getCharges = async () => {
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
    }

    useEffect(() => {
        const awaitGetCharges = async () => {
            await getCharges();
        }

        awaitGetCharges();
        console.log(charges);
    }, []);

    return (
        <div className="container">
            <Table titles={tableTitles}>
                {!!charges &&
                    charges.map( charge => (
                        <tr key={charge.id}>
                            <td className="text-bold">{`#${charge.id}`}</td>
                            <td>{charge.name}</td>
                            <td className="charge-description">{charge.description}</td>
                            <td>R$ {charge.amount / 100}</td>
                            <td className={`text-status ${charge.status ? '--green' : '--blue'}`}>
                                {charge.status ? 'pago' : 'pendente'}
                            </td>
                            <td>{charge.due_date}</td>
                        </tr>
                    ))
                }
            </Table>
        </div>
    );
}

export default Charges;