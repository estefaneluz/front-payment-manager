import './styles.css';
import { useState, useEffect } from 'react';
import InputCustomer from '../../components/InputCustomer';
import { getAddressByCep } from '../../services/viaCEP';

function RegisterCostumer() {
    const [cep, setCep] = useState('');
    const [city, setCity] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [street, setStreet] = useState('');

    const loadAddressByCep = async (cep) => {
        const { localidade, bairro, logradouro} = await getAddressByCep(cep);
        setCity(localidade);
        setNeighborhood(bairro);
        setStreet(logradouro);
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
                        value={street}
                        setState={setStreet}  
                    />
                </div>

                <div className="double-input">
                    <InputCustomer 
                        label="Bairro" 
                        classType="half" 
                        type="text"
                        value={neighborhood}
                        setState={setNeighborhood}  
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