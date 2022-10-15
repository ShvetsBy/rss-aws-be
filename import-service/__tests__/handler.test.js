const handler = require("../handler");

describe("import-products-file tests", () => {
  it("Returns 200 status code", async () => {
    const name = "products";
    const response = await handler.importProductsFile({
      queryStringParameters: { name },
    });
    expect(response.statusCode).toBe(200);
  });
});
