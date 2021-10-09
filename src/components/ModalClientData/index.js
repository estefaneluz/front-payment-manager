import './styles.css';
import CardCharge from '../CardCharge';
import emailIcon from '../../assets/email-icon.svg';
import phoneIcon from '../../assets/phone-icon.svg';


function ModalClientData(props) {
    return(
        <div className="modal">
            <div className="card">
                <div className="modal-close" onClick={() => props.setOpen(false)}>X</div>
                <h2>Adriano Silva</h2>
                <p>000.000.000-00</p>
                <div className="card-row">
                    <div className="card-client-information --divider">
                        <div className="card-row card-contact --wrap">
                            <div className="flex-row">
                                <img src={emailIcon} alt="icone de e-mail"/>
                                <p>email@email.com</p>
                            </div>
                            <div className="flex-row">
                                <img src={phoneIcon} alt="icone de telefone" />
                                <p>(DDD) 00000-0000</p>
                            </div>
                        </div>
                        <div className="card-row --wrap">
                            <div>
                                <h5>CEP</h5>
                                <p>00-000.000</p>
                            </div>

                            <div>
                                <h5>Bairro</h5>
                                <p>Rio Vermelho</p>
                            </div>

                            <div>
                                <h5>Cidade</h5>
                                <p>Salvador - BA</p>
                            </div>
                        </div>

                        <div>
                            <h5>Logradouro</h5>
                            <p>Rua da Paciência</p>
                        </div>

                        <div className="card-row --wrap">
                            <div>
                                <h5>Complemento</h5>
                                <p>número 000, apto 000</p>
                            </div>

                            <div>
                                <h5>Ponto de Referência</h5>
                                <p>Próximo a Dinha</p>
                            </div>
                        </div>
                    </div>
                    <div className="card-column-charges">
                        <CardCharge />
                        <CardCharge />
                        <CardCharge />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalClientData; 