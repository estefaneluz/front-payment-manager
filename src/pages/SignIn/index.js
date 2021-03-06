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

function SignIn() {
    const styles = useStyles();
    const { register, watch, handleSubmit, formState: { errors } } = useForm();
    const [buttonClass, setButtonClass] = useState('pink-opacity');
    const { login, setLoading, setAlert } = useContext(GlobalStatesContext);
    const watchAllFields = watch();
    const history = useHistory();

    const onSubmit = async data => {
        setLoading(true);

        try {
            const response = await fetch(
                'https://api-payment-manager.herokuapp.com/login', {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            setLoading(false);

            if(response.ok) {
                login(result);
                return history.push('/home');
            }

            setAlert({
                type: 'error',
                message: result
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
        if(!watchAllFields.email || !watchAllFields.password) {
            setButtonClass('pink-opacity');
        } else {
            setButtonClass('pink');
        }
    }, [watchAllFields]);

    return (
        <div className="container-form">
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <img src={logo} alt="Logo da Cubos Academy" />
                <TextField 
                    error={!!errors.email || alert.type==="error"}
                    id="email" 
                    label="E-mail" 
                    placeholder="exemplo@gmail.com"
                    className={styles.input}
                    {...register('email', { required: true })}
                />
                <InputPassword
                    error={!!errors.password || !!alert.message}
                    id="password"
                    label="Senha"
                    register={register}
                    required={true}
                />
                <button 
                    className={`btn btn-${buttonClass}`} 
                    type='submit'
                >
                    Entrar
                </button>
            </form>

            <p>
                N??o tem uma conta? <Link to='/sign-up'>Cadastre-se</Link>
            </p>
        </div>
    )
}

export default SignIn;