import './styles.css';

function CardCharge({charge}) {
    return(
        <div className="card-charge">
            <div className="flex-row">
                <p className="card-charge-title">
                    <span className="text-bold">
                        {charge.id}
                    </span>
                    {charge.description}
                </p>
                <span className="text-bold">
                    R$ {charge.amount / 100}
                </span>
            </div>

            <div className="flex-row">
                <p>{charge.due_date}</p>
                <p className="text-status --blue">{charge.status ? 'pago' : 'pendente' }</p>
            </div>
        </div>
    );
}

export default CardCharge;