import { FunctionComponent } from "react";

type FormRowParams = {
	name: string;
	value: string;
	handleChange: React.ChangeEventHandler;
	list: string[];
	labelText?: string;
};

const FormRowSelect: FunctionComponent<FormRowParams> = ({
	name,
	value,
	handleChange,
	list,
	labelText,
}) => {
	return (
		<div className="form-row">
			<label htmlFor={name} className="form-label">
				{labelText || name}
			</label>
			<select
				id={name}
				name={name}
				value={value}
				onChange={handleChange}
				className="form-select"
			>
				{list.map((item, index) => {
					return (
						<option key={index} value={item}>
							{item.substring(0, 1).toUpperCase() + item.substring(1)}
						</option>
					);
				})}
			</select>
		</div>
	);
};
export default FormRowSelect;
