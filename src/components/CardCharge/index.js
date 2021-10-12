import './styles.css';
import { useState, useEffect } from 'react';
import timestampToDate from '../../functions/timestampToDate';
import { handleStatus } from '../../functions/handleStatus';

function CardCharge({charge}) {
    const [status, setStatus] = useState({text: '', className: ''});

    useEffect(()=>{
        setStatus(
            handleStatus(charge.status, charge.due_date)
        );
    }, []);

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
                <p>{timestampToDate(charge.due_date)}</p>
                <p className={`text-status --${status.className}`}>{status.text}</p>
            </div>
        </div>
    );
}

export default CardCharge;