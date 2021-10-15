import './styles.css';
import { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { GlobalStatesContext } from '../../contexts/GlobalStatesContext';
import dayjs from 'dayjs';

import InputRound from '../../components/InputRound';
import '../../components/InputRound/styles.css';
import DeleteItem from '../DeleteItem';
import timestampToDate from '../../functions/timestampToDate';

function ModalEditCharge({charge, closeModal}) {
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

    const deleteCharge = async () => {
        setLoading(true);
           
        try {
            const response = await fetch(
                `https://api-payment-manager.herokuapp.com/cobrancas/${charge.id}`, {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            setLoading(false);

            if(response.ok) return closeModal();
        } catch(error) {

            setLoading(false);

            return setAlert({
                type: 'error',
                message: error.message
            });

        }
    }

    useEffect(() => {
        const awaitGetClients = async () => {
            await getClients();
        }

        awaitGetClients();
    }, []);

    return(
        <div className="modal">
            <form className="form form-edit-charge" onSubmit={handleSubmit(onSubmit)}>
                <div className="modal-close" onClick={closeModal}>X</div>
                <div className={`round-input ${!!errors.client_id ? 'error' : ''}`}>
                    <label>Cliente</label>
                    <select {...register('client_id', { required: true })}>
                        {!!clients[0]?.id && clients.map((client) => {
                            if(client.name === charge.name) {
                                return <option value={client.id} selected>{client.name}</option>
                            }
                            return <option value={client.id}>{client.name}</option>
                        })}
                    </select>
                </div>

                <div className={`round-input ${!!errors.description ? 'error' : ''}`} id="charge-description">
                    <label>Descrição</label>
                    <textarea 
                        rows="3" 
                        defaultValue={charge.description} 
                        {...register('description', { required: true })}
                    />
                    <span>A descrição informada será impressa no boleto.</span>
                </div>

                <div className={`round-input ${!!errors.status ? 'error' : ''}`}>
                    <label>Status</label>
                    <select {...register('status', { required: true })}>
                        <option value={charge.status} selected>
                            {charge.status ? 'Pago' : 'Pendente'}
                        </option>
                        <option value={!charge.status}>
                            {charge.status ? 'Pendente' : 'Pago'}
                        </option>
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
                        defaultValue={charge.amount/100}
                    />
                    <InputRound
                        id="due_date"
                        label="Vencimento" 
                        classType="half --date" 
                        type="date"
                        register={register}
                        required={true}
                        error={!!errors.due_date}
                        defaultValue={timestampToDate(charge.due_date, 'YYYY-MM-DD')}
                    /> 
                </div>
                <DeleteItem functionDelete={deleteCharge} />

                <div className="flex-row column-gap-20">
                    <button className="btn btn-border-pink" type="reset" onClick={closeModal}>
                        Cancelar
                    </button>
                    <button className={`btn btn-${buttonClass}`} type="submit">
                        Editar Cobrança
                    </button>
                </div>           
            </form>
        </div>
    )
}

export default ModalEditCharge;