import AWS from "aws-sdk";
import csv from "csv-parser";

export const importFileParser = async (event) => {
  const s3 = new AWS.S3();
  const sqs = new AWS.SQS();
  try {
    for (const record of event.Records) {
      const key = record.s3.object.key;
      const params = {
        Bucket: "jojech30qh",
        Key: key,
      };
      const results = [];
      const StringToObj = (str) => {
        const obj = {};
        obj[str.split(":")[0]] = str.split(":")[1];
        return obj;
      };
      s3.getObject(params)
        .createReadStream()
        .pipe(csv(["title", "description", "price", "img", "count"]))
        .on("data", (data) => {
          data.title = StringToObj(data.title);
          data.description = StringToObj(data.description);
          data.price = StringToObj(data.price);
          data.img = StringToObj(data.img);
          data.count = StringToObj(data.count);
          results.push(data);

          sqs.sendMessage(
            {
              MessageBody: JSON.stringify(data),
              QueueUrl:
                "https://sqs.eu-west-1.amazonaws.com/203064053127/catalogItemsQueue",
            },
            (err, data) => {
              if (err) {
                console.error(err);
                return;
              }
              console.log(data);
            }
          );
        })
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
