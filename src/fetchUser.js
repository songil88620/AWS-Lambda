"use strict";
const AWS = require("aws-sdk");

const fetchUser = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const id = event.pathParameters;

  let userInfo;

  try {
    const result = await dynamodb
      .scan({ TableName: "UserTable", Key: { id } })
      .promise();
    userInfo = result.Item;
  } catch (err) {
    console.log(err);
  }

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(userInfo),
  };
};

module.exports = {
  handler: fetchUser,
};
