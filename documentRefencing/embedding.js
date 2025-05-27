const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors: [authorSchema]
}));

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId) {
  // const course = await Course.findById(courseId);
  // course.author.name = 'Nana Yaw';
  // course.save();
  //or
  const course = await Course.updateOne({_id: courseId},{
    $set: {'author.name':'Nana Asare'}
  }
  )}

// updateAuthor('6835c4ed9dd901e6ecd01065');

//creating course author with array parameter
// createCourse('Node Course', [
//   new Author({ name: 'Mosh' }),
//   new Author({ name: 'Mosh' })
// ]);

async function addAuthor(courseId, author){
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save()
}


async function removeAuthor(courseId, authorId){
  const course = await Course.findById(courseId);
  course.authors.pull({_id: authorId});
  await course.save();
}

removeAuthor('6835f71a7e4b7b5915c854cf', '6835f71a7e4b7b5915c854cd');

// addAuthor('6835f71a7e4b7b5915c854cf', new Author({ name: 'Nana' }))