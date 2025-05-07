import e from "express";

export const HttpFoodResponseSchema = {
    HttpFoodListResponse: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        message: { type: "string" },
        statusCode: { type: "integer", example: 200 },
        data: {
          type: "array",
          items: { $ref: "#/components/schemas/FoodOutput" }
        }
      }
    },
    HttpFoodItemResponse: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        message: { type: "string" },
        statusCode: { type: "integer", example: 200 },
        data: { $ref: "#/components/schemas/FoodOutput" }
      }
    }
  };