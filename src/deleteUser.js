'use strict';
const AWS = require("aws-sdk")
const middy = require("@middy/core")
const httpJsonBodyParser = require("@middy/http-json-body-parser")

const deleteUser = async (event) => {

  const dynamodb = new  AWS.DynamoDB.DocumentClient();
  const id = event.pathParameters.id;    
   
  await dynamodb.delete({
    TableName : "UserTable",
    Key : {
        id: id,
    }, 
  }).promise()
   
  return {
    statusCode: 200,
    body: JSON.stringify({
        msg:'User Deleted'
    }), 
  };  
};  

module.exports = {
  handler: middy(deleteUser).use(httpJsonBodyParser())
}
