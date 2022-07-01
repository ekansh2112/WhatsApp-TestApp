import React, { useState } from "react";
import BusinessOwner from "../Assets/image.png";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { signin } from "../helpers/auth/authentication.js";
export default function Login() {
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
		if (password !== "") {
			signin({ phoneNumber: "1" + mobileNumber, password: password })
				.then((data) => {
					if (data?.stat === "success") {
						setValues({
							mobileNumber: "",
							password: "",
						});
						toast.success(data?.message);
						navigate("/");
					} else if (data?.stat === "error") {
						return toast.error(data?.message);
					}
				})
				.catch((e) => {
					console.log(e);
				});
		} else {
			return toast.warning("Please enter a password!");
		}
	};
	return (
		<>
			<div className="flex m-16 justify-between px-10 myshadow rounded-lg bg-slate-300" style={{ height: "650px" }}>
				<div className="flex flex-col justify-center ml-16">
					<h2 className="font-semibold text-4xl mb-16">Login</h2>
					<form className="flex flex-col" method="POST">
						<label className="text-md mb-3">Your Mobile Number</label>
						<input
							className="rounded-lg h-8 w-60 mb-6 px-3 focus:outline-none text-sm font-light py-2"
							type="text"
							pattern="[56789][0-9]{9}"
							maxLength="10"
							name="mobilenumber"
							placeholder="Enter Your Mobile Number"
							value={mobileNumber}
							onChange={handleChange("mobileNumber")}
							required
						></input>
						<label className="text-md mb-3">Password</label>
						<input
							className="rounded-lg h-8 w-60 mb-12 px-3 focus:outline-none text-sm font-light py-2"
							type="text"
							pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$"
							name="password"
							placeholder="Enter A Strong Password"
							value={password}
							onChange={handleChange("password")}
							required
						></input>
						<button
							className="rounded-full h-8 w-60 bg-yellow-400 text-sm mb-6"
							type={"submit"}
							onClick={(e) => {
								signinUser(e);
							}}
						>
							LOGIN
						</button>
					</form>
					<div className="mt-4">
						<hr className="border-slate-400 mb-6"></hr>
						<p className="text-sm font-light">
							Haven't registered?&nbsp;
							<Link className="font-medium" to="/register">
								Register
							</Link>
						</p>
					</div>
				</div>
				<div className="flex">
					<img className="rounded-lg mr-16 my-12" src={BusinessOwner} alt="Business Owner Communicating" />
				</div>
			</div>
		</>
	);
}
