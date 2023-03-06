import { FunctionComponent } from "react";

type FormRowParams = {
    type: string,
    name: string,
    value: string,
    handleChange: React.ChangeEventHandler,
    labelText?: string;
}

const FormRow: FunctionComponent<FormRowParams> = ({ type, name, value, handleChange, labelText }) => {
    return (
      <div className='form-row'>
        <label htmlFor={name} className='form-label'>
          {labelText || name}
        </label>
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
          className='form-input'
        />
      </div>
    );
  };
  export default FormRow;