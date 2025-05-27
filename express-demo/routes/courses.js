const express = require('express');
const router = express.Router();
const Joi = require('joi');


const courses = [
    {id: '1', name: 'course1'},
    {id: '2', name: 'course2'},
    {id: '3', name: 'course3'},
    {id: '4', name: 'course4'}
];

router.get('/', (req,res)=>{
    res.send(courses);
})
//404 resource not found
//400 bad request
router.get('/:id', (req, res)=>{
  const course = courses.find(c => c.id == parseInt(req.params.id));
  if(!course) return res.status(404).send('The course with the given id doesnt not exist');
  res.send(course);
})

router.post('/',  (req, res)=>{
    const {error} = validateCourse(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };

    courses.push(course);
    res.send(course);
})




router.put('/:id', (req, res) => {
    // Look up the course
    const course = courses.find(c => c.id == parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given id does not exist');

    // Validate the course
    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Update course
    course.name = req.body.name;

    // Return updated course
    res.send(course);
});


router.delete('/:id', (req, res)=>{
    // look up
    const course = courses.find(c=> c.id == parseInt(req.params.id));
    if(!course) return res.status(404).send("The course with the given id does not exist");

     let courseIndex = courses.indexOf(course);
     courses.splice(courseIndex, 1);
     res.send(course);
})

function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    return Joi.validate(course, schema); // Use schema.validate() instead of Joi.validate()
}

module.exports = router;