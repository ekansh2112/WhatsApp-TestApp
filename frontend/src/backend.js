const BACKEND = "http://localhost:2000/";

// Authentication APIs
export const Register_API = `${BACKEND}api/signup/`;
export const Login_API = `${BACKEND}api/login/`;
export const isAuthenticated_API = `${BACKEND}api/isauth/`;
export const Signout_API = `${BACKEND}api/logout/`;

// Contacts APIs
export const NewContacts_API = `${BACKEND}api/contacts/create`;
export const DeleteContacts_API = `${BACKEND}api/contacts/`;
export const Contacts_API = `${BACKEND}api/contacts`;

// Broadcast Lists APIs
export const NewBroadcastLists_API = `${BACKEND}api/broadcastlists/create`;
export const DeleteBroadcastLists_API = `${BACKEND}api/broadcastlists/delete`;
export const BroadcastLists_API = `${BACKEND}api/broadcastlists`;
