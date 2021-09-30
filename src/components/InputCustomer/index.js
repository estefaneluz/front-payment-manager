import './styles.css'

function InputCustomer(props) {
  const handleSetState = (e) => {
    if (!!props.setState) {
      props.setState(e.target.value)
    }
  }

  const inputAttributes = {
    value: props.value,
    onChange: (e) => handleSetState(e),
    ...!!props.register && props.register(props.id, { required: !!props.required }) 
  }

  return (
    <div className={`customer-input ${!!props.classType && props.classType}`}>
      <label>{props.label}</label>
      <input {...inputAttributes} type={props.type} />
    </div>
  )
}

export default InputCustomer
