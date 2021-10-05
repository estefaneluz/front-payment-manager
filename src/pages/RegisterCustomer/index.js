import './styles.css';

import { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';

import InputCustomer from '../../components/InputCustomer';
import getAddressByCep from '../../services/viaCEP';
import { GlobalStatesContext } from '../../contexts/GlobalStatesContext';

function RegisterCostumer() {
    const [cep, setCep] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [street, setStreet] = useState('');
    const [state, setState] = useState('');

    const [buttonClass, setButtonClass] = useState('pink-opacity');

    const { register, watch, handleSubmit, formState: { errors }, reset } = useForm();
    const watchFields = watch(['name', 'email', 'cpf', 'phone']);
    const { token, setLoading, setAlert } = useContext(GlobalStatesContext);

    const clearAddress = () => {
        setCep('');
        setCity('');
        setDistrict('');
        setStreet('');
        setState('');
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
    }

    const onSubmit = async (data) => {
        setLoading(true);

        try {
            const response = await fetch(
                'https://api-payment-manager.herokuapp.com/clientes', {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    ...data, 
                    city, 
                    district, 
                    street,
                    state, 
                    zipcode: 
                    cep
                })
            });

            setLoading(false);

            if(response.ok) {
                setAlert({
                    type: 'success',
                    message: "Cliente cadastrado com sucesso!"
                });

                reset();
                clearAddress();

                return;
            }

            const message = await response.json();
            return setAlert({
                type: 'error',
                message
            });
        } catch (error) {
            setLoading(false);

            return setAlert({
                type: 'error',
                message: error.message
            });
        }
    }

    useEffect(() => {

        if(cep.length < 9 && city.length > 0) {
            setCity('');
            setDistrict('');
            setStreet('');
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

    return (
        <div className="container-register-costumer">
            <h1>Adicionar Cliente</h1>
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <InputCustomer 
                    id="name"
                    label="Nome" 
                    type="text" 
                    register={register}
                    required={true}
                    error={!!errors.name}
                />
                <InputCustomer
                    id="email"
                    label="E-mail" 
                    type="email" 
                    register={register}
                    required={true}
                    error={!!errors.email}
                />

                <div className="double-input">
                    <InputCustomer
                        id="cpf"
                        label="CPF" 
                        classType="half" 
                        type="text"
                        register={register}
                        required={true}
                        error={!!errors.cpf}
                    />
                    <InputCustomer
                        id="phone"
                        label="Telefone" 
                        classType="half"
                        type="text"
                        register={register}
                        required={true}
                        error={!!errors.phone}
                    />
                </div>

                <div className="double-input">
                    <InputCustomer
                        id="zipcode"
                        label="CEP" 
                        classType="half" 
                        type="text"
                        value={cep}
                        maxLength={9}
                        setState={setCep}
                    />
                    <InputCustomer
                        id="street"
                        label="Logradouro" 
                        classType="half" 
                        type="text" 
                        value={street}
                        setState={setStreet}
                    />
                </div>

                <div className="double-input">
                    <InputCustomer
                        id="district"
                        label="Bairro" 
                        classType="half" 
                        type="text"
                        value={district}
                        setState={setDistrict}
                    />
                    <InputCustomer 
                        id="city"
                        label="Cidade" 
                        classType="half" 
                        type="text"
                        value={city}
                        setState={setCity}
                    />
                </div>

                <div className="double-input">
                    <InputCustomer
                        id="state"
                        label="Estado" 
                        classType="half" 
                        type="text"
                        register={register}
                        value={state}
                        setState={setState}
                    />
                    <InputCustomer 
                        id="landmark"
                        label="Ponto de Referência" 
                        classType="half" 
                        type="text"
                        register={register}
                    />
                </div>

                <InputCustomer
                    id="additional"
                    label="Complemento" 
                    type="text"
                    register={register}
                />

                <div className="flex-row column-gap-20">
                    <button className="btn btn-border-pink" type="reset" onClick={clearAddress}>
                        Cancelar
                    </button>
                    <button className={`btn btn-${buttonClass}`} type="submit">
                        Adicionar Cliente
                    </button>
                </div>
            </form>
        </div>
    );
}

export default RegisterCostumer;