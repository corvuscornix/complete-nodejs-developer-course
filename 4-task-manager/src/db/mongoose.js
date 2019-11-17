const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});


const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    },
    email: {
        type: String,
        required: true,
        validate (value) {
            if (!validator.isEmail(value)) {
                throw new Error('Not a valid email');
            }
        },
        trim: true,
        lowercase: true
    }
});

const me = new User({
    name: ' Mike great ',
    email: '  asdasd@email.com'
});

me.save().then(result => {
    console.log(me)
}).catch(e => {
    console.log('ERROR: ' + e)
})

// const Task = mongoose.model('Task', {
//     description: {
//         type: String
//     },
//     completed: {
//         type: Boolean
//     }
// });

// const task = new Task({
//     description: 'Make food for everyone',
//     completed: false
// });

// task.save().then(result => {
//     console.log(task)
// }).catch(e => {
//     console.log('ERROR: ' + e)
// })