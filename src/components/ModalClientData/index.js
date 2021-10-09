import './styles.css';
import CardCharge from '../CardCharge';

function ModalClientData() {
    return(
        <div className="modal">
            <div>
                <h2>Adriano Silva</h2>
                <p>000.000.000-00</p>
                <div className="flex-row">
                    <div>
                        <div>
                            <p>CEP</p>
                            <p>00-000.000</p>
                        </div>

                        <div>
                            <p>Bairro</p>
                            <p>Rio Vermelho</p>
                        </div>

                        <div>
                            <p>Cidade</p>
                            <p>Salvador</p>
                        </div>

                        <div>
                            <p>Logradouro</p>
                            <p>Rua da Paciência</p>
                        </div>

                        <div>
                            <p>Complemento</p>
                            <p>número 000, apto 000</p>
                        </div>

                        <div>
                            <p>Ponto de Referência</p>
                            <p>Próximo a Dinha</p>
                        </div>
                    </div>
                    <div className="card-column-charges">
                        <CardCharge />
                        <CardCharge />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalClientData; 