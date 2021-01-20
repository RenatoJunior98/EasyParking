var pool = require("./DBConn");

module.exports.verificarLogin = async function (username, pass) {
    try {
        let sql = "select userID, nome from User where Username = \"" + username + "\" and Pass = \"" + pass + "\";";
        let login = await pool.query(sql);
        return { status: 200, data: login };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.verificarUsername = async function (username) {
    try {
        let sql = "select userID from User where Username = \"" + username + "\";";
        let login = await pool.query(sql);
        console.log(JSON.stringify(login));
        return { status: 200, data: login };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}


module.exports.save = async function (user) {
    try {
        let sql = "insert into User (Username, Pass, Nome) values (?,?,?);";
        let result = await pool.query(sql, [user.username, user.pass, user.nome]);
        return { status: 200, data: result };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}