import React, { useState } from "react";
import BusinessOwner from "../Assets/image.png";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { signin } from "../helpers/auth/authentication";
import { useCookies } from "react-cookie";
export default function Login() {
	const [cookies, setCookie, removeCookie] = useCookies(["user"]);
	const [values, setValues] = useState({
		mobileNumber: "",
		password: "",
	});
	const navigate = useNavigate();
	const { mobileNumber, password } = values;
	const handleChange = (name) => (event) => {
		setValues({ ...values, error: false, [name]: event.target.value });
	};
	const signinUser = (e) => {
		e.preventDefault();
		if (mobileNumber !== "" && password !== "") {
			signin({ phoneNumber: "1" + mobileNumber, password: password })
				.then((data) => {
					if (data?.stat === "success") {
						setValues({
							mobileNumber: "",
							password: "",
						});
						setCookie("user", data?.data?.user);
						toast.success(data?.message);
						navigate("/");
					} else if (data?.stat === "error") {
						return toast.error(data?.message);
					}
				})
				.catch((e) => {
					toast.error("Not able to login! Please try again!");
					console.log(e);
				});
		} else if (mobileNumber === "" && password === "") {
			return toast.warning("Please enter both the fields!");
		} else if (password === "") {
			return toast.warning("Please enter the password!");
		} else if (mobileNumber === "") {
			return toast.warning("Please enter the mobile number!");
		}
	};
	return (
		<>
			<div className="flex m-16 justify-between px-10 rounded-3xl bgOnChatPanel" style={{ height: "725px" }}>
				<div className="flex flex-col justify-center ml-7">
					<h2 className="font-semibold text-4xl mb-14">Login</h2>
					<label className="text-sm font-normal mb-2">Your Mobile Number</label>
					<input
						className="rounded-lg h-8 w-72 mb-6 px-3 text-sm font-light py-2"
						type="text"
						pattern="[56789][0-9]{9}"
						maxLength="10"
						name="mobilenumber"
						placeholder="Enter Your Mobile Number"
						value={mobileNumber}
						onChange={handleChange("mobileNumber")}
					/>
					<label className="text-sm font-normal mb-2">Password</label>
					<input
						className="rounded-lg h-8 w-72 mb-11 px-3 text-sm font-light py-2"
						type="password"
						pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$"
						name="password"
						placeholder="Enter A Strong Password"
						value={password}
						onChange={handleChange("password")}
					/>
					<button
						className="rounded-full h-9 w-72 bgOnButton text-sm font-medium mb-6"
						type={"submit"}
						onClick={(e) => {
							signinUser(e);
						}}
					>
						LOGIN
					</button>
					<div className="mt-4">
						<hr className="lineColor mb-6" />
						<p className="text-sm font-light">
							Haven't registered?&nbsp;
							<Link className="font-medium" to="/register">
								Register
							</Link>
						</p>
					</div>
				</div>
				<div className="flex">
					<img className="rounded-3xl mr-7 my-12" src={BusinessOwner} alt="Business Owner Communicating" />
				</div>
			</div>
		</>
	);
}
