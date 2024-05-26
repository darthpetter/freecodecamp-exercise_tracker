const UserModel = require('../../database/schemas/user.schema');
const { options } = require('../controllers');

class UserService {
    async store(username) {
        let user = new UserModel({ username })
        await user.save()
        return user;
    }

    async index() {
        return await UserModel.find().select({ __v: 0, log: 0 }).exec()
    }

    async pushNewExercise(id, exercise) {
        return await UserModel.findByIdAndUpdate(
            { _id: id },
            { $push: { "log": { ...exercise } } },
            { safe: true, upsert: true, new: true },
        )
    }

    async findLogsByUserId(id, from = null, to = null, limit = null) {
        const query = UserModel.findOne({ _id: id });

        const matchCriteria = {};

        if (limit != null) {
            query.select({
                'log': {
                    $slice: Number(limit),
                },
            });
        }
        if (from !== null || to !== null) {
            const dateFilter = {};
            if (from !== null) {
                dateFilter['$gte'] = new Date(from);
            }
            if (to !== null) {
                dateFilter['$lte'] = new Date(to);
            }

            query.select({
                'log': {
                    $elemMatch: {
                        date: dateFilter
                    }
                }
            });
        }


        query.select({ '__v': 0 })


        return await query.exec()
    }
}

module.exports = UserService