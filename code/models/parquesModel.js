  
var pool = require("./DBConn");

module.exports.getAll = async function() {
    try {
        let sql = "select ParqueID as 'parque', Nome, lugaresTotal, precoDiario from parque inner join Preco where Preco_ID = precoID;";
        let parques = await pool.query(sql);
        return {status:200, data: parques};
    } catch(err) {
        console.log(err);
        return {status:500, data: err};
    }
}