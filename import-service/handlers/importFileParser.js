import AWS from "aws-sdk";
import csv from "csv-parser";

export const importFileParser = async (event) => {
  const s3 = new AWS.S3();
  try {
    for (const record of event.Records) {
      const key = record.s3.object.key;
      const params = {
        Bucket: "jojech30qh",
        Key: key,
      };
      const results = [];

      await s3
        .getObject(params)
        .createReadStream()
        .pipe(csv())
        .on("data", (data) => results.push(data))
        .on("error", (error) => {
          reject(JSON.stringify(error));
        })
        .on("end", async () => {
          console.log(results);
        });

      await s3
        .copyObject({
          Bucket: "jojech30qh",
          CopySource: `jojech30qh/${record.s3.object.key}`,
          Key: record.s3.object.key.replace("uploaded", "parsed"),
        })
        .promise();

      await s3.deleteObject(params).promise();
    }
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: `${err}` }),
    };
  }
};
