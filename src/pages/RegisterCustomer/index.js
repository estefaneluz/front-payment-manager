import './styles.css';
import { useState, useEffect } from 'react';
import InputCustomer from '../../components/InputCustomer';
import { getCityByCep } from '../../services/viaCEP';

function RegisterCostumer() {
    const [cep, setCep] = useState('');
    const [city, setCity] = useState('');

    useEffect(() => {
        getCityByCep('');
    }, []);

    return (
        <div className="container-register-costumer">
            <h1>Adicionar Cliente</h1>
            <form className="form">
                <InputCustomer label="Nome" type="text" />
                <InputCustomer label="E-mail" type="email" />

                <div className="double-input">
                    <InputCustomer 
                        label="CPF" 
                        classType="half" 
                        type="text" 
                    />
                    <InputCustomer 
                        label="Telefone" 
                        classType="half"
                        type="text" 
                    />
                </div>

                <div className="double-input">
                    <InputCustomer 
                        label="CEP" 
                        classType="half" 
                        type="text"
                        value={cep}
                        setState={setCep}
                    />
                    <InputCustomer 
                        label="Logradouro" 
                        classType="half" 
                        type="text" 
                    />
                </div>

                <div className="double-input">
                    <InputCustomer 
                        label="Bairro" 
                        classType="half" 
                        type="text" 
                    />
                    <InputCustomer 
                        label="Cidade" 
                        classType="half" 
                        type="text"
                        value={city}
                        setState={setCity}
                    />
                </div>

                <div className="double-input">
                    <InputCustomer 
                        label="Complemento" 
                        classType="half" 
                        type="text" 
                    />
                    <InputCustomer 
                        label="Ponto de Referência" 
                        classType="half" 
                        type="text" 
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