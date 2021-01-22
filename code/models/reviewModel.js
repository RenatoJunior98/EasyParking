var pool = require("./DBConn");

module.exports.newReview = async function(review) {
    try {
        let sql = "INSERT INTO Review (Comentario, Classificacao, Parque_ID, User_ID) values (?,?,?,?);";
        let result = await pool.query(sql, [review.comentario, review.classificacao, review.parqueID, review.userID]);
        return { status: 200, data: result };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.getReviews = async function (ParqueID) {
    try {
        let sql = "select Nome, Classificacao, Comentario from Review inner join User where Parque_ID = " + ParqueID + " AND userID = user_ID";
        let reviews = await pool.query(sql);
        return { status: 200, data: reviews };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

