import { useState, useEffect, useContext } from 'react';
import Table from '../../components/Table';
import { GlobalStatesContext } from '../../contexts/GlobalStatesContext';
import { OrderTableStatesContext } from '../../contexts/OrderTableStatesContext';
import { sortDataByName, sortData} from '../../functions/sortDataByName';
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
    const [search, setSearch] = useState('');    
    const { token, setLoading } = useContext(GlobalStatesContext);
    const { orderTable } = useContext(OrderTableStatesContext);

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
        if(Array.isArray(response)) {
            response.sort(sortDataByName);
            setLoading(false);

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


    useEffect(() => {
        const awaitGetCharges = async () => {
            setCharges(await getCharges());
        }

        awaitGetCharges();
    }, []);

    useEffect(() => {
        sortData(charges, setCharges, orderTable)
    }, [orderTable]);

    return (
        <div className="container">
            <Search 
                className="self-end" 
                search={search} 
                setSearch={setSearch} 
                getSearch={searchCharge}
            />
            <Table titles={chargesTitles} type="clients">
                <RowCharge charges={charges} getCharges={getCharges} setCharges={setCharges}/>
            </Table>
        </div>
    );
}

export default Charges;