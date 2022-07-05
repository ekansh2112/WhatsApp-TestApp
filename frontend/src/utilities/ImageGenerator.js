export const getRandomColor = () => {
	var random = Math.floor(Math.random() * 3);
	var colorArr = ["#FFC632", "#2A67B2", "#95C7EC"];
	return colorArr[random];
};
const getInitials = (name) => {
	let initials;
	const nameSplit = name.split(" ");
	const nameLength = nameSplit.length;
	if (nameLength > 1) {
		initials = nameSplit[0].substring(0, 1) + nameSplit[nameLength - 1].substring(0, 1);
	} else if (nameLength === 1) {
		initials = nameSplit[0].substring(0, 1);
	} else return;

	return initials.toUpperCase();
};
export const createImageFromInitials = (size, name, color, fontColor) => {
	if (name == null) return;
	name = getInitials(name);
	const canvas = document.createElement("canvas");
	const context = canvas.getContext("2d");
	canvas.width = canvas.height = size;
	context.fillStyle = color;
	context.fillRect(0, 0, size, size);
	context.fillStyle = fontColor;
	context.textBaseline = "middle";
	context.textAlign = "center";
	context.font = `40px Inter`;
	context.fillText(name, size / 2, size / 2);
	return canvas.toDataURL();
};
