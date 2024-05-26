const express = require('express');
const router = express.Router();

const UserService = require('../services/user.service')
const ExerciseService = require('../services/exercise.service')

router.route('/users')
    .post(async (req, res) => {
        const userService = new UserService();
        const { username } = req.body

        const userSaved = await userService.store(username);

        return res.json({
            username: userSaved.username,
            _id: userSaved.id
        })
    })
    .get(async (req, res) => {
        const userService = new UserService();
        return res.json(await userService.index())
    });

router.use('/users/:_id/exercises', async (req, res) => {
    const userService = new UserService();
    const exerciseService = new ExerciseService();

    const userId = req.params._id
    let { description, duration, date } = req.body
    date = (new Date(date).toString().toLocaleLowerCase().includes("invalid")) ? new Date() : new Date(date)

    const user = await userService.findById(userId)
    if (!user) {
        return user;
    }

    let logSaved = await (await exerciseService.store(String(user._id), description, duration, date)).toObject()
    delete logSaved.__v
    delete logSaved._id
    delete logSaved.userId

    const response = {
        _id: user._id,
        username:user.username,
        ...logSaved,
        date: new Date(logSaved.date).toDateString()
    }

    return res.json(response)
})

router.use('/users/:_id/logs', async (req, res) => {

    const userService = new UserService();
    const exerciseService = new ExerciseService();
    const id = req.params._id
    const { limit, from, to } = req.query

    let user = await userService.findById(id)
    if (!user) {
        return user;
    }
    user=user.toObject();
    delete user.__v

    let exercises=await exerciseService.findByUserId(id,from,to,limit)
    exercises=exercises.map(it=>{
        it=it.toObject()
        delete it.__v
        delete it._id
        delete it.userId

        it.date=new Date(it.date).toDateString()

        return it
    })

    const response={
        ...user,
        count:exercises.length,
        log:exercises
    }

    res.json(response)

})



module.exports = router;
