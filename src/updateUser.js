'use strict';
const AWS = require("aws-sdk")
const middy = require("@middy/core")
const httpJsonBodyParser = require("@middy/http-json-body-parser")

const updateUser = async (event) => {

  const dynamodb = new  AWS.DynamoDB.DocumentClient();
  const id = event.pathParameters.id;    
  const userInfo = event.body;   
   
  await dynamodb.update({
    TableName : "UserTable",
    Key : {
        id: id,
    },
    UpdateExpression : `set userInfo = :userInfo`,
    ExpressionAttributeValues:{
        ':userInfo' : userInfo
    },
    ReturnValues:'ALL_NEW',     
  }).promise()
   
  return {
    statusCode: 200,
    body: JSON.stringify({
        msg:'User Updated'
    }), 
  }; 
 
};  

module.exports = {
  handler: middy(updateUser).use(httpJsonBodyParser())
}
