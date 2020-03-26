const connection = require('../database/connection');

module.exports = {
    async login(request, response) {
        const { id } = request.body;
        console.log(id);
        const ong = await connection('ongs')
        .where("id", id)
        .first();

        if(!ong){
            return response.status(200).json({error: "ONG não autorizada"});
        }
    
        return response.json(ong);
    }
};