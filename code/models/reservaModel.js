var pool = require("./DBConn");

module.exports.newReserva = async function(reserva) {
    try {
        let sql = "INSERT INTO Reserva (Codigo, User_ID, Parque_ID, diaReserva, DataHora) values (?,?,?,?, CURRENT_TIMESTAMP);";
        let result = await pool.query(sql, [reserva.codigo, reserva.userID, reserva.parqueID, reserva.diaReserva]);
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


module.exports.mudarEstado = async function (estadoID, reservaID) {
    try {
        let sql = "UPDATE Reserva SET RE_ID=? WHERE ReservaID=?;";
        let result = await pool.query(sql, [estadoID, reservaID]);
        return { status: 200, data: result };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}


module.exports.getReservas = async function (userID) {
    try {
        let sql = "select Estado, Parque.Nome, Descricao, Codigo, DATE_FORMAT(DiaReserva, '%d/%m/%Y') as DiaReserva from ReservaEstado inner join Parque inner join Reserva inner join User where Reserva.Parque_ID = ParqueID AND REID = RE_ID AND Reserva.User_ID = UserID AND UserID = " + userID + ";";
        let reservas = await pool.query(sql);
        return { status: 200, data: reservas };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.getParqueIDReservasDia = async function () {
    try {
        let sql = "select ReservaID, Parque_ID from Reserva where DiaReserva = CURDATE() AND RE_ID = 5;";
        let reservas = await pool.query(sql);
        return { status: 200, data: reservas };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.usarReserva = async function (codigo) {
    try {
        //codigo da base de dados q responde a esta query: 83L3XCAJ7
        let sql = "UPDATE Reserva SET RE_ID=4 WHERE Codigo= ? AND RE_ID = 2;";
        let result = await pool.query(sql, codigo);
        console.log(JSON.stringify(result));
        return { status: 200, data: result};
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}