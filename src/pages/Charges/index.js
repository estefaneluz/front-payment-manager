import { useState, useEffect, useContext } from 'react';
import Table from '../../components/Table';
import { GlobalStatesContext } from '../../contexts/GlobalStatesContext';
import Search from '../../components/Search';
import RowCharge from '../../components/RowCharge';

export const chargesTitles = [
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

    useEffect(() => {
        const awaitGetCharges = async () => {
            setCharges(await getCharges());
        }

        awaitGetCharges();
    }, []);

    return (
        <div className="container">
            <Search className="self-end" />
            <Table titles={chargesTitles}>
                <RowCharge charges={charges} getCharges={getCharges} setCharges={setCharges}/>
            </Table>
        </div>
    );
}

export default Charges;