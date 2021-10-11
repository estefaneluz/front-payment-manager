import './styles.css';
import { useState, useEffect, useContext } from 'react';
import InputRound from "../InputRound";
import { useForm } from 'react-hook-form';

import getAddressByCep from '../../services/viaCEP';
import { GlobalStatesContext } from '../../contexts/GlobalStatesContext';
import onlyNumbers from "../../functions/onlyNumbers";

function ModalEditClient(props) {
    const [cep, setCep] = useState('');
    const [address, setAddress] = useState({});

    const [buttonClass, setButtonClass] = useState('pink-opacity');
    const [client, setClient] = useState({});

    const { register, watch, handleSubmit, formState: { errors } } = useForm();
    const watchFields = watch(['name', 'email', 'cpf', 'phone']);
    const { token, setLoading, setAlert } = useContext(GlobalStatesContext);

    const clearFields = () => {
        const { zipcode, ...clientAddress } = client.address;
        zipcode ? setCep(zipcode) : setCep('');
        setAddress(clientAddress);
    }

    const loadAddressByCep = async (cep) => {
        const address = await getAddressByCep(cep);
        
        if(!address) {
            setAlert({
                type:"error",
                message: "Endereço não encontrado"
            });
            setAddress({});
            return;
        }

        setAddress({
            state: address.uf,
            city: address.localidade,
            district: address.bairro,
            street: address.logradouro
        });
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

        const { zipcode, ...clientAddress } = clientData.address;
        zipcode && setCep(zipcode);
        setAddress(clientAddress);

        return;
    }

    const onSubmit = async (data) => {
        data.phone = onlyNumbers(data.phone);
        data.cpf = onlyNumbers(data.cpf);
        const cepNumber = onlyNumbers(cep);

        if(data.cpf.length > 0 && data.cpf.length < 11) {
            return setAlert({
                type: 'error',
                message: 'Insira um CPF válido.'
            });
        }

        if(data.phone.length > 0 && data.phone.length < 10) {
            return setAlert({
                type: 'error',
                message: 'Insira um Telefone válido.'
            });
        }

        setLoading(true);

        try {
            const response = await fetch(
            `https://api-payment-manager.herokuapp.com/clientes/${props.id}`,
            {
                method: "PUT",
                mode: "cors",
                headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    ...data,
                    ...address, 
                    zipcode: cepNumber
                }),
            }
            );

            setLoading(false);

            if (response.ok) {
                setAlert({
                    type: "success",
                    message: "Cliente atualizado com sucesso!",
                });

                setTimeout(() => props.onClick(), 2000);
                return;
            }

            const message = await response.json();

            setAlert({
                type: "error",
                message,
            });

        } catch (error) {
            setLoading(false);

            return setAlert({
                type: "error",
                message: error.message
            });
        }
    }

    useEffect(() => {
        if(cep.length < 9 && !!address.city) {
            if(address.city.length > 0) setAddress({});
        }

        if(cep.indexOf('-') !== -1) {
            if(cep.length === 9) {
                loadAddressByCep(cep)
            }
            return;
        }

        if(cep.length === 8) {
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
                            value={address.street}
                            onChange={(e) => setAddress((prev) => { 
                                return {...prev, street: e.target.value}}
                            )}                        
                        />
                    </div>

                    <div className="double-input">
                        <InputRound
                            id="district"
                            label="Bairro" 
                            classType="half" 
                            type="text"
                            value={address.district}
                            onChange={(e) => setAddress((prev) => { 
                                return {...prev, district: e.target.value}}
                            )}                        
                        />
                        <InputRound 
                            id="city"
                            label="Cidade" 
                            classType="half" 
                            type="text"
                            value={address.city}
                            onChange={(e) => setAddress((prev) => { 
                                return {...prev, city: e.target.value}}
                            )}
                        />
                    </div>

                    <div className="double-input">
                        <InputRound
                            id="state"
                            label="Estado" 
                            classType="half" 
                            type="text"
                            value={address.state}
                            onChange={(e) => setAddress((prev) => { 
                                return {...prev, state: e.target.value}}
                            )}
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
