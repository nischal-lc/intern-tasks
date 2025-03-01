import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Earthquake from "./components/Earthquake";

const App = () => {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/earthquakes/:id' element={<Earthquake />} />{" "}
			</Routes>
		</Router>
	);
};

export default App;
