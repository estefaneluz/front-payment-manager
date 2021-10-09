import './styles.css'
import InputMask from 'react-input-mask'

function InputRound(props) {
  const inputAttributes = {
    value: props.value,
    onChange: props.onChange,
    type: props.type,
    maxLength: props.maxLength,
    ...!!props.register && props.register(props.id, { required: !!props.required }) 
  }

  return (
    <div className={
        `client-input 
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

export default InputRound
