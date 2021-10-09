import './styles.css';
import { useState, useEffect, useContext } from 'react';
import InputClient from "../InputClient";
import { useForm } from 'react-hook-form';

import getAddressByCep from '../../services/viaCEP';
import { GlobalStatesContext } from '../../contexts/GlobalStatesContext';

function ModalEditClient(props) {
    const [cep, setCep] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [street, setStreet] = useState('');
    const [state, setState] = useState('');

    const [buttonClass, setButtonClass] = useState('pink-opacity');

    const { register, watch, handleSubmit, formState: { errors }, setValue } = useForm();
    const watchFields = watch(['name', 'email', 'cpf', 'phone']);
    const { setAlert } = useContext(GlobalStatesContext);

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
    }

    const onSubmit = () => {
        console.log("oi");
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

    return(
        <div className="modal modal-edit-client">
            <form 
                className="form" 
                id="form-edit-client" 
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="modal-close" onClick={props.onClick}>X</div>
                <InputClient
                    id="name"
                    label="Nome" 
                    type="text"
                    register={register}
                    required={true}
                    error={!!errors.name}
                />
                <InputClient
                    id="email"
                    label="E-mail" 
                    type="email"
                    register={register}
                    required={true}
                    error={!!errors.email}
                />

                <div className="double-input">
                    <InputClient
                        id="cpf"
                        label="CPF" 
                        classType="half" 
                        type="text"
                        mask="999.999.999-99"
                        register={register}
                        required={true}
                        error={!!errors.cpf}
                    />
                    <InputClient
                        id="phone"
                        label="Telefone"
                        mask="(99) 999999999"
                        classType="half"
                        type="text"
                        register={register}
                        required={true}
                        error={!!errors.phone}
                    />
                </div>

                <div className="double-input">
                    <InputClient
                        id="zipcode"
                        label="CEP" 
                        classType="half" 
                        type="text"
                        value={cep}
                        onChange={(e) => setCep(e.target.value)}
                        maxLength={9}
                    />
                    <InputClient
                        id="street"
                        label="Logradouro" 
                        classType="half" 
                        type="text" 
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                    />
                </div>

                <div className="double-input">
                    <InputClient
                        id="district"
                        label="Bairro" 
                        classType="half" 
                        type="text"
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                    />
                    <InputClient 
                        id="city"
                        label="Cidade" 
                        classType="half" 
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </div>

                <div className="double-input">
                    <InputClient
                        id="state"
                        label="Estado" 
                        classType="half" 
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                    />
                    <InputClient 
                        id="landmark"
                        label="Ponto de Referência" 
                        classType="half" 
                        type="text"
                        register={register}
                    />
                </div>

                <InputClient
                    id="additional"
                    label="Complemento" 
                    type="text"
                    register={register}
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
        </div>
    );
}

export default ModalEditClient;
