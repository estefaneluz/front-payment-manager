import './styles.css';
import { useState, useEffect, useContext } from 'react';
import InputRound from "../InputRound";
import { useForm } from 'react-hook-form';

import getAddressByCep from '../../services/viaCEP';
import { GlobalStatesContext } from '../../contexts/GlobalStatesContext';
import ifExistsPrint from '../../functions/ifExistsPrint';

function ModalEditClient(props) {
    const [cep, setCep] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [street, setStreet] = useState('');
    const [state, setState] = useState('');
    // const [address, setAddress] = useState({});

    const [buttonClass, setButtonClass] = useState('pink-opacity');
    const [client, setClient] = useState({});

    const { register, watch, handleSubmit, formState: { errors }, setValue } = useForm();
    const watchFields = watch(['name', 'email', 'cpf', 'phone']);
    const { token, setLoading, setAlert } = useContext(GlobalStatesContext);

    const clearFields = () => {
        setCep('');
        setCity('');
        setDistrict('');
        setStreet('');
        setState('');

        setValue('cpf', '');
        setValue('phone', '');
    }

    const loadAddressByCep = async (cep) => {
        const address = await getAddressByCep(cep);
        
        if(!address) {
            setAlert({
                type:"error",
                message: "Endereço não encontrado"
            });
            return;
        }

        setCity(address.localidade);
        setDistrict(address.bairro);
        setStreet(address.logradouro);
        setState(address.uf);
        // setAddress((prev) => { return {...prev, state: address.uf}});
    }

    const getClientData = async () => {
        setLoading(true);

        const response = await fetch(
        `https://api-payment-manager.herokuapp.com/perfil-clientes/${props.id}`,
        {
            method: "GET",
            headers: {
            Authorization: `Bearer ${token}`,
            },
        }
        );

        const clientData = await response.json();

        setLoading(false);
        
        setClient(clientData);

        // setAddress(clientData.address);
        setCep(ifExistsPrint(clientData.address.zipcode, ''));
        setState(ifExistsPrint(clientData.address.state, ''));
        setCity(ifExistsPrint(clientData.address.city, ''));
        setDistrict(ifExistsPrint(clientData.address.district, ''));
        setStreet(ifExistsPrint(clientData.address.street, ''));
        return;
    }

    const onSubmit = () => {
        console.log("oi");
    }

    useEffect(() => {

        if(!!cep && cep.length < 9 && city.length > 0) {
            setCity('');
            setDistrict('');
            setStreet('');
            setState('');
        }

        if(!!cep && cep.indexOf('-') !== -1) {
            if(cep.length === 9) {
                loadAddressByCep(cep)
            }
            return;
        }

        if(!!cep && cep.length === 8) {
            loadAddressByCep(cep)
        }
    }, [cep]);

    useEffect(() => {
        if(watchFields.includes('')) {
            setButtonClass('pink-opacity');
        } else {
            setButtonClass('pink');
        }
    }, [watchFields]);

    useEffect(() => {
        const awaitGetClientData = async () => {
            await getClientData()
        }

        awaitGetClientData();
    }, [])

    return(
        <div className="modal modal-edit-client">
            {!!client.name &&
                <form 
                    className="form" 
                    id="form-edit-client" 
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="modal-close" onClick={props.onClick}>X</div>
                    <InputRound
                        id="name"
                        label="Nome" 
                        type="text"
                        register={register}
                        required={true}
                        error={!!errors.name}
                        defaultValue={client.name}
                    />
                    <InputRound
                        id="email"
                        label="E-mail" 
                        type="email"
                        register={register}
                        required={true}
                        error={!!errors.email}
                        defaultValue={client.email}
                    />

                    <div className="double-input">
                        <InputRound
                            id="cpf"
                            label="CPF" 
                            classType="half" 
                            type="text"
                            mask="999.999.999-99"
                            register={register}
                            required={true}
                            error={!!errors.cpf}
                            defaultValue={client.cpf}
                        />
                        <InputRound
                            id="phone"
                            label="Telefone"
                            mask="(99) 999999999"
                            classType="half"
                            type="text"
                            register={register}
                            required={true}
                            error={!!errors.phone}
                            defaultValue={client.phone}

                        />
                    </div>

                    <div className="double-input">
                        <InputRound
                            id="zipcode"
                            label="CEP" 
                            classType="half" 
                            type="text"
                            value={cep}
                            onChange={(e) => setCep(e.target.value)}
                            maxLength={9}
                        />
                        <InputRound
                            id="street"
                            label="Logradouro" 
                            classType="half" 
                            type="text" 
                            value={street}
                            onChange={(e) => setStreet(e.target.value)}
                        />
                    </div>

                    <div className="double-input">
                        <InputRound
                            id="district"
                            label="Bairro" 
                            classType="half" 
                            type="text"
                            value={district}
                            onChange={(e) => setDistrict(e.target.value)}
                        />
                        <InputRound 
                            id="city"
                            label="Cidade" 
                            classType="half" 
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </div>

                    <div className="double-input">
                        <InputRound
                            id="state"
                            label="Estado" 
                            classType="half" 
                            type="text"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            // onChange={(e) => setAddress((prev) => { return {...prev, state: e.target.value}})}
                        />
                        <InputRound 
                            id="landmark"
                            label="Ponto de Referência" 
                            classType="half" 
                            type="text"
                            register={register}
                            defaultValue={client.address.landmark}
                        />
                    </div>

                    <InputRound
                        id="additional"
                        label="Complemento" 
                        type="text"
                        register={register}
                        defaultValue={client.address.additional}
                    />

                    <div className="flex-row column-gap-20">
                        <button className="btn btn-border-pink" type="reset" onClick={clearFields}>
                            Cancelar
                        </button>
                        <button className={`btn btn-${buttonClass}`} type="submit">
                            Editar Cliente
                        </button>
                    </div>
                </form>
            }
        </div>
    );
}

export default ModalEditClient;
