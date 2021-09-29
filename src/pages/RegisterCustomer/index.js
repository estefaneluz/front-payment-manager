import './styles.css';
import InputCustomer from '../../components/InputCustomer'

function RegisterCostumer() {
    return (
        <div className="container-register-costumer">
            <h1>Adicionar Cliente</h1>
            <form className="form">
                <InputCustomer label="Nome" type="large"/>
                <InputCustomer label="E-mail" type="large"/>
                <div className="flex-row">
                    <InputCustomer label="CPF" type="half" margin-left />
                    <InputCustomer label="Telefone" type="half" />
                </div>

                <div className="flex-row">
                    <div>
                        <label>CEP</label>
                        <input/>
                    </div>
                    <div>
                        <label>Logradouro</label>
                        <input/>
                    </div>
                </div>
                <div className="flex-row">
                    <div>
                        <label>Bairro</label>
                        <input/>
                    </div>
                    <div>
                        <label>Cidade</label>
                        <input/>
                    </div>
                </div>
                <div className="flex-row">
                    <div>
                        <label>Complemento</label>
                        <input/>
                    </div>
                    <div>
                        <label>Ponto de Referência</label>
                        <input/>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default RegisterCostumer;