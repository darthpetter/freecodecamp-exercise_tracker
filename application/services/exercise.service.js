const ExerciseModel = require('../../database/schemas/exercise.schema');

class ExerciseService{
    async store(userId,description,duration,date) {
        let exerciseNew=new ExerciseModel({
            userId,
            description,
            duration,
            date
        })

        return await exerciseNew.save()
    }

    async findByUserId(userId,from=null,to=null,limit=null){
        const query=ExerciseModel.find({
            userId
        })

        if(limit!==null){
            query.limit(limit)
        }

        if(from!==null){
            query.where('date').gte(new Date(from))
        }

        if(to!==null){
            query.where('date').lte(new Date(to))
        }

        return await query.exec()
    }
}

module.exports=ExerciseService