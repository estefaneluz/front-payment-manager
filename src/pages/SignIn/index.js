import './styles.css';
import '../../styles/form.css';
import { useStyles } from '../../styles/material-ui-form';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import TextField from '@material-ui/core/TextField';
import InputPassword from '../../components/InputPassword';

function SignIn() {
    const styles = useStyles();

    return (
        <div className="container-form">
            <form className="form">
                <img src={logo} alt="Logo da Cubos Academy" />
                <TextField 
                    id="standard-basic" 
                    label="E-mail" 
                    placeholder="exemplo@gmail.com"
                    className={styles.textField}
                />
                <InputPassword id="password" label="Senha" />
                <button className="btn btn-pink-opacity">Entrar</button>
            </form>

            <p>
                Não tem uma conta? <Link to='/sign-up'>Cadastre-se</Link>
            </p>
        </div>
    )
}

export default SignIn;