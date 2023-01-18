import { getProductById } from "../handlers/getProductById";
describe("Get product by id", () => {
  it("Returns 200 status code", async () => {
    const result = await getProductById({
      pathParameters: { id: "05e96ded-f2df-4743-9097-0539b6d65387" },
    });
    expect(result.statusCode).toBe(200);
  });
  it("Returns valid headers", async () => {
    const result = await getProductById({
      pathParameters: { id: "05e96ded-f2df-4743-9097-0539b6d65387" },
    });
    expect(result.headers).toEqual({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
    });
  });
  it("Returns content in body", async () => {
    const result = await getProductById({
      pathParameters: { id: "05e96ded-f2df-4743-9097-0539b6d65387" },
    });
    const parsedResponse = JSON.parse(result.body);
    expect(parsedResponse.Items.length).toBeGreaterThan(0);
  });
});
