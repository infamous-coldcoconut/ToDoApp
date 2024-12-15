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

  return axios.post(SERVER_URL + `/${listId}/` + "addItem", itemData);
};

const updateItem = (listId, itemId, data) => {
  const itemData = {
    name: data.name,
    resolved: false,
  };

  return axios.post(
    SERVER_URL + `/${listId}/` + "/udpate" + `/${itemId}`,
    itemData
  );
};

const setItemResolved = (listId, itemId) => {
  return axios.post(SERVER_URL + `/${listId}/` + `${itemId}`);
};

const deleteItem = (listId, itemId) => {
  return axios.post(SERVER_URL + `/${listId}/` + "/delete" + `${itemId}`);
};

const ItemServices = {
  getItems,
  addItem,
  updateItem,
  setItemResolved,
  deleteItem,
};

export default ItemServices;
