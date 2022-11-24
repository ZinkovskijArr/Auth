const mysql = require('mysql2/promise');
const config = require('./config');

module.exports =  class DataBase {
    conn;
    //Подключение к БД
    async connectBD() {
        this.conn = await mysql.createConnection(config);
        console.log('Create connection in class');
    }

    async disconnectBD() {
        this.conn.end();
    }

//Получение даных из БД
    async select() {
        let [row] = await this.conn.execute('SELECT * FROM USERS');
        console.log(row);
        return row;
    }

//Поиск логина в БД
    async isExists(row, data) {
        let user = false;
        for (let i = 0; i < row.length; i++) {
            if (row[i].login == data.login) {
                console.log("Fined login");
                user = true;
            }
        }
        return user;
    }
}