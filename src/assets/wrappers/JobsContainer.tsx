import styled from "styled-components";

const Wrapper = styled.section`
	/* reduce from 4em to 2em */
	margin-top: 2rem;
	h2 {
		text-transform: none;
	}
	& > h5 {
		font-weight: 700;
	}
	.jobs {
		display: grid;
		grid-template-columns: 1fr;
		row-gap: 2rem;
	}
	@media (min-width: 992px) {
		.jobs {
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 1rem;
		}
	}
`;
export default Wrapper;
