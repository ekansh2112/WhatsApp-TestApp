import React, { useState } from "react";
import BusinessOwner from "../Assets/image.png";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../helpers/auth/authentication.js";
export default function Register() {
	const [values, setValues] = useState({
		mobileNumber: "",
		wabaId: "",
		perAccToken: "",
		password: "",
	});
	const navigate = useNavigate();
	const { mobileNumber, wabaId, perAccToken, password } = values;
	const handleChange = (name) => (event) => {
		setValues({ ...values, error: false, [name]: event.target.value });
	};
	const signupUser = (e) => {
		e.preventDefault();
		if (mobileNumber !== "" && wabaId !== "" && perAccToken !== "" && password !== "") {
			signup({ phoneNumber: "1" + mobileNumber, wabaID: wabaId, accessToken: perAccToken, password: password })
				.then((data) => {
					if (data?.stat === "success") {
						setValues({
							mobileNumber: "",
							wabaId: "",
							perAccToken: "",
							password: "",
						});
						toast.success(data?.message);
						navigate("/login");
					} else if (data?.stat === "error") {
						return toast.error(data?.message);
					}
				})
				.catch((e) => {
					console.log(e);
				});
		} else if (wabaId === "" && mobileNumber === "" && perAccToken === "" && password === "") {
			return toast.warning("Please enter all the fields!");
		} else if (mobileNumber === "") {
			return toast.warning("Please enter the mobile number!");
		} else if (wabaId === "") {
			return toast.warning("Please enter the WABA ID!");
		} else if (perAccToken === "") {
			return toast.warning("Please enter the Permanent Access Number!");
		} else if (password === "") {
			return toast.warning("Please enter the password!");
		}
	};
	return (
		<>
			<div className="flex m-16 justify-between px-10 rounded-3xl bgOnChatPanel" style={{ height: "725px" }}>
				<div className="flex flex-col justify-center ml-7">
					<h2 className="font-semibold text-4xl mb-3">Register</h2>
					<p className="font-light text-sm mb-6">Before registering here, create an WhatsApp App in you Facebook Developer Account.</p>
					<label className="text-sm font-normal mb-2" htmlFor="mobilenumber">
						Your Mobile Number
					</label>
					<input
						className="rounded-lg h-8 w-72 mb-6 px-3 text-sm font-light py-2"
						type="text"
						pattern="[56789][0-9]{9}"
						maxLength="10"
						name="mobilenumber"
						placeholder="Enter Your Mobile Number"
						value={mobileNumber}
						onChange={handleChange("mobileNumber")}
						required
					/>
					<label className="text-sm font-normal mb-2" htmlFor="mobilenumber">
						WhatsApp Business App ID (WABA ID)
					</label>
					<input
						className="rounded-lg h-8 w-72 mb-6 px-3 text-sm font-light py-2"
						type="text"
						name="wabaid"
						placeholder="Enter Your WABA ID"
						value={wabaId}
						onChange={handleChange("wabaId")}
						required
					/>
					<label className="text-sm font-normal mb-2" htmlFor="patoken">
						Permanent Access Token
					</label>
					<input
						className="rounded-lg h-8 w-72 mb-6 px-3 text-sm font-light py-2"
						type="text"
						name="patoken"
						placeholder="Enter Your Permanent Access Token"
						value={perAccToken}
						onChange={handleChange("perAccToken")}
						required
					/>
					<label className="text-sm font-normal mb-2" htmlFor="password">
						Create Password
					</label>
					<input
						className="rounded-lg h-8 w-72 mb-8 px-3 text-sm font-light py-2"
						type="text"
						pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$"
						name="password"
						placeholder="Enter A Strong Password"
						value={password}
						onChange={handleChange("password")}
						required
					/>
					<button
						className="rounded-full h-9 w-72 bgOnButton text-sm font-medium mb-4"
						type={"submit"}
						onClick={(e) => {
							signupUser(e);
						}}
					>
						REGISTER
					</button>
					<div className="my-4">
						<hr className="lineColor w-72 mb-4" />
						<p className="text-sm font-light">
							Don't know how to create these?&nbsp;
							<Link className="font-medium" to="/login">
								Click Here
							</Link>
						</p>
					</div>
					<div className="">
						<hr className="lineColor w-72 mb-4" />
						<p className="text-sm font-light">
							Already registered?&nbsp;
							<Link className="font-medium" to="/login">
								Login
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
