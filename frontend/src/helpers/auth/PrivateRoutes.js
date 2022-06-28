// import React, { useState } from "react";
// import { Route, Redirect } from "react-router-dom";
// import { isAuthenticated } from "./authentication";
// const PrivateRoutes = ({ component: Component, profile, handleProfileData, ...rest }) => {
// 	const [status] = useState(null);
// 	if (status === 403 || status === 401) {
// 		localStorage.removeItem("token");
// 		return <Redirect to="/signin" />;
// 	}
// 	return (
// 		<Route
// 			{...rest}
// 			render={(props) =>
// 				isAuthenticated() ? (
// 					<Component {...props} profile={profile} handleProfileData={handleProfileData} />
// 				) : (
// 					<Redirect
// 						to={{
// 							pathname: "/signin",
// 						}}
// 					/>
// 				)
// 			}
// 		/>
// 	);
// };
// export default PrivateRoutes;
