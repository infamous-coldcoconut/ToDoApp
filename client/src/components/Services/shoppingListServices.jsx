import axios from "axios";
const SERVER_URL = "http://localhost:5050/shoppingList";

const getShoppingLists = (userId) => {
  return axios.post(SERVER_URL + "/list", { userId });
};

const getShoppingList = (id, userId) => {
  return axios.post(SERVER_URL + "/get/" + id, { userId });
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

const deleteShoppingList = (id, userId) => {
  return axios.post(SERVER_URL + "/delete/" + id);
};

const ShoppingListServices = {
  getShoppingLists,
  getShoppingList,
  createShoppingList,
  updateShoppingList,
  deleteShoppingList,
};

export default ShoppingListServices;
