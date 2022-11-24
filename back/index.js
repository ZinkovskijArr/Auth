const http = require('http');
const bd = require('./bd');

// Нативная Нода
http.createServer(async function (request, response) {
    
        console.log(request.method);
        //Обработкик POST запроса
        if(request.method == 'POST') {
            console.log("Method GET")
            let data = "";
            request.on("data", chunk => {
                data += chunk.toString();
            });
            request.on("end", async () => {
                try {
                    console.log("Data pre parse " + data);
                    data = JSON.parse(data);
                    //-----Работа с БД-----
                    let dataBase = new bd();
                    await dataBase.connectBD();
                    let row = await dataBase.select();
                    if (await dataBase.isExists(row, data))
                        console.log('User find');
                     else
                        console.log('User not find');
                    await dataBase.disconnectBD();
                    //---------------------
                } catch (er) {
                    console.log(data);
                    console.log('Error: ' + er.message);
                }
                //Для дебага
                console.log(data.login);
                console.log('Done');
    
            });
            console.log(data);
        }
        // Обработкич GET запроса
        else if (request.method == 'GET')
        {
            console.log("Method GET");
        }
        // Возврат ответа с сервера
    response.setHeader("Content-Type", "application/json", "mode: 'no-cors'");
    response.end(JSON.stringify({"message": "This is a JSON response"}));
}).listen(3000);
