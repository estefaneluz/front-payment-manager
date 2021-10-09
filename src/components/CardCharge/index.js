import './styles.css';

function CardCharge() {
    return(
        <div className="card-charge">
            <div className="flex-row">
                <p className="card-charge-title">
                    <span className="text-bold">
                        #19
                    </span>
                    Pagamento referente à asdasdasdasds
                </p>
                <span className="text-bold">
                    R$ 5.000,00
                </span>
            </div>

            <div className="flex-row">
                <p>12/12/2020</p>
                <p className="text-status --blue">Pago</p>
            </div>
        </div>
    );
}

export default CardCharge;