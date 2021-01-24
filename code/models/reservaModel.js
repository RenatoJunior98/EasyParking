var pool = require("./DBConn");

module.exports.newReserva = async function(reserva) {
    try {
        let sql = "INSERT INTO Reserva (Codigo, User_ID, Parque_ID, DataHora) values (?,?,?, CURRENT_TIMESTAMP);";
        let result = await pool.query(sql, [reserva.codigo, reserva.userID, reserva.parqueID]);
        return { status: 200, data: result };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}


module.exports.verificarcodigo = async function (codigo) {
    try {
        let sql = "select ReservaID from Reserva where Codigo = \"" + codigo + "\";";
        let reserva = await pool.query(sql);
        return { status: 200, data: reserva };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}
// module.exports.getReviews = async function (ParqueID) {
//     try {
//         let sql = "select Nome, Classificacao, Comentario from Review inner join User where Parque_ID = " + ParqueID + " AND userID = user_ID";
//         let reviews = await pool.query(sql);
//         return { status: 200, data: reviews };
//     } catch (err) {
//         console.log(err);
//         return { status: 500, data: err };
//     }
// }

