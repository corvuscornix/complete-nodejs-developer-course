const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

const id = new ObjectID()
console.log(id.getTimestamp())

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }

    const db = client.db(databaseName)

    //     db.collection('users').insertMany([
    //         {
    //             name: 'Heikki',
    //             age: 22
    //         }, {
    //             name: 'Galeb',
    //             age: 55
    //         }
    //     ], (error, result) => {
    //         if (error) {
    //             return console.log('Error inserting multiple users')
    //         }

    //         console.log(result.ops)
    //     })

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

    // db.collection('users').findOne({_id: new ObjectID('5dceda230a66e9052418ce9c')}, (error, user) => {
    //     if (error) {
    //         return console.log('Unable to fetch')
    //     }

    //     console.log(user)
    // })

    //db.collection('users').find({age: 22}).

    // db.collection('tasks').findOne({ _id: new ObjectID('5dcef108fe2029e37403aee0') }, (error, task) => {
    //     if (error) {
    //         return console.log('Unable to fetch')
    //     }

    //     console.log(task)
    // })

    // db.collection('tasks').find({ completed: false }).toArray((error, tasks) => {
    //     if (error) {
    //         return console.log('Unable to fetch')
    //     }

    //     console.log(tasks)
    // })

    // const updatePromise = db.collection('users').updateOne({
    //     _id: new ObjectID('5d974cddf57981147cd0b518'),
    // }, {
    //     /*$set: {
    //         name: 'Mike'
    //     },*/
    //     $inc: {
    //         age: 1
    //     }
    // }).then(result => {
    //     console.log(result)
    // }).catch(error => {
    //     console.log(error)
    // })

    // const updatePromise = db.collection('tasks').updateMany({
    //     completed: false,
    // }, {
    //     $set: {
    //         completed: true,
    //         description: 'Completed'
    //     },
    // }).then(result => {
    //     console.log(result)
    // }).catch(error => {
    //     console.log(error)
    // })

    const deletePromise = db.collection('tasks').deleteOne({
        _id: new ObjectID('5d974e857682d73338eb2c59'),
    }).then(result => {
        console.log(result)
    }).catch(error => {
        console.log(error)
    })

});