var AWS = require('aws-sdk');
AWS.config.region = 'us-east-1';
//Stuff for local dynamoDb

AWS.config.update({
    accessKeyId: 'test',
    secretAccessKey: 'secret'
});
AWS.config.endpoint = 'http://localhost:8000';

var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

var todoDal = function () {
    var tableName = "Todo";
    //Construction
    checkForTable(function (doesExist) {
        console.log(doesExist);
        if (!doesExist) {
            console.log("Table doesn't exists....Creating a new table");
            createTodoTable();
        }
    });

    //End of Construction    
    function createTodoTable() {
        var params = {
            TableName: tableName,
            KeySchema: [
                {
                    AttributeName: "Text",
                    KeyType: "HASH"
                }, //Partition key
                {
                    AttributeName: "DueDate",
                    KeyType: "RANGE"
                }
            ],
            AttributeDefinitions: [
                {
                    AttributeName: "Text",
                    AttributeType: "S"
                },
                {
                    AttributeName: "DueDate",
                    AttributeType: "S"
                }
            ],
            //Used for cloud and not local DynamoDb
            ProvisionedThroughput: {
                ReadCapacityUnits: 1,
                WriteCapacityUnits: 1
            }
        }

        dynamodb.createTable(params, function (err, data) {
            if (err) {
                console.log("Creating table failed!");
                console.log(JSON.stringify(err, null, 2));
            } else
                console.log(JSON.stringify(data, null, 2));
        });
    }

    function checkForTable(callbackFunction) {
        dynamodb.listTables({}, function (err, data) {
            if (err)
                console.log(JSON.stringify(err, null, 2));
            else {
                console.log(data);
                for (var i = 0; i < data.TableNames.length; i++) {
                    if (data.TableNames[i] === tableName) {
                        callbackFunction(true);
                        return true;
                    }
                }
                callbackFunction(false);
            }
        });
    }

    var getItem = function (itemId) {}

    var getAll = function (callback) {
        var params = {
            TableName: tableName
        };

        dynamodb.scan(params, function (err, data) {
            if (err) {
                console.log("Failed to retrieve any of the items");
                console.log(JSON.stringify(err, null, 2));
                callback(null);
            } else {
                console.log(JSON.stringify(data, null, 2));
                callback(data);
            }

        });
    }

    var addTodo = function (todoText, deadline, color, callback) {
        var params = {
            TableName: tableName,
            Item: {
                "Text": todoText,
                "DueDate": deadline,
                "color": color
            }
        };

        docClient.put(params, function (err, data) {
            if (err) {
                console.log(JSON.stringify(err, null, 2));
                callback(err, null);
            } else {
                console.log(JSON.stringify(data, null, 2));
                callback(null, data);
            }

        })


    }

    var deleteTodo = function (text, dueDate, callback) {
        var params = {
            TableName: tableName,
            Key: {
                "Text": text,
                "DueDate":dueDate
            }
        }
        console.log("Attempting a delete...");
        docClient.delete(params, function (err, data) {
            if (err) {
                console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
            }
            callback(err, data);
        });
    }

    var markAsDone = function (itemId) {

    }

    return {
        getItem: getItem,
        getAll: getAll,
        addTodo: addTodo,
        deleteTodo: deleteTodo,
        markAsDone: markAsDone
    }
}

module.exports = todoDal();