var pool = require("./DBConn");

module.exports.newReview = async function (review) {
    try {
        let sql = "INSERT INTO Review (Comentario, Classificacao, Parque_ID, User_ID) values (?,?,?,?);";
        let result = await pool.query(sql, [review.comentario, review.classificacao, review.parqueID, review.userID]);
        return { status: 200, data: result };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.getReviews = async function (parqueID) {
    try {
        let classificacaoSum = 0;
        let classificacaoMedia = 0;
        let sql = "select Nome, Classificacao, Comentario from Review inner join User where Parque_ID = ? AND UserID = User_ID";
        let reviews = await pool.query(sql, parqueID);
        for (let review of reviews)
            classificacaoSum += review.Classificacao;
        if (classificacaoSum > 0) {
            classificacaoMedia = (classificacaoSum / reviews.length).toFixed(1);
        }
        let reviewsClassificacao = {
            reviews: reviews,
            classificacaoMedia: classificacaoMedia
        }
        return { status: 200, data: reviewsClassificacao };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

