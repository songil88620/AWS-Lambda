'use strict';
const AWS = require("aws-sdk")

const fetchUsers = async (event) => {

  const dynamodb = new  AWS.DynamoDB.DocumentClient();

  let userInfos;

  try{
    const result = await dynamodb.scan({TableName:"UserTable"}).promise();
    userInfos = result.Items
  }catch(err){
    console.log(err)
  }
   
  return {
    statusCode: 200,  
    body: JSON.stringify(userInfos),
  };
 
}; 

module.exports = {
  handler: fetchUsers
}
