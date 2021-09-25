import './styles.css'
import { useStyles } from '../../styles/form-material-ui';
import TextField from '@material-ui/core/TextField';
import InputPassword from '../../components/InputPassword';

function ModalEditUser({ open, setOpen }) {
    const styles = useStyles();

    const closeModal = () => {
        setOpen(!open);
    }

    return (
        <>
            { open &&
                <div className="modal">
                    <div className="form" id="form-edit-user">
                        <div 
                            className="modal-close"
                            onClick={() => closeModal()}
                        > 
                            X 
                        </div>
                        <h1>Editar Usuário</h1>
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
                        <InputPassword 
                            id="password" 
                            label="Nova senha" 
                            placeholder="Deixe vazio para não editar." 
                        />
                        <TextField 
                            id="standard-basic" 
                            label="Telefone" 
                            className={styles.input}
                        />
                        <TextField 
                            id="standard-basic" 
                            label="CPF" 
                            className={styles.input}
                        />
                        <button className={`btn btn-pink-opacity`}>
                            Editar conta
                        </button>
                    </div>
                </div>
            }
        </>
    );
}

export default ModalEditUser;