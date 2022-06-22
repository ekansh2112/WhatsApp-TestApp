import Navbar from "./Components/Navbar";
const Base = ({ children }) => {
	return (
		<>
			<Navbar />
			{children}
		</>
	);
};
export default Base;
