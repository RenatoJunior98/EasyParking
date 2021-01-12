var pool = require("./DBConn");

module.exports.save = async function(review) {
    try {
        let sql = "INSERT INTO Review (Comentario, Classificacao, Parque_ID, User_ID) values (?,?,?,?);";
        let result = await pool.query(sql, [review.comentario, review.classificacao, review.parqueID, review.userID]);
        return { status: 200, data: result };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}
