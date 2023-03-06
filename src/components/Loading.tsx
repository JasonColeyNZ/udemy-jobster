import { FunctionComponent } from "react";

type LoadingParams = {
	center?: boolean;
};

const Loading: FunctionComponent<LoadingParams> = ({ center }) => {
	return <div className={center ? "loading loading-center" : "loading"}></div>;
};

export default Loading;
