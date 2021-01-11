var pool = require("./DBConn");

module.exports.newReviw = async function (comentario, classificacao) {
    try {
        let sql = "Insert into Review (Comentario, Classificacao, Parque_ID, User_ID) values (?,?,?,?);";
        let reviews = await pool.query(sql, comentario, classificacao, sessionStorage.getItem("parqueID"), sessionStorage.getItem("userID"));
        return { status: 200, data: reviews };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}
