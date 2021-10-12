import './styles.css';
import '../../styles/form.css';

import { useState, useEffect, useContext } from 'react';
import { useStyles } from '../../styles/form-material-ui';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { GlobalStatesContext } from '../../contexts/GlobalStatesContext';

import logo from '../../assets/logo.svg';
import { TextField } from '@material-ui/core/';
import InputPassword from '../../components/InputPassword';

function SignUp() {
    const styles = useStyles();

    const { register, watch, handleSubmit, formState: { errors } } = useForm();
    const [buttonClass, setButtonClass] = useState('pink-opacity');
    const watchAllFields = watch();
    const history = useHistory();

    const { setLoading, setAlert, clearAlert
     } = useContext(GlobalStatesContext);

    const onSubmit = async data => {
        clearAlert();
        setLoading(true);
        try {
            const response = await fetch(
                'https://api-payment-manager.herokuapp.com/cadastrar', {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            setLoading(false);

            if(response.ok) {
                setAlert({
                    type: 'success',
                    message: "Usuário cadastrado com sucesso!"
                });
                setTimeout(()=>history.push('/'), 2000);
                return;
            }

            const message = await response.json();
            setAlert({
                type: 'error',
                message
            });
        } catch (error) {
            setAlert({
                type: 'error',
                message: error.message
            });
            setLoading(false);
        }
    }

    useEffect(() => {
        if(!watchAllFields.name || !watchAllFields.password || !watchAllFields.email) {
            setButtonClass('pink-opacity');
        } else {
            setButtonClass('pink');
        }
    }, [watchAllFields]);

    return(
        <div className="container-form">
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <img src={logo} alt="Logo da Cubos Academy" />
                <TextField 
                    error={!!errors.name}
                    id="name" 
                    label="Nome" 
                    className={styles.input}
                    {...register('name', { required: true })}
                />
                <TextField 
                    error={!!errors.email || alert.type==="error"}
                    id="email" 
                    label="E-mail" 
                    placeholder="exemplo@gmail.com"
                    type="email"
                    className={styles.input}
                    {...register('email', { required: true })}
                />
                <InputPassword
                    error={!!errors.password}
                    id="password"
                    label="Senha"
                    register={register}
                    required={true}
                />
                <button 
                    className={`btn btn-${buttonClass}`} 
                    type='submit'
                >
                    Criar Conta
                </button>
            </form>

            <p>
                Já possui uma conta? <Link to='/'>Acesse agora!</Link>
            </p>
        </div>
    )
}

export default SignUp;