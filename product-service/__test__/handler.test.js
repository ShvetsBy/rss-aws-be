import { getProductById } from "../handlers/getProductById";
import { getProductsList } from "../handlers/getProductsList";

describe("Get products", () => {
  it("Returns 200 status code", async () => {
    getProductsList();
    //await getProductById("123");
    //   const name = "products";
    //   const response = await handler.importProductsFile({
    //     queryStringParameters: { name },
    //   });
    //   expect(response.statusCode).toBe(200);
  });
});

describe("Get product by id", () => {
  it("Returns 200 status code", async () => {
    getProductById("123");
    //   const name = "products";
    //   const response = await handler.importProductsFile({
    //     queryStringParameters: { name },
    //   });
    //   expect(response.statusCode).toBe(200);
  });
});
