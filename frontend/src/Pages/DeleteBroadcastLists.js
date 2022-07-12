import React, { useState } from "react";
import List from "../Components/List";
import { Link } from "react-router-dom";
import Base from "../Base";
import { PlusIcon } from "@heroicons/react/solid";
import { toast } from "react-toastify";
import { deleteBroadcastList } from "../data/BroadcastLists";
export default function DeleteBroadcastLists({ ListOfBroadcastLists, crudBroadcastList, setCrudBroadcastList }) {
	const [values, setValues] = useState({
		nameOfTheList: "",
	});
	const { nameOfTheList } = values;
	const handleChange = (name) => (event) => {
		setValues({ ...values, error: false, [name]: event.target.value });
	};
	const removeBroadcastList = (e) => {
		e.preventDefault();
		if (nameOfTheList !== "") {
			deleteBroadcastList({ title: nameOfTheList })
				.then((data) => {
					if (data?.stat === "success") {
						setValues({
							nameOfTheList: "",
						});
						toast.success(data?.message);
						setCrudBroadcastList(!crudBroadcastList);
					} else if (data?.stat === "error") {
						return toast.error(data?.message);
					}
				})
				.catch((e) => {
					console.log(e);
				});
		} else {
			return toast.warning("Please select a contact!");
		}
	};
	return (
		<>
			<Base>
				{ListOfBroadcastLists?.length > 0 ? (
					<>
						<section className="flex justify-center items-center mt-20">
							<div className="rounded-lg p-7 flex flex-col panelShadow bg-white" style={{ height: "500px", width: "400px" }}>
								<div className="flex flex-col justify-start h-full overflow-y-scroll removeScrollbar w-full" value={nameOfTheList} onChange={handleChange("nameOfTheList")}>
									{ListOfBroadcastLists?.map((broadcastlist, index) => {
										return <List key={index} broadcastlist={broadcastlist} needMB={index === ListOfBroadcastLists?.length - 1 ? true : false} needRadio={true} />;
									})}
								</div>
								<button className="rounded-full flex items-center justify-center h-8 w-60 bgOnButton mx-auto mt-6 text-xs font-medium py-4" onClick={removeBroadcastList}>
									DELETE
								</button>
							</div>
						</section>
					</>
				) : (
					<>
						<section className="flex justify-center items-center mt-20">
							<div className="rounded-lg p-7 flex flex-col justify-center panelShadow bg-white" style={{ height: "500px", width: "400px" }}>
								<div className="flex flex-row justify-center w-full h-11 mb-6">
									<Link className="rounded-full flex justify-center items-center h-11 w-11 bgOnButton" to="/newbroadcastlist">
										<PlusIcon className="h-6 w-6 inline" />
									</Link>
								</div>
								<h1 className="text-center font-semibold text-lg capitalize">Add your first broadcast list now!</h1>
							</div>
						</section>
					</>
				)}
			</Base>
		</>
	);
}
