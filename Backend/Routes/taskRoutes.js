const express = require('express');
const router = express.Router();
const user = require('../models/Task')

router.post('/', async(req,res)=>{
    try {
        const User = await user.create({
            name : req.body.name,
            email : req.body.email,
            phone : req.body.phone
        })
        res.status(201).json(User)
    } catch (error) {
        res.status(400).json({message : error})
    }
})

router.get('/', async(req,res)=>{
    try {
        const users = await user.find();
        res.status(201).json(users)
    } catch (error) {
        res.status(400).json({message : error})
    }
})

router.delete('/remove/:id', async(req,res)=>{
    try {
        const {id} = req.params;
        await user.deleteOne({_id: id});
        console.log(id)
        res.json({message: 'items delete success'})
    } catch (error) {
        res.status(500).json(error)
    }
})

router.put('/update/:id', async(req,res) => {
    try {
        const {id} = req.params;
        const {name,email,phone} = req.body;

        const updateUser = await user.findByIdAndUpdate(id, {name, email, phone}, {new: true, upset: true});
        res.json(updateUser)
        
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router