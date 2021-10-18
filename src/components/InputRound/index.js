import './styles.css'
import InputMask from 'react-input-mask'

function InputRound(props) {

  const inputAttributes = {
    value: props.value,
    defaultValue: props.defaultValue,
    onChange: props.onChange,
    type: props.type,
    maxLength: props.maxLength,
    placeHolder: props.placeHolder,
    step: props.step,
    ...!!props.register && props.register(props.id, { required: !!props.required }) 
  }

  return (
    <div className={
        `round-input 
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
