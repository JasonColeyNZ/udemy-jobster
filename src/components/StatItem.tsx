import { FunctionComponent } from "react";
import Wrapper from "../assets/wrappers/StatItem";
import { HtmlHTMLAttributes } from "react";

type StatItemParams = {
	title: string;
	count: number;
	icon: JSX.Element;
	color: string;
	bcg: string;
};

const StatItem: FunctionComponent<StatItemParams> = ({
	title,
	count,
	icon,
	color,
	bcg,
}) => {
	return (
		<Wrapper color={color} bcg={bcg}>
			<header>
				<span className="count">{count}</span>
				<span className="icon">{icon}</span>
			</header>
			<h5 className="title">{title}</h5>
		</Wrapper>
	);
};
export default StatItem;
