import './styles.css';

function InputCustomer({type, classType, label}) {
    return(
        <div 
            className={`customer-input ${!!classType && classType}`}
        >
            <label>{label}</label>
            <input type={type}/>
        </div>
    );
}

export default InputCustomer;