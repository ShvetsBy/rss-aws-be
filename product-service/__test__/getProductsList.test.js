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
    expect(parsedResponse.Items.length).toBeGreaterThan(0);
  });
});
