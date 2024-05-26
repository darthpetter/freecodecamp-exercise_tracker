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

    async findById(id) {        
        try {
            return await UserModel.findById({ _id: id }).exec();
        } catch (error) {
            return error
        }
    }

    async findLogsByUserId(id, from = null, to = null, limit = null) {
        const query = UserModel.findOne({ _id: id }).select({ '__v': 0 });

        if (limit !== null) {
            query.select({
                'log': {
                    $slice: Number(limit),
                },
            });
        }
        return await query.exec();
    }

}

module.exports = UserService