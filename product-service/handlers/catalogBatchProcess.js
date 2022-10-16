export const catalogBatchProcess = (event) => {
  const products = event.Records.map(({ body }) => body);
  console.log(products);
};
