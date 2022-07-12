export default function Contact({ needMB, needCheckBox, needRadio, contact, setAllCheckedBoxes, setContactDetail, setConNumber, fromContactList }) {
	return (
		<>
			<label
				className={needMB ? "flex cursor-pointer justify-around" : "flex mb-3 cursor-pointer justify-around"}
				onClick={() => {
					if (fromContactList) {
						setConNumber(contact.phoneNumber);
						setContactDetail(true);
					}
				}}
			>
				<img className="w-14 h-14 rounded-full" src={contact.image} alt="image_1" />
				<div className="w-40 text-sm flex flex-col justify-center">
					<p className="text-xs mb-2">{contact.fname + " " + contact.lname}</p>
					<p className="text-xs">{contact.phoneNumber.slice(2)}</p>
				</div>
				{needRadio && (
					<div className="flex justify-center items-center">
						<input className="rounded-lg h-5 w-5" type="radio" name="selectcontact" value={contact.phoneNumber} />
					</div>
				)}
				{needCheckBox && (
					<div className="flex justify-center items-center">
						<input
							className="rounded-lg h-5 w-5"
							type="checkbox"
							name="selectcontact"
							value={contact.phoneNumber}
							onChange={() => {
								setAllCheckedBoxes(document.querySelectorAll("input[type=checkbox]:checked"));
							}}
						/>
					</div>
				)}
			</label>
		</>
	);
}
