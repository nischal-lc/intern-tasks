import { useParams } from "react-router-dom";

const Earthquake = () => {
	const { id } = useParams();
	return <h1>{id}</h1>;
};

export default Earthquake;
