import './styles.css';
import InputCustomer from '../../components/InputCustomer'

function RegisterCostumer() {
    return (
        <div className="container-register-costumer">
            <h1>Adicionar Cliente</h1>
            <form className="form">
                <InputCustomer label="Nome" type="large"/>
                <InputCustomer label="E-mail" type="large"/>
                <div className="double-input">
                    <InputCustomer label="CPF" type="half" />
                    <InputCustomer label="Telefone" type="half" />
                </div>
                <div className="double-input">
                    <InputCustomer label="CEP" type="half" />
                    <InputCustomer label="Logradouro" type="half" />
                </div>
                <div className="double-input">
                    <InputCustomer label="Bairro" type="half" />
                    <InputCustomer label="Cidade" type="half" />
                </div>
                <div className="double-input">
                    <InputCustomer label="Complemento" type="half" />
                    <InputCustomer label="Ponto de Referencia" type="half" />
                </div>

                <div className="flex-row column-gap-20">
                    <button className="btn btn-border-pink">Cancelar</button>
                    <button className="btn btn-pink-opacity">Adicionar Cliente</button>
                </div>
            </form>
        </div>
    );
}

export default RegisterCostumer;