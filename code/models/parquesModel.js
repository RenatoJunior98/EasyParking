  
var pool = require("./DBConn");

module.exports.getAll = async function() {
    try {
        let sql = "select ClassificacaoMedia, LugaresPrioritarios, Tipologia, ParqueID, Latitude, Longitude, Descricao, Nome, lugaresTotal, precoDiario from Parque inner join Preco where Preco_ID = precoID;";
        let parques = await pool.query(sql);
        return {status:200, data: parques};
    } catch(err) {
        console.log(err);
        return {status:500, data: err};
    }
}

module.exports.getReviews = async function(ParqueID) {
    try {
        let sql = "select * from Review inner join User where Parque_ID = "+ParqueID+" and User_ID = UserID;";
        let reviews = await pool.query(sql);
        return {status:200, data: reviews};
    } catch(err) {
        console.log(err);
        return {status:500, data: err};
    }
}