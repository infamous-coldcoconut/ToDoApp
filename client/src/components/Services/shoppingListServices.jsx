import axios from "axios";
const SERVER_URL = "http://localhost:5050/shoppingList";

const getShoppingLists = (userId) => {
  return axios.post(SERVER_URL + "/list", { userId });
};

const getShoppingList = (id) => {
  return axios.get(SERVER_URL + "/get/" + id);
};

const createShoppingList = (data, userId) => {
  const shoppingListData = {
    name: data.name,
    description: data.description,
    owner: userId,
    memberList: data.memberList || [],
    itemList: data.itemList || [],
    isActive: true,
  };

  return axios.post(SERVER_URL + "/create", shoppingListData);
};

const updateShoppingList = (id, data, userId) => {
  const shoppingListData = {
    name: data.name,
    description: data.description,
    owner: userId,
    memberList: data.memberList || [],
    itemList: data.itemList || [],
    isActive: true,
  };
  return axios.post(SERVER_URL + "/update/" + id, shoppingListData);
};

const toggleShoppingListStatus = (id, userId) => {
  return axios.post(SERVER_URL + "/archive/" + id, { userId });
};

const deleteShoppingList = (id, userId) => {
  return axios.post(SERVER_URL + "/delete/" + id, { userId });
};

const inviteUser = (listId, userId) => {
  return axios.post(SERVER_URL + `/${listId}/invite`, { userId });
};

const removeUser = (listId, userId) => {
  return axios.post(SERVER_URL + `/${listId}/remove`, { userId });
};

const ShoppingListServices = {
  getShoppingLists,
  getShoppingList,
  createShoppingList,
  updateShoppingList,
  toggleShoppingListStatus,
  deleteShoppingList,
  inviteUser,
  removeUser,
};

export default ShoppingListServices;
