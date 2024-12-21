import axios from "axios";
const SERVER_URL = "http://localhost:5050/item";

const getItems = (listId) => {
  return axios.get(SERVER_URL + `/${listId}/` + "list");
};

const addItem = (listId, data) => {
  const itemData = {
    name: data.name,
    resolved: false,
  };

  return axios.post(SERVER_URL + `/${listId}/` + "add", itemData);
};

const updateItem = (listId, itemId, data) => {
  const itemData = {
    name: data.name,
    resolved: false,
  };

  return axios.post(SERVER_URL + `/${listId}/` + "/update" + `/${itemId}`, {
    itemData,
  });
};

const setItemResolved = (listId, itemId) => {
  return axios.post(SERVER_URL + `/${listId}/resolved`, { itemId });
};

const deleteItem = (listId, itemId) => {
  return axios.post(SERVER_URL + `/${listId}/` + "/delete" + `${itemId}`);
};

const getUsers = (userId) => {
  return axios.post("http://localhost:5050/user/get", { userId });
};

const ItemServices = {
  getItems,
  addItem,
  updateItem,
  setItemResolved,
  deleteItem,
  getUsers,
};

export default ItemServices;
