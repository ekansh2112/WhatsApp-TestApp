const BACKEND = "http://localhost:4000/";

// Authentication APIs
export const Register_API = `${BACKEND}api/signup/`;
export const Login_API = `${BACKEND}api/login/`;
export const Signout_API = `${BACKEND}api/logout/`;

// Profile APIs
export const ProfileUpdate_API = `${BACKEND}api/user/update/`;

// Contacts APIs
export const NewContacts_API = `${BACKEND}api/contacts/create/`;
export const DeleteContacts_API = `${BACKEND}api/contacts/delete/`;
export const Contacts_API = `${BACKEND}api/contacts/all/`;
export const SearchContacts_API = `${BACKEND}api/contacts/search/`;

// Broadcast Lists APIs
export const NewBroadcastLists_API = `${BACKEND}api/broadcast/create/`;
export const DeleteBroadcastLists_API = `${BACKEND}api/broadcast/delete/`;
export const BroadcastLists_API = `${BACKEND}api/broadcast/all/`;

// Message APIs
export const SendMessage_API = `${BACKEND}api/messages/send/`;
export const SendFileMessage_API = `${BACKEND}api/messages/send/file/`;
export const SendBroadcastMessage_API = `${BACKEND}api/broadcast/send/`;