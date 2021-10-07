import './styles.css'
import InputMask from 'react-input-mask'

function InputCustomer(props) {
  const inputAttributes = {
    value: props.value,
    onChange: props.onChange,
    type: props.type,
    maxLength: props.maxLength,
    ...!!props.register && props.register(props.id, { required: !!props.required }) 
  }

  return (
    <div className={
        `customer-input 
        ${!!props.classType && props.classType} 
        ${!!props.error ? 'error' : ''}`}>
      <label> {props.label} </label>
      {!!props.mask ?
        <InputMask
          {...inputAttributes}
          mask={props.mask}
        />
      : <input {...inputAttributes}/>
      }
    </div>
  )
}

export default InputCustomer
