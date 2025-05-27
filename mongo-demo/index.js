const mongoose = require('mongoose');
const express = require('express');

const app = express();
app.use(express.json());

app.get('/', (req, res)=>{
    res.send("hello there");
})

const port = process.env.PORT || 3000
app.listen(port, ()=> console.log(`Listening on port ${port}`));

mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log('connected to MongoDB...'))
    .catch(err => console.log('could not connect to mongoDB', err));

//create schema
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type: Date, default: Date.now},
    isPublished: Boolean
});

    //create class schema
let Course = mongoose.model('Course', courseSchema);
//create object instace of Course class
const course = new Course({
    name: 'Node Course',
    author: 'Yaw',
    tags: ['Node', 'backend'],
    isPublished: true
});


async function createCourse(){
    try{


    //save object to db
        const result = await course.save();
        console.log(result);
    }catch(error){
        console.log("error", error.message);
    }

}
// createCourse();

async function getCourse(){
    // const course = await Course
    //     // .find({author: 'Nana', isPublished: true})
    //     // comparison oerator
    //     // 
    //     // .find({price: {$gt: 10, $lte : 20}})
    //     // .find({price: {$in : [10, 20, 30]}})
    //     .select({name: 1, tags: 1});
    // console.log(course)
}

getCourse();

async function updateCourse(id){
    const course = await Course.findById(id);
    course.name = "Javascript";
    course.author = "Kwame";
    const result = await course.save();
    console.log(result)

}

updateCourse("68349ea27441e8205b123b69");