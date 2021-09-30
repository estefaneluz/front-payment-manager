import './styles.css';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import InputCustomer from '../../components/InputCustomer';
import { getAddressByCep } from '../../services/viaCEP';

function RegisterCostumer() {
    const [cep, setCep] = useState('');
    const [city, setCity] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [street, setStreet] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm();

    const loadAddressByCep = async (cep) => {
        const { localidade, bairro, logradouro} = await getAddressByCep(cep);
        setCity(localidade);
        setNeighborhood(bairro);
        setStreet(logradouro);
    }

    const onSubmit = async (data) => {
        console.log(data);
    }

    useEffect(() => {
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
                />
                <InputCustomer
                    id="email"
                    label="E-mail" 
                    type="email" 
                    register={register}
                    required={true}
                />

                <div className="double-input">
                    <InputCustomer
                        id="cpf"
                        label="CPF" 
                        classType="half" 
                        type="text"
                        register={register}
                        required={true}
                    />
                    <InputCustomer
                        id="phone"
                        label="Telefone" 
                        classType="half"
                        type="text"
                        register={register}
                        required={true}
                    />
                </div>

                <div className="double-input">
                    <InputCustomer
                        id="zipcode"
                        label="CEP" 
                        classType="half" 
                        type="text"
                        value={cep}
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
                        id="neighborhood"
                        label="Bairro" 
                        classType="half" 
                        type="text"
                        value={neighborhood}
                        setState={setNeighborhood}
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
                        id="additional"
                        label="Complemento" 
                        classType="half" 
                        type="text"
                        register={register}
                    />
                    <InputCustomer 
                        id="landmark"
                        label="Ponto de Referência" 
                        classType="half" 
                        type="text"
                        register={register}
                    />
                </div>

                <div className="flex-row column-gap-20">
                    <button className="btn btn-border-pink">
                        Cancelar
                    </button>
                    <button className="btn btn-pink-opacity">
                        Adicionar Cliente
                    </button>
                </div>
            </form>
        </div>
    );
}

export default RegisterCostumer;