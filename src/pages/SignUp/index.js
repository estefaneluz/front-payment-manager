import './styles.css';
import '../../styles/form.css';
import { useStyles } from '../../styles/form-material-ui';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import TextField from '@material-ui/core/TextField';
import InputPassword from '../../components/InputPassword';
import { useForm } from 'react-hook-form';

function SignUp() {
    const styles = useStyles();
    const { register, handleSubmit } = useForm();

    const onSubmit = async data => {
        await fetch('http://localhost:8000/cadastrar', {
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

    return(
        <div className="container-form">
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <img src={logo} alt="Logo da Cubos Academy" />
                <TextField 
                    id="name" 
                    label="Nome" 
                    className={styles.input}
                    {...register('name')}
                />
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
                <button className="btn btn-pink-opacity">Criar Conta</button>
            </form>

            <p>
                Já possui uma conta? <Link to='/'>Acesse agora!</Link>
            </p>
        </div>
    )
}

export default SignUp;