import products from "../DB/products";

export const getProductById = async (event) => {
  const { id } = event.pathParameters;
  const product = products.find((item) => item.id === parseInt(id));

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify(product),
  };
};
