var pool = require("./DBConn");

module.exports.newReview = async function (review) {
    try {
        let sql = "Insert into Review (Comentario, Classificacao, Parque_ID, User_ID) values (?,?,?,?);";
        let reviews = await pool.query(sql, [review.comentario, review.classificacao, review.parqueID, review.userID]);
        return { status: 200, data: reviews };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}
