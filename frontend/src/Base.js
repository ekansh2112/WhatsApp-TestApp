import Navbar from "./Components/Navbar";
import { ToastContainer } from "react-toastify";
const Base = ({ children }) => {
	return (
		<>
			<Navbar />
			{children}
			<ToastContainer position="bottom-center" autoClose={5000} hideProgressBar={false} pauseOnFocusLoss pauseOnHover />
		</>
	);
};
export default Base;
