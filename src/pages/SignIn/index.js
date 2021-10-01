import './styles.css';
import '../../styles/form.css';

import { useState, useEffect, useContext } from 'react';
import { useStyles } from '../../styles/form-material-ui';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../contexts/AuthContext';
import logo from '../../assets/logo.svg';
import { TextField, Snackbar } from '@material-ui/core/';
import { Alert } from '@material-ui/lab';
import InputPassword from '../../components/InputPassword';

function SignIn() {
    const styles = useStyles();
    const { register, watch, handleSubmit, formState: { errors } } = useForm();
    const [buttonClass, setButtonClass] = useState('pink-opacity');
    const [alert, setAlert] = useState({});
    const { login } = useContext(AuthContext);
    const watchAllFields = watch();
    const history = useHistory();

    const clearAlert = () => setAlert({});

    const onSubmit = async data => {
        const response = await fetch('https://api-payment-manager.herokuapp.com/login', {
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

        if(response.ok) {
            login(result);
            return history.push('/home');
        }

        setAlert({
            type: 'error',
            message: result
        });
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
                />
                <button 
                    className={`btn btn-${buttonClass}`} 
                    type='submit'
                >
                    Entrar
                </button>
            </form>

            <p>
                Não tem uma conta? <Link to='/sign-up'>Cadastre-se</Link>
            </p>

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
    )
}

export default SignIn;