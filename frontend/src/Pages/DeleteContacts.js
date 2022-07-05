import React from "react";
import { Link , useNavigate} from "react-router-dom";
import { XCircleIcon } from "@heroicons/react/solid";
import Contact from "../Components/Contact";
import { toast } from "react-toastify";
import { useState,useEffect } from "react";
import { delContact } from "../helpers/contacts/contacts.js";
import { contactList } from "../helpers/contacts/contacts.js";
export default function DeleteContacts() {
	const navigate=useNavigate();
	const delCont=(e)=>{
		e.preventDefault();
		delContact(
			{phone:"7290941111"}
		).then((data)=>{
			if (data?.stat === "success") {
						toast.success(data?.message);
						navigate("/");
			} else if (data?.stat === "error") {
						return toast.error(data?.message);
			}
		})
		.catch((e) => {
					console.log(e);
				})
	}
	const [Contacts, setContacts] = useState([]);
	useEffect(() => {
		contactList()
			.then((data) => {
				setContacts(data);
			})
	},[]);
	const disp = () => {
		let arr = [];
		Contacts.map((contact,index)=>{
			console.log(contact,"abc");
			arr.push(<Contact key={index} contact={contact} needMB={true} needCheckBox={true} />);
		})
		//let arr = [];
		// for (let i = 0; i < 12; i++) {
		// 	arr.push(<Contact key={i} needMB={true} needCheckBox={true} contact={Contacts} />);
		// }
		 return arr;
	};
	 
	return ( 
		<>
			<section className="flex justify-center items-center h-screen">
				<div className="rounded-lg p-7 flex flex-col myshadow" style={{ height: "500px", width: "400px" }}>
					<Link className="fixed crossbutton" to="/">
						<XCircleIcon className="h-8 w-8" />
					</Link>
					
					<input
						className="rounded-lg self-center myshadow h-9 w-full mt-1 mb-5 px-3 focus:outline-none text-xs font-light py-3"
						type="search"
						id="search"
						placeholder="Search for a contact"
					></input>
					<div className="flex flex-col justify-start overflow-y-scroll w-full">{disp()}</div>
					<button className="rounded-full flex items-center justify-center h-8 w-60 bg-yellow-400 mx-auto mt-6 text-xs font-medium py-4" onClick={delCont}>DELETE</button>
				</div>
			</section>
		</>
	);
}
