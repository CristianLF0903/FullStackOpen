import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3001/api/persons";

const getAll = () => {
  const request = axios.get(API_URL);
  return request.then((response) => response.data);
};

const create = (newPerson) => {
  const request = axios.post(API_URL, newPerson);
  return request.then((response) => response.data);
};

const update = (id, updatedPerson) => {
  const request = axios.put(`${API_URL}/${id}`, updatedPerson);
  return request.then((response) => response.data);
};

const remove = (id) => {
  const request = axios.delete(`${API_URL}/${id}`);
  return request.then((response) => response.data);
};

export default { getAll, create, update, remove };
