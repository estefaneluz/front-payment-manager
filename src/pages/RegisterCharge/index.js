import InputRound from '../../components/InputRound';
import '../../components/InputRound/styles.css';

function RegisterCharge() {
    return (
        <div className="container">
            <h1>Criar Cobrança</h1>
            <form className="form">
                <div className="round-input">
                    <label>Cliente</label>
                    <select>
                        <option value="null" selected>
                            Selecione a cliente
                        </option>
                        <option value="cliente 1">Cliente 1</option>
                    </select>
                </div>

                <div className="round-input">
                    <label>Descrição</label>
                    <textarea placeholder="Referente ao pagamento da compra online." rows="3" />
                </div>

                <div className="round-input">
                    <label>Status</label>
                    <select>
                        <option value="null" selected>
                            Selecione um status
                        </option>
                        <option value="false">Pendente</option>
                        <option value="true">Pago</option>
                    </select>
                </div>

                <div className="double-input">
                    <InputRound
                        id="valor"
                        placeHolder="R$ 0,00"
                        label="Valor" 
                        classType="half" 
                        type="number"
                        step="0.01"
                    />
                    <InputRound
                        id="vencimento"
                        label="Vencimento" 
                        classType="half --date" 
                        type="date"
                    /> 
                </div>

                <div className="flex-row column-gap-20">
                    <button className="btn btn-border-pink" type="reset">
                        Cancelar
                    </button>
                    <button className={`btn btn-pink-opacity`} type="submit">
                        Adicionar Cliente
                    </button>
                </div>           
            </form>
        </div>
    )
}

export default RegisterCharge;