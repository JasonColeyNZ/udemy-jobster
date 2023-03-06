import Wrapper from "../assets/wrappers/JobInfo";
import { FunctionComponent } from "react";

type FormRowParams = {
	text?: string;
	icon: JSX.Element;
};

const JobInfo: FunctionComponent<FormRowParams> = ({ text, icon }) => {
	return (
		<Wrapper>
			<span className="icon">{icon}</span>
			<span className="text">{text}</span>
		</Wrapper>
	);
};
export default JobInfo;
