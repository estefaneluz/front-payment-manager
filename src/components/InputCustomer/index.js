import './styles.css';

function InputCustomer(props) {

    const inputAttributes = {
        value: props.value,
        onChange: (e) => handleSetState(e)
    }

    const handleSetState = (e) => {
        if(!!props.setState) {
            props.setState(e.target.value)
        }
    }

    return(
        <div 
            className={`customer-input ${!!props.classType && props.classType}`}
        >
            <label>{props.label}</label>
            <input 
                {...inputAttributes}
                type={props.type} 
            />
        </div>
    );
}

export default InputCustomer;