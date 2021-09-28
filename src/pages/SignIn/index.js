import './styles.css';
import '../../styles/form.css';
import { useStyles } from '../../styles/form-material-ui';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import TextField from '@material-ui/core/TextField';
import InputPassword from '../../components/InputPassword';
import { useForm } from 'react-hook-form';

function SignIn() {
    const styles = useStyles();
    const { register, handleSubmit } = useForm();

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
    }

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
                <button className="btn btn-pink-opacity" type='submit'>Entrar</button>
            </form>

            <p>
                Não tem uma conta? <Link to='/sign-up'>Cadastre-se</Link>
            </p>
        </div>
    )
}

export default SignIn;