import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { CloudUploadIcon } from "@heroicons/react/solid";
import ProfilePic from "../Assets/ProfilePic.png";
import Base from "../Base";
import { profileDataUpdate } from "../data/ProfileData";
export default function BusinessProfile({ setUser, changeInProfile, setChangeInProfile }) {
	// const [imageEdit, setImageEdit] = useState(false);
	const [cookies, setCookie, removeCookie] = useCookies(["user"]);
	const [values, setValues] = useState({
		address: cookies.user.businessProfile.address || "",
		description: cookies.user.businessProfile.description || "",
		vertical: cookies.user.businessProfile.vertical || "",
		email: cookies.user.businessProfile.email || "",
		website: cookies.user.businessProfile.websites[0] || "",
	});
	const navigate = useNavigate();
	const { address, description, vertical, email, website } = values;
	const handleChange = (name) => (event) => {
		setValues({ ...values, error: false, [name]: event.target.value });
	};
	const updateProfile = (e) => {
		e.preventDefault();
		profileDataUpdate({
			address: address,
			description: description,
			vertical: vertical,
			email: email,
			websites: [website],
		})
			.then((data) => {
				if (data?.stat === "success") {
					setUser({
						wabaID: cookies.user.wabaID,
						phoneNumberID: cookies.user.phoneNumberID,
						businessProfile: {
							address: address,
							description: description,
							vertical: vertical,
							email: email,
							websites: [website],
							messaging_product: cookies.user.businessProfile.messaging_product,
						},
					});
					setChangeInProfile(!changeInProfile);
					toast.success(data?.message);
					navigate("/profile");
				} else if (data?.stat === "error") {
					return toast.error(data?.message);
				}
			})
			.catch((e) => {
				console.log(e);
			});
	};
	return (
		<>
			<Base>
				<section className="flex justify-center items-center mt-16">
					<div className="rounded-lg px-9 py-7 flex flex-col justify-center panelShadow bg-white" style={{ height: "575px", width: "450px" }}>
						<div className="flex flex-row justify-between items-center mb-6">
							<div className="flex flex-col">
								<label className="text-sm font-normal mb-1">Name</label>
								<input className="h-8 mb-4 text-sm font-medium py-3" type="text" id="businessname" defaultValue="The Garage Shop" readOnly />
								<label className="text-sm font-normal mb-1">Mobile Number</label>
								<input className="h-8 text-sm font-medium py-3" type="text" id="mobilenumber" defaultValue="+919871234580" readOnly />
							</div>
							{/* <div className="flex justify-center">
								<label htmlFor="photo-upload" className="cursor-pointer rounded-full">
									<div className="img-wrap img-upload">
										<CloudUploadIcon className="uploadbutton" />
										<img className="w-auto h-full" for="photo-upload" src={ProfilePic} alt="Profile_Pic" />
									</div>
									<input style={{ display: "none" }} id="photo-upload" type="file" />
								</label>
							</div> */}
							{/* {imageEdit && (
								<div>
									<button className="rounded-lg h-8 w-12 bgOnButton text-xs font-medium">SAVE</button>
								</div>
							)} */}
						</div>
						<label className="text-sm font-normal mb-2" htmlFor="description">
							Description
						</label>
						<input
							className="rounded-lg inputShadow h-9 w-full mb-4 px-3 text-xs font-medium py-3"
							type="text"
							name="description"
							placeholder="Add description"
							value={description}
							onChange={handleChange("description")}
						/>
						<label className="text-sm font-normal mb-2" htmlFor="address">
							Address
						</label>
						<input
							className="rounded-lg inputShadow h-9 w-full mb-4 px-3 text-xs font-medium py-3"
							type="text"
							name="address"
							placeholder="Add your address"
							value={address}
							onChange={handleChange("address")}
						/>
						<label className="text-sm font-normal mb-2" htmlFor="email">
							Email
						</label>
						<input
							className="rounded-lg inputShadow h-9 w-full mb-4 px-3 text-xs font-medium py-3"
							type="email"
							name="email"
							placeholder="Add your email"
							value={email}
							onChange={handleChange("email")}
						/>
						<div className="flex flex-row justify-between">
							<div className="flex flex-col">
								<label className="text-sm font-normal mb-2" htmlFor="vertical">
									Vertical
								</label>
								<select className="rounded-lg myselect inputShadow h-9 w-44 mb-4 px-3 text-xs font-medium" name="vertical" value={vertical} onChange={handleChange("vertical")}>
									<option value="AUTO">AUTO</option>
									<option value="BEAUTY">BEAUTY</option>
									<option value="APPAREL">APPAREL</option>
									<option value="EDU">EDUCATION</option>
									<option value="ENTERTAIN">ENTERTAINMENT</option>
									<option value="EVENT_PLAN">EVENT PLANNING</option>
									<option value="FINANCE">FINANCE</option>
									<option value="GROCERY">GROCERY</option>
									<option value="GOVT">GOVERNMENT</option>
									<option value="HOTEL">HOTEL</option>
									<option value="HEALTH">HEALTH</option>
									<option value="NONPROFIT">NONPROFIT</option>
									<option value="PROF_SERVICES">PROFESSIONAL SERVICES</option>
									<option value="RETAIL">RETAIL</option>
									<option value="TRAVEL">TRAVEL</option>
									<option value="RESTAURANT">RESTAURANT</option>
									<option value="NOT_A_BIZ">NOT A BUSINESS</option>
									<option value="OTHER">OTHER</option>
								</select>
							</div>
							<div className="flex flex-col">
								<label className="text-sm font-normal mb-2" htmlFor="website">
									Website
								</label>
								<input
									className="rounded-lg inputShadow h-9 w-44 mb-4 px-3 text-xs font-medium py-3"
									type="url"
									name="website"
									placeholder="Add your website"
									value={website}
									onChange={handleChange("website")}
								/>
							</div>
						</div>
						<button
							className="rounded-full h-8 w-60 bgOnButton mx-auto mt-3 text-xs font-medium"
							type={"submit"}
							onClick={(e) => {
								updateProfile(e);
							}}
						>
							UPDATE PROFILE
						</button>
					</div>
				</section>
			</Base>
		</>
	);
}
