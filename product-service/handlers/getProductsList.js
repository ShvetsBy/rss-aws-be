import products from "../DB/products";

export const getProductsList = async (event) => {
  try {
    if (!products) {
      return {
        statusCode: "404",
        body: "Products are unavailiable",
      };
    }
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify(products),
    };
  } catch (e) {
    console.log(e);
  }
};
