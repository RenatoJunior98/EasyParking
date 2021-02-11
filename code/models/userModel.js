var pool = require("./DBConn");

module.exports.login = async function (user) {
    try {
        let sql = "select userID, nome from User where Username = \"" + user.username + "\" and Pass = \"" + user.pass + "\";";
        let login = await pool.query(sql);
        return { status: 200, data: login };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}


module.exports.newUser = async function (user) {
    try {
        let sqlUsername = "select userID from User where Username = ?;";
        let userID = await pool.query(sqlUsername, user.username);
        if (userID.length == 0) {
            let sql = "insert into User (Username, Pass, Nome) values (?,?,?);";
            let result = await pool.query(sql, [user.username, user.pass, user.nome]);
            return { status: 200, data: result };
        }
        else
            return null;
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}