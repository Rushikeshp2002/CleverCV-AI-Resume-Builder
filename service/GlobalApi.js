/* eslint-disable no-unused-vars */
import axios from 'axios';

const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;

console.log("API_KEY:", API_KEY); // Debugging

const axiosClient = axios.create({
    baseURL: 'https://clevercv-strapi-backend.onrender.com/api/',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
    }
});

const CreateNewResume = (data) => axiosClient.post('/user-resumes', data);
const GetUserResume = (userEmail) => axiosClient.get('/user-resumes?filter[userEmail] [$eq]='+userEmail);
const UpdateResumeDetails = (id,data)=> axiosClient.put('/user-resumes/'+id,data)
const GetResumeById =(id)=>axiosClient.get('/user-resumes/'+id+"?populate=*")
const DeleteResumeById =(id)=>axiosClient.delete('user-resumes/'+id)
export default {
    CreateNewResume,
    GetUserResume,
    UpdateResumeDetails,
    GetResumeById,
    DeleteResumeById,
};
