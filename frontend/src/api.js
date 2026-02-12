import axios from "axios";
import { auth } from "./firebase";

const API_BASE = "http://localhost:8080/api/resume";

const getAuthHeader = async () => {
    const user = auth.currentUser;
    if (!user) throw new Error("Not authenticated");
    const token = await user.getIdToken();
    return { Authorization: `Bearer ${token}` };
};

export const saveResume = async (resumeData) => {
    const headers = await getAuthHeader();
    const response = await axios.post(`${API_BASE}/save`, resumeData, { headers });
    return response.data;
};

export const getResume = async (userId) => {
    const headers = await getAuthHeader();
    const response = await axios.get(`${API_BASE}/${userId}`, { headers });
    return response.data;
};

export const updateResume = async (resumeData) => {
    const headers = await getAuthHeader();
    const response = await axios.put(`${API_BASE}/update`, resumeData, { headers });
    return response.data;
};

export const deleteResume = async () => {
    const headers = await getAuthHeader();
    const response = await axios.delete(`${API_BASE}/delete`, { headers });
    return response.data;
};
