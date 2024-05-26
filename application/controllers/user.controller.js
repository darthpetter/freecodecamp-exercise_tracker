const express = require('express');
const router = express.Router();

const UserService = require('../services/user.service')

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
    const id = req.params._id
    const { description, duration, date } = req.body

    const exerciseObj = {
        description,
        duration,
        date: new Date(date)
    }
    let updatedUser = await userService.pushNewExercise(
        id,
        exerciseObj
    )

    return res.json({
        username: updatedUser.username,
        ...req.body,
        date: new Date(date).toDateString()
    })
})

// /api/users/:_id/logs?[from][&to][&limit]
router.use('/users/:_id/logs', async (req, res) => {

    const userService = new UserService();
    const id = req.params._id
    const {limit,from,to}=req.query

    let userLogs = await userService.findLogsByUserId(id,from,to,limit);

    return res.json({
        ...userLogs?._doc,
        count:userLogs?.log?.length
    })
})


module.exports = router;
