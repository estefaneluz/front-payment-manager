import './styles.css';
import '../../styles/form.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

function SignIn() {
    return (
        <div className="container-form">
            <form className="form">
                <img src={logo} alt="Logo da Cubos Academy" />

                <TextField 
                    id="standard-basic" 
                    label="E-mail" 
                    placeholder="exemplo@gmail.com" 
                />

                <button className="btn btn-pink-disabled">Entrar</button>
            </form>

            <p>
                Não tem uma conta? <Link to='/sign-up'>Cadastre-se</Link>
            </p>
        </div>
    )
}

export default SignIn;