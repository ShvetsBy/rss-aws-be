var AWS = require("aws-sdk");

var ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

var productParams = {
  TableName: process.env.TABLE_NAME,
};

var stockParams = {
  TableName: process.env.STOCK_TABLE,
};

async function getItems(params) {
  if (!ddb) {
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: "Connection Failed" }),
    };
  }
  try {
    const data = await ddb.scan(params).promise();

    return data;
  } catch (err) {
    return JSON.stringify(err.message);
  }
}

export const getStockProducts = async (event) => {
  try {
    const products = await getItems(productParams);
    const stock = await getItems(stockParams);
    let productList = products.Items;
    let stockList = stock.Items;

    productList.forEach((el) => {
      el.description = el.description.S;
      el.id = el.id.S;
      el.img = el.img.S;
      el.price = el.price.N;
      el.title = el.title.S;
    });

    stockList.forEach((el) => {
      el.count = el.count.N;
      el.product_id = el.product_id.S;
    });
    let data = [];
    for (let i = 0; i < productList.length; i++) {
      data.push({
        ...productList[i],
        ...stockList.find(
          (itmInner) => itmInner.product_id === productList[i].id
        ),
      });
    }
    console.log(data);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
      },
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify(err.message),
    };
  }
};
