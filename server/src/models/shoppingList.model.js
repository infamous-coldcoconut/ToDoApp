import mongoose, { Schema } from "mongoose";

const ShoppingListSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    memberList: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    itemList: [
      {
        name: {
          type: String,
          required: true,
        },
        resolved: {
          type: Boolean,
          default: false,
        },
      },
    ],

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamp: true,
  }
);

ShoppingListSchema.index({ owner: 1 });

const ShoppingList = mongoose.model("ShoppingList", ShoppingListSchema);
export default ShoppingList;
