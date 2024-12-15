import request from "supertest";
import app from "../../../server";
import ShoppingList from "../../models/shoppingList.model";

jest.mock("../../models/shoppingList.model");

describe("POST /api/shoppingList", () => {
  it("should return all shopping lists for a user", async () => {
    const lists = [{ _id: "1", name: "Test Shopping List" }];
    ShoppingList.find.mockImplementation(() => ({
      find: jest.fn().mockResolvedValue(lists),
    }));

    const response = await request(app).post("/shoppingList/list").send({
      userId: "fakeUserId123",
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(lists);
    expect(ShoppingList.find).toHaveBeenCalledWith({
      $or: [{ owner: "fakeUserId123" }, { memberList: "fakeUserId123" }],
    });
  });

  it("should create a new shopping list", async () => {
    const newList = {
      name: "New Shopping List",
      description: "New list description",
      owner: "newUserId123",
      memberList: [],
      itemList: [],
      isActive: true,
    };

    ShoppingList.create.mockImplementation(() => newList);

    const response = await request(app)
      .post("/shoppingList/create")
      .send(newList);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(newList);
    expect(ShoppingList.create).toHaveBeenCalledWith(newList);
  });

  it("should update an existing shopping list", async () => {
    const updatedList = {
      name: "Updated Shopping List",
      description: "Updated description",
      owner: "updatedUserId123",
      memberList: ["userId123"],
      itemList: [],
      isActive: false,
    };

    ShoppingList.findByIdAndUpdate.mockResolvedValue(updatedList);

    const response = await request(app)
      .post(`/shoppingList/update/1`)
      .send(updatedList);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(updatedList);
    expect(ShoppingList.findByIdAndUpdate).toHaveBeenCalledWith(
      "1",
      updatedList,
      { new: true, runValidators: true }
    );
  });

  it("should delete a shopping list", async () => {
    const listToDelete = { _id: "1", name: "Test Shopping List" };

    ShoppingList.findByIdAndDelete.mockResolvedValue(listToDelete);

    const response = await request(app).post(`/shoppingList/delete/1`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "ShoppingList deleted successfully",
    });
    expect(ShoppingList.findByIdAndDelete).toHaveBeenCalledWith("1");
  });
});
