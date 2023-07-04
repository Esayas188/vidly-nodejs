const mongoose = require('mongoose')
const express = require('express');
const router = express.Router();
const Joi = require('joi');






const Genre = mongoose.model('Genre', new mongoose.Schema({
    name:{
        type:String,
        required: true,
        minlength: 5,
        maxlength:50,
    }
}));


router.get('/',async (req,res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
  
});

router.post('/',async (req,res) =>{
    const {error,value} = validateGenres(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    let genre = new Genre ({ name:req.body.name}); 

    genre = await genre.save();

    res.send(genre);

});
router.put('/:id',async (req,res) =>{
     //validate
     const { error,value} = validateGenres(req.body);

     if (error) return res.status(400).send(error.details[0].message);


    const genre = await Genre.findByIdAndUpdate(req.params.id,{name: req.body.name},{
        new:true
    })
    //Look up the genre
    if (!genre) return res.status(404).send('The genre with the given Id was not find');

    res.send(genre); 

});
router.get('/:id',async (req,res) =>{
    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).send('The genre with the given Id was not find');
    res.send(genre);
    //If not existing, return 404

});

router.delete('/:id',async(res,req) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);

    if (!genre) return res.status(404).send('The genre with the given Id was not find');
    //If not existing, return 404

    res.send(genre);  

});


function validateGenres(genres){
    const schema = Joi.object({
        name:Joi.string().min(3).required(),
    });
    return schema.validate(genres);
}

module.exports = router;