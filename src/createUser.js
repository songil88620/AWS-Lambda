'use strict';

const {v4} = require("uuid")
const AWS = require("aws-sdk")
const middy = require("@middy/core")
const httpJsonBodyParser = require("@middy/http-json-body-parser")


const createUser = async (event) => {

  const dynamodb = new AWS.DynamoDB.DocumentClient()  
  const userInfo =  event.body; 

  const createAt = new Date().toString();
  const id = v4(); 
  
  const newUser = {
    id,
    userInfo,
    createAt,
  }

  await dynamodb.put({
    TableName : "UserTable",
    Item : newUser
  }).promise()
   
  return {
    statusCode: 200,
    body: JSON.stringify(newUser), 
  }; 
};

module.exports = {
  handler: middy(createUser).use(httpJsonBodyParser())
}
