
var pool = require("./DBConn");

module.exports.getAll = async function (filterObj) {
    try {
        let filterQueries = "";
        let filterValues = [];
        if (filterObj.Nome) {
            filterQueries += " AND Nome LIKE ?";
            filterValues.push("%" + filterObj.Nome + "%");
        }
        let sql = "select ClassificacaoMedia, LugaresPrioritarios, Tipologia, ParqueID, Latitude, Longitude, Descricao, Nome, LugaresTotal, precoDiario from Parque inner join Preco where Preco_ID = precoID" +
        filterQueries;
        let parques = await pool.query(sql,filterValues);
        return { status: 200, data: parques };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}


module.exports.verificarLogin = async function (username, pass) {
    try {
        let sql = "select userID from User where Username = \"" + username + "\" and Pass = \"" + pass + "\";";
        let login = await pool.query(sql);
        return { status: 200, data: login };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.save = async function(user) {
    try {
        let sql = "insert into user (Username, Pass, Nome) values (?,?,?);";
        let result = await pool.query(sql, [user.username, user.Pass, user.Nome]);
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