import './styles.css';
import InputCustomer from '../../components/InputCustomer'

function RegisterCostumer() {
    return (
        <div className="container-register-costumer">
            <h1>Adicionar Cliente</h1>
            <form className="form">
                <InputCustomer label="Nome"/>
                <InputCustomer label="E-mail"/>
                <div className="double-input">
                    <InputCustomer label="CPF" classType="half" />
                    <InputCustomer label="Telefone" classType="half" />
                </div>
                <div className="double-input">
                    <InputCustomer label="CEP" classType="half" />
                    <InputCustomer label="Logradouro" classType="half" />
                </div>
                <div className="double-input">
                    <InputCustomer label="Bairro" classType="half" />
                    <InputCustomer label="Cidade" classType="half" />
                </div>
                <div className="double-input">
                    <InputCustomer label="Complemento" classType="half" />
                    <InputCustomer label="Ponto de Referência" classType="half" />
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