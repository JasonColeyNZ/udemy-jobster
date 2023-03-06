import { FunctionComponent } from "react";
import { MonthApplications } from "../types/allJobs";
import {
	ResponsiveContainer,
	AreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
} from "recharts";

type ChartParams = {
	data: MonthApplications[];
};

const AreaChartComponent: FunctionComponent<ChartParams> = ({ data }) => {
	return (
		<ResponsiveContainer width="100%" height={300}>
			<AreaChart data={data} margin={{ top: 50 }}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="date" />
				<YAxis allowDecimals={false} />
				<Tooltip />
				<Area type="monotone" dataKey="count" stroke="#1e3a8a" fill="#3b82f6" />
			</AreaChart>
		</ResponsiveContainer>
	);
};
export default AreaChartComponent;
