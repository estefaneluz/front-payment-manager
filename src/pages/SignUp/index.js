import './styles.css';
import '../../styles/form.css';
import { useStyles } from '../../styles/form-material-ui';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import TextField from '@material-ui/core/TextField';
import InputPassword from '../../components/InputPassword';

function SignUp() {
    const styles = useStyles();

    return(
        <div className="container-form">
            <form className="form">
                <img src={logo} alt="Logo da Cubos Academy" />
                <TextField 
                    id="standard-basic" 
                    label="Nome" 
                    className={styles.input}
                />
                <TextField 
                    id="standard-basic" 
                    label="E-mail" 
                    placeholder="exemplo@gmail.com"
                    className={styles.input}
                />
                <InputPassword id="password" label="Senha" />
                <button className="btn btn-pink-opacity">Criar Conta</button>
            </form>

            <p>
                Já possui uma conta? <Link to='/sign-in'>Acesse agora!</Link>
            </p>
        </div>
    )
}

export default SignUp;