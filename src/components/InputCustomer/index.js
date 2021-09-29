import './styles.css';

function InputCustomer(props) {

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
                value={!!props.value && props.value} 
                type={props.type} 
                onChange={(e) => handleSetState(e)}
            />
        </div>
    );
}

export default InputCustomer;