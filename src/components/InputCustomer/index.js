import './styles.css';

function InputCustomer({type, label}) {
    return(
        <div 
            className={`customer-input ${!!type && type}`}
        >
            <label>{label}</label>
            <input />
        </div>
    );
}

export default InputCustomer;