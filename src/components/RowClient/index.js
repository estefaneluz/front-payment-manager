import './styles.css';
import { useState } from "react";
import NoRecords from "../NoRecords";
import { phoneMask } from "../../functions/stringMasks";

import phoneIcon from '../../assets/phone-icon.svg';
import emailIcon from '../../assets/email-icon.svg';
import editIcon from '../../assets/edit-icon.svg';
import ModalEditClient from "../ModalEditClient";
import ModalClientData from "../ModalClientData";

function RowClient({clients}) {

    const [idClient, setIdClient] = useState(null);
    const [open, setOpen] = useState({ modalEdit: false, modalData: false });

    const handleDetailedClient = (id) => {
        setIdClient(id);
        setOpen((prevState) => { return {...prevState, modalData: true}})
    }

    const handleEditClient = (id) => {
        setIdClient(id);
        setOpen((prevState) => { return {...prevState, modalEdit: true}})
    }

    const clearStates = () => {
        setIdClient(null);
        setOpen({modalEdit: false, modalData: false});
    }

    return(
    <>
        {!!clients[0]?.id ? (clients.map( client => (
            <tr>
                <td className="table-client-data" >
                    <p 
                        className="table-client-name"
                        onClick={() => handleDetailedClient(client.id)}
                    >
                        {client.name}
                    </p>
                    <div className="table-client-contact">
                        <div>
                            <img src={emailIcon} alt="icone de e-mail"/>
                            <p>{client.email}</p>
                        </div>
                        <div>
                            <img src={phoneIcon} alt="icone de telefone"/>
                            <p>{phoneMask(client.phone)}</p>
                        </div>
                    </div>
                </td>
                <td>
                    R$ {!!client.totalAmountCharges ? client.totalAmountCharges / 100 : '0'}
                </td>
                <td>
                    R$ {!!client.totaAmountReceived ? client.totaAmountReceived / 100 : '0'}
                </td>
                <td>
                    <div className={
                        `table-client-status text-status --${client.isLate ? 'red' : 'green'}`}
                    >
                        <p> {client.isLate ? 'Inadimplente' : 'Em dia'} </p>
                        <img 
                            src={editIcon} 
                            alt="Icone de editar cliente" 
                            onClick={() => handleEditClient(client.id)}
                        />
                    </div>
                </td>
            </tr>
        )))
        : <NoRecords element='clientes' pronoun='o' link='/clients/new' />
        }

        {!!open.modalEdit ? (
            <ModalEditClient onClick= {clearStates} id={idClient}/>
        ) : '' }

        {!!open.modalData && (
            <ModalClientData onClick= {clearStates} id={idClient} />
        )}
    </>)
}

export default RowClient;