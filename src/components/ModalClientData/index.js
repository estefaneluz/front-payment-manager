import './styles.css';
import { useState, useEffect, useContext } from 'react';
import { GlobalStatesContext } from '../../contexts/GlobalStatesContext';
import { phoneMask, cpfMask, cepMask } from '../../functions/stringMasks';
import NoRecords from '../NoRecords';

import CardCharge from '../CardCharge';
import emailIcon from '../../assets/email-icon.svg';
import phoneIcon from '../../assets/phone-icon.svg';
import ifExistsPrint from '../../functions/ifExistsPrint';


function ModalClientData({id, onClick}) {
    const [client, setClient] = useState({});
    const [cep, setCep] = useState('');
    const { token, setLoading } = useContext(GlobalStatesContext);

    const getDetailedClient = async () => {
        setLoading(true);

        const response = await fetch(
            `https://api-payment-manager.herokuapp.com/detalhes-cliente/${id}`,
            {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            }
        );
    
        const clientData = await response.json();
    
        setLoading(false);
    
        const cepExistente = ifExistsPrint(clientData.address.zipcode, "Não informado");
        if(cepExistente !== "Não informado") {
            setCep(cepMask(cepExistente));
        }
        return setClient(clientData);
    }
    useEffect(() => {
        const awaitDetailedClient = async () => {
            await getDetailedClient();
        }

        awaitDetailedClient();
    }, []);


    return(
        <div className="modal">
            {!!client.name && (
                <div className="card">
                    <div className="modal-close" onClick={onClick}>X</div>
                    <h2>{client.name}</h2>
                    <p>{cpfMask(client.cpf)}</p>
                    <div className="card-row">
                        <div className="card-client-information --divider">
                            <div className="card-row card-contact --wrap">
                                <div className="flex-row">
                                    <img src={emailIcon} alt="icone de e-mail"/>
                                    <p>{client.email}</p>
                                </div>
                                <div className="flex-row">
                                    <img src={phoneIcon} alt="icone de telefone" />
                                    <p>{phoneMask(client.phone)}</p>
                                </div>
                            </div>
                            <div className="card-row --wrap">
                                <div>
                                    <h5>CEP</h5>
                                    <p>{!!cep ? cep : "Não informado"}</p>
                                </div>

                                <div>
                                    <h5>Bairro</h5>
                                    <p>{ifExistsPrint(client.address.district, "Não informado")}</p>
                                </div>

                                <div>
                                    <h5>Cidade</h5>
                                    <p>
                                        {ifExistsPrint(client.address.city, "Não informado")}
                                        {(!!client.address.city && !!client.address.state) 
                                            ? ` - ${client.address.state}` : ''
                                        }
                                    </p>
                                </div>
                            </div>

                            <div>
                                <h5>Logradouro</h5>
                                <p>{ifExistsPrint(client.address.street, "Não informado")}</p>
                            </div>

                            <div className="card-row --wrap">
                                <div>
                                    <h5>Complemento</h5>
                                    <p>{ifExistsPrint(client.address.additional, "Não informado")}</p>
                                </div>

                                <div>
                                    <h5>Ponto de Referência</h5>
                                    <p>{ifExistsPrint(client.address.landmark, "Não informado")}</p>
                                </div>
                            </div>
                        </div>
                        <div className="card-column-charges">
                            {client.charges.length ? 
                                client.charges.map(charge => 
                                    <CardCharge charge={charge} />
                                )
                                : <NoRecords message="Não há cobranças registradas." link='/charges/new' />
                            }
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ModalClientData; 