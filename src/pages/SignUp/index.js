import './styles.css';
import '../../styles/form.css';

import { useState, useEffect } from 'react';
import { useStyles } from '../../styles/form-material-ui';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import logo from '../../assets/logo.svg';
import { TextField, Snackbar } from '@material-ui/core/';
import { Alert } from '@material-ui/lab';
import InputPassword from '../../components/InputPassword';

function SignUp() {
    const styles = useStyles();
    const { register, watch, handleSubmit, formState: { errors } } = useForm();
    const [buttonClass, setButtonClass] = useState('-pink-opacity');
    const [alert, setAlert] = useState({});
    const watchAllFields = watch();
    const history = useHistory();

    const clearAlert = () => setAlert({});

    const onSubmit = async data => {
        clearAlert();

        const response = await fetch('http://localhost:8000/cadastrar', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if(response.ok) {
            setAlert({
                type: 'success',
                message: "Usuário cadastrado com sucesso!"
            });
            setTimeout(()=>history.push('/'), 4000);
            return;
        }

        const message = await response.json();
        setAlert({
            type: 'error',
            message
        });
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
                    error={!!errors.email || !!alert.message}
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

export default SignUp;