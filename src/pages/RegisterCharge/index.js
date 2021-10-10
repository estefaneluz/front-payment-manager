import './styles.css';
import { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { GlobalStatesContext } from '../../contexts/GlobalStatesContext';

import InputRound from '../../components/InputRound';
import '../../components/InputRound/styles.css';

function RegisterCharge() {
    const [clients, setClients] = useState([]);
    const { token, setLoading, setAlert } = useContext(GlobalStatesContext);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = async (data) => {
        setLoading(true);

        data.amount = data.amount * 100;
        data.status = (data.status == true)
        console.log(data);
        try {
            const response = await fetch(
                'https://api-payment-manager.herokuapp.com/charges', {
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

    return (
        <div className="container">
            <h1>Criar Cobrança</h1>
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <div className="round-input">
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

                <div className="round-input" id="charge-description">
                    <label>Descrição</label>
                    <textarea rows="3" {...register('description', { required: true })}/>
                    <span>A descrição informada será impressa no boleto.</span>
                </div>

                <div className="round-input">
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
                    />
                    <InputRound
                        id="due_date"
                        label="Vencimento" 
                        classType="half --date" 
                        type="date"
                        register={register}
                        required={true}
                    /> 
                </div>

                <div className="flex-row column-gap-20">
                    <button className="btn btn-border-pink" type="reset">
                        Cancelar
                    </button>
                    <button className={`btn btn-pink-opacity`} type="submit">
                        Adicionar Cliente
                    </button>
                </div>           
            </form>
        </div>
    )
}

export default RegisterCharge;