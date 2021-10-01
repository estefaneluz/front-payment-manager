import './styles.css';

import { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';

import InputCustomer from '../../components/InputCustomer';
import { getAddressByCep } from '../../services/viaCEP';
import { AuthContext } from '../../contexts/AuthContext';
import { Snackbar } from '@material-ui/core/';
import { Alert } from '@material-ui/lab';

function RegisterCostumer() {
    const [cep, setCep] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [street, setStreet] = useState('');

    const [buttonClass, setButtonClass] = useState('pink-opacity');
    const [alert, setAlert] = useState({});

    const { register, watch, handleSubmit, formState: { errors }, reset } = useForm();
    const watchFields = watch(['name', 'email', 'cpf', 'phone']);
    const { token, setLoading } = useContext(AuthContext);


    const clearAlert = () => setAlert({});

    const loadAddressByCep = async (cep) => {
        const { localidade, bairro, logradouro} = await getAddressByCep(cep);
        setCity(localidade);
        setDistrict(bairro);
        setStreet(logradouro);
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
                    zipcode: 
                    cep
                })
            });

            setLoading(false);

            if(response.ok) {
                setAlert({
                    type: 'success',
                    message: "Usuário cadastrado com sucesso!"
                });

                reset();
                setCep('');
                setCity('');
                setDistrict('');
                setStreet('');

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
                    <button className={`btn btn-${buttonClass}`} type="submit">
                        Adicionar Cliente
                    </button>
                </div>
            </form>

            {!!alert.message && 
                <Snackbar 
                    open={!!alert.message} 
                    autoHideDuration={4000} 
                    onClose={clearAlert}>
                    <Alert onClose={clearAlert} severity={alert.type}>
                        {alert.message}
                    </Alert>
                </Snackbar>
            }
        </div>
    );
}

export default RegisterCostumer;