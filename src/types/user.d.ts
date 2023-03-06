interface UserSliceState {
	user: User | null;
	isSidebarOpen: boolean;
	isLoading: boolean;
}

type RegisterUserParams = {
	name: string;
	email: string;
	password: string;
};

type LoginUserParams = {
	email: string;
	password: string;
};

type UpdateUserParams = {
	name: string;
	email: string;
	location: string;
	lastName: string;
};

export {
	UserSliceState,
	RegisterUserParams,
	LoginUserParams,
	UpdateUserParams,
};
