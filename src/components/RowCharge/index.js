import './styles.css';
import { useState } from 'react';
import timestampToDate from '../../functions/timestampToDate';
import { handleStatus } from '../../functions/handleStatus';
import NoRecords from '../NoRecords';
import ModalEditCharge from '../ModalEditCharge';

function RowCharge({charges, getCharges}) {
    const [openModal, setOpenModal] = useState(false);
    const [selectedCharge, setSelectedCharge] = useState({});

    const handleModal = (charge) => {
        setSelectedCharge(charge);
        setOpenModal(true);
    }

    const closeModal = async () => {
        setOpenModal(false);
        await getCharges();
    }

    return(
        <>
            {!!charges[0]?.id ?
                charges.map( charge => (
                    <tr key={charge.id} onClick={() => handleModal(charge)}>
                        <td className="text-bold">{`#${charge.id}`}</td>
                        <td>{charge.name}</td>
                        <td className="charge-description">{charge.description}</td>
                        <td>R$ {charge.amount / 100}</td>
                        <td className={`text-status 
                            --${handleStatus(charge.status, charge.due_date).className}`}
                        >
                            {handleStatus(charge.status, charge.due_date).text}
                        </td>
                        <td>{timestampToDate(charge.due_date, 'DD/MM/YYYY')}</td>
                    </tr>
                ))

                : <NoRecords element='cobranças' pronoun='a' link='/charges/new' />
            }

            { openModal && 
                <ModalEditCharge closeModal={closeModal} charge={selectedCharge}/> 
            }
        </>
    )
}

export default RowCharge;