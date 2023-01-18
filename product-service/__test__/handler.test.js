import { getProductById } from "../handlers/getProductById";
import { getProductsList } from "../handlers/getProductsList";

describe("Get products", () => {
  it("Returns 200 status code", async () => {
    const response = await getProductsList();
    expect(response.statusCode).toBe(200);
  });
  it("Returns valid headers", async () => {
    const response = await getProductsList();
    expect(response.headers).toEqual({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
    });
  });
  it("Returns content in body", async () => {
    const response = await getProductsList();
    const parsedResponse = JSON.parse(response.body);
    console.log(parsedResponse.Items[0]);
    expect(parsedResponse.Items.length).toBeGreaterThan(0);
  });
});

// describe("Get product by id", () => {
//   it("Returns 200 status code", async () => {
//     // const result = getProductById("123");
//     // console.log(result);
//     //   const name = "products";
//     //   const response = await handler.importProductsFile({
//     //     queryStringParameters: { name },
//     //   });
//     //   expect(response.statusCode).toBe(200);
//   });
// });
