interface JobSliceState extends Record<string, any> {
	isLoading: boolean;
	position: string;
	company: string;
	jobLocation: string;
	jobTypeOptions: string[];
	jobType: string;
	statusOptions: string[];
	status: string;
	isEditing: boolean;
	editJobId: string;
}

type HandleChangePayload = {
	name: string;
	value: string;
};

type Job = {
	id?: string;
	position: string;
	company: string;
	jobLocation: string;
	jobType: string;
	status: string;
	createdAt?: Date;
};

export { JobSliceState, HandleChangePayload, Job, ImportedJob };
