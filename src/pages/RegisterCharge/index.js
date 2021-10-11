import './styles.css';
import { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { GlobalStatesContext } from '../../contexts/GlobalStatesContext';
import dayjs from 'dayjs';

import InputRound from '../../components/InputRound';
import '../../components/InputRound/styles.css';

function RegisterCharge() {
    const [clients, setClients] = useState([]);
    const [buttonClass, setButtonClass] = useState('pink-opacity');
    const { token, setLoading, setAlert } = useContext(GlobalStatesContext);
    const { register, watch, handleSubmit, formState: { errors }, reset, setError } = useForm();
    const watchAllFields = watch();

    const clearForm = () => reset(); 

    const onSubmit = async (data) => {
        setLoading(true);

        if(data.client_id === 'null') {
            setLoading(false);
            return setError('client_id', { type: "focus" }, { shouldFocus: true });
        }

        if(data.status === 'null') {
            setLoading(false);
            return setError('status', { type: "focus" }, { shouldFocus: true });
        }

        data.amount = data.amount * 100;
        data.status = (data.status == true);
        data.due_date = dayjs(data.due_date).valueOf();
        try {
            const response = await fetch(
                'https://api-payment-manager.herokuapp.com/cobrancas', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });

            setLoading(false);

            if(response.ok) {
                setAlert({
                    type: 'success',
                    message: "Cobrança cadastrada com sucesso!"
                });

                reset();
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

    const getClients = async () => {
        const response = await fetch(
            'https://api-payment-manager.herokuapp.com/nomes-clientes', {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        setClients(await response.json());
    }

    useEffect(() => {
        const awaitGetClients = async () => {
            await getClients();
        }

        awaitGetClients();
    }, []);

    useEffect(()=> {
        const conditional = watchAllFields.client_id === 'null' || watchAllFields.status === 'null' ||!watchAllFields.description || !watchAllFields.amount || !watchAllFields.due_date;

        if(conditional) {
            setButtonClass('pink-opacity');
        } else {
            setButtonClass('pink');
        }
    }, [watchAllFields]);

    return (
        <div className="container">
            <h1>Criar Cobrança</h1>
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <div className={`round-input ${!!errors.client_id ? 'error' : ''}`}>
                    <label>Cliente</label>
                    <select {...register('client_id', { required: true })}>
                        <option value="null" selected>
                            Selecione a cliente
                        </option>
                        {!!clients && clients.map(
                            client => <option value={client.id}>{client.name}</option>
                        )}
                    </select>
                </div>

                <div className={`round-input ${!!errors.description ? 'error' : ''}`} id="charge-description">
                    <label>Descrição</label>
                    <textarea rows="3" {...register('description', { required: true })}/>
                    <span>A descrição informada será impressa no boleto.</span>
                </div>

                <div className={`round-input ${!!errors.status ? 'error' : ''}`}>
                    <label>Status</label>
                    <select {...register('status', { required: true })}>
                        <option value="null" selected>
                            Selecione um status
                        </option>
                        <option value="false">Pendente</option>
                        <option value="true">Pago</option>
                    </select>
                </div>

                <div className="double-input">
                    <InputRound
                        id="amount"
                        placeHolder="R$ 0,00"
                        label="Valor" 
                        classType="half" 
                        type="number"
                        step="0.01"
                        register={register}
                        required={true}
                        error={!!errors.amount}
                    />
                    <InputRound
                        id="due_date"
                        label="Vencimento" 
                        classType="half --date" 
                        type="date"
                        register={register}
                        required={true}
                        error={!!errors.due_date}
                    /> 
                </div>

                <div className="flex-row column-gap-20">
                    <button className="btn btn-border-pink" type="reset" onClick={clearForm}>
                        Cancelar
                    </button>
                    <button className={`btn btn-${buttonClass}`} type="submit">
                        Adicionar Cobrança
                    </button>
                </div>           
            </form>
        </div>
    )
}

export default RegisterCharge;