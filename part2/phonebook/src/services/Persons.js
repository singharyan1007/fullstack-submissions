import axios from "axios";
const baseUrl = "http://localhost:3001/persons"


const getPersons = async () => {
  const persons = axios.get(baseUrl);
  const response = await persons;
  return response.data;
}

const postPerson = async (person) => {
  const request = axios.post(baseUrl, person);
  const response = await request;
  return response.data;

}

const deletePerson = async (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  const response = await request;
  return response.data;

}
const putPerson = async (newPhonebook, id) => {
  const request = axios.put(`${baseUrl}/${id}`, newPhonebook)
  const response = await request
  return response.data
}

export default { getPersons, postPerson, deletePerson, putPerson };
