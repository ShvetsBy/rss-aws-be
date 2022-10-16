import { putProduct } from "./putProduct";

export const catalogBatchProcess = async (event) => {
  const products = event.Records.map(({ body }) => body);

  try {
    for (const product of products) {
      console.log(product);

      await putProduct(product);
    }

    console.log({
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
      },
      body: JSON.stringify({ msg: "product created!" }),
    });
  } catch (e) {
    console.log(e);
  }
};
