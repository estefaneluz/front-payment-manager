import './styles.css';
import '../../styles/form.css';

import { useState, useEffect } from 'react';
import { useStyles } from '../../styles/form-material-ui';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import logo from '../../assets/logo.svg';
import TextField from '@material-ui/core/TextField';
import InputPassword from '../../components/InputPassword';

function SignIn() {
    const styles = useStyles();
    const { register, watch, handleSubmit, formState: { errors } } = useForm();
    const [buttonClass, setButtonClass] = useState('-pink-opacity');
    const watchAllFields = watch();

    const onSubmit = async data => {
        const response = await fetch('http://localhost:8000/login', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        console.log(response);
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

                    id="email" 
                    label="E-mail" 
                    placeholder="exemplo@gmail.com"
                    className={styles.input}
                    {...register('email')}
                />
                <InputPassword
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
        </div>
    )
}

export default SignIn;