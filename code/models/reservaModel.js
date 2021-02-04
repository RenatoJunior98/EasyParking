var pool = require("./DBConn");

module.exports.newReserva = async function (reserva) {
    try {
        let codigo = "";
        let sqlGetCodigos = "";
        let codigos;
        let valido = false;
        while (valido == false) {
            valido = true;
            codigo = getCodigo();
            sqlGetCodigos = "select COUNT(ReservaID) from Reserva where codigo = \"" + codigo + "\";";
            codigos = await pool.query(sqlGetCodigos);
            if (codigos[0] > 0)
                valido = false;
        }
        let sql = "INSERT INTO Reserva (Codigo, User_ID, Parque_ID, diaReserva, DataHora) values (?,?,?,?, CURRENT_TIMESTAMP);";
        let result = await pool.query(sql, [codigo, reserva.userID, reserva.parqueID, reserva.diaReserva]);
        return { status: 200, data: result };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

function getCodigo(){
    var codigo = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890123456789";
    for (var i = 0; i < 9; i++) {
        codigo += characters.charAt(Math.floor(Math.random() * characters.length));
      }
    console.log("Model getCodigo: " + codigo);
    return codigo;
}


module.exports.VerificarReservas = async function () {
    try {
        let sqlUpdateEstadoYesterday = "UPDATE Reserva SET RE_ID=3 WHERE DiaReserva = DATE_ADD(CURDATE(), INTERVAL -1 DAY) AND RE_ID = 2;";
        let updateYesterday = await pool.query(sqlUpdateEstadoYesterday);

        let sqlGetReservas = "select Parque_ID from Reserva WHERE DiaReserva = CURDATE() AND RE_ID = 5;";
        let reservas = await pool.query(sqlGetReservas);

        let sql = "UPDATE Parque SET LugaresDisponiveis= (LugaresDisponiveis -1) WHERE parqueID=?;";
        for (let reserva of reservas){
            let result = await pool.query(sql, [reserva.Parque_ID]);
        }

        let sqlUpdateEstadoToday = "UPDATE Reserva SET RE_ID=2 WHERE DiaReserva = CURDATE() AND RE_ID = 5;";
        let updateToday = await pool.query(sqlUpdateEstadoToday);
        return { status: 200, data: updateToday };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}



module.exports.getReservas = async function (user) {
    try {
        let sql = "select Estado, Parque.Nome, Descricao, Codigo, DATE_FORMAT(DataHora, '%d/%m/%Y às %h:%i') as DataHora, DATE_FORMAT(DiaReserva, '%d/%m/%Y') as DiaReserva from ReservaEstado inner join Parque inner join Reserva inner join User where Reserva.Parque_ID = ParqueID AND REID = RE_ID AND Reserva.User_ID = UserID AND UserID = ?;";
        let reservas = await pool.query(sql, [user.userID]);
        return { status: 200, data: reservas };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}


module.exports.usarReserva = async function (reservaCode) {
    try {
        let sql = "select COUNT(ReservaID) as nReservas from Reserva where Codigo = \"" + reservaCode.codigo + "\" AND diaReserva = CURDATE() AND RE_ID = 2 AND Parque_ID = ?;";
        let reservas = await pool.query(sql, reservaCode.Parque_ID);
        let reserva = reservas[0];
        if (reserva.nReservas == 0)
        return { status: 404, msg: "Codigo invalido ou utilizador encontra-se no parque errado" };
        else {
            let sqlUpdateEstado = "UPDATE Reserva SET RE_ID=4 WHERE Codigo= \"" + reservaCode.codigo + "\";";
            let result = await pool.query(sqlUpdateEstado);
            return { status: 200, msg: "Codigo valido" };       
        } 
    } catch (err) {
        console.log(err);
        return { status: 500, msg: JSON.stringify(reservaCode) };
    }
}