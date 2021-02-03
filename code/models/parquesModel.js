
var pool = require("./DBConn");

module.exports.getAll = async function (filterObj) {
    try {
        let filterQueries = "";
        let filterValues = [];
        if (filterObj.Nome) {
            filterQueries += " AND Nome LIKE ?";
            filterValues.push("%" + filterObj.Nome + "%");
        }
        if (filterObj.parqueID != null) {
            let sql = "select LugaresPrioritarios, Tipologia, ParqueID, Latitude, Longitude, Descricao, Nome, LugaresTotal, precoDiario, LugaresDisponiveis from Parque inner join Preco where Preco_ID = precoID AND ParqueID = ?";
            let parques = await pool.query(sql, filterObj.parqueID);
            return { status: 200, data: parques };
        }
            let sql = "select LugaresPrioritarios, Tipologia, ParqueID, Latitude, Longitude, Descricao, Nome, LugaresTotal, precoDiario, LugaresDisponiveis from Parque inner join Preco where Preco_ID = precoID " +
            filterQueries + " ORDER BY `Parque`.`Nome` ASC";
            let parques = await pool.query(sql,filterValues);
            return { status: 200, data: parques };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.mudaLugares = async function (obj) {
    try {
        let sqlLugaresDisponivei = "select LugaresDisponiveis, lugaresTotal from Parque where ParqueID =?;";
        let lugares = await pool.query(sqlLugaresDisponivei, obj.parqueID);
        if (lugares[0].LugaresDisponiveis > Math.round(lugares[0].lugaresTotal / 10) && lugares[0].LugaresDisponiveis < lugares[0].lugaresTotal) {
            let sql = "UPDATE Parque SET LugaresDisponiveis= (LugaresDisponiveis + ?) WHERE parqueID=?;";
            let result = await pool.query(sql, [obj.valor, obj.parqueID]);
            return { status: 200, data: result };
        }  
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}
