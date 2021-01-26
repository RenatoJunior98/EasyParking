
var pool = require("./DBConn");

module.exports.getAll = async function (filterObj) {
    try {
        let filterQueries = "";
        let filterValues = [];
        if (filterObj.Nome) {
            filterQueries += " AND Nome LIKE ?";
            filterValues.push("%" + filterObj.Nome + "%");
        }
        let sql = "select LugaresPrioritarios, Tipologia, ParqueID, Latitude, Longitude, Descricao, Nome, LugaresTotal, precoDiario, LugaresDisponiveis from Parque inner join Preco where Preco_ID = precoID "+
        filterQueries+" ORDER BY `Parque`.`Nome` ASC";
        let parques = await pool.query(sql,filterValues);
        return { status: 200, data: parques };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}


module.exports.getLugaresDisponiveis = async function (parqueID) {
    try {
        let sql = "select LugaresDisponiveis, lugaresTotal from Parque where ParqueID =" + parqueID + ";";
        let lugares = await pool.query(sql);
        return { status: 200, data: lugares };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.mudaLugares = async function (valor, parqueID) {
    try {
        let sql = "UPDATE Parque SET LugaresDisponiveis=? WHERE parqueID=?;";
        let result = await pool.query(sql, [valor, parqueID]);
        return { status: 200, data: result };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}


// module.exports.getOne = async function(idParque) {
//     try {
//         let sql = "SELECT * FROM parque inner join preco inner join horario where Preco_ID=PrecoID AND horario_ID=horarioID AND parqueID = ?";
//         let albuns = await pool.query(sql,[idParque]);
//         let album = albuns[0];
//         album.tracks = tracks;        
//         return {status:200, data: album};
//     } catch(err) {
//         console.log(err);
//         return {status:500, data: err};
//     }
// }