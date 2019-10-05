const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

const id = new ObjectID()
console.log(id.getTimestamp())

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }

    const db = client.db(databaseName)

    // db.collection('users').insertMany([
    //     {
    //         name: 'Heikki',
    //         age: 22
    //     }, {
    //         name: 'Galeb',
    //         age: 55
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Error inserting multiple users')
    //     }

    //     console.log(result.ops)
    // })

//    db.collection('tasks').insertMany([
//        {
//            description: 'Buy milk',
//            completed: false
//        }, {
//            description: 'Take dog out',
//            completed: false
//        }
//    ], (error, result) => {
//        if (error) {
//            return console.log('Unable to insert tasks')
//        }

//        console.log(result.ops)
//    })

})

