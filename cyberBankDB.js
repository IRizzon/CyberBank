console.log("Script esta rodando!")

export async function ConnectionDB(mysql) {

    console.log("Função iniciada")
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            port: 3306,
            database: 'cyberbankdb'
        });

        connection.connect((err) => {
            if (err) {
                console.error('Erro ao conectar banco de dados:', err.stack);
                reject(err);
                return;
            }
            console.log('Conexão feita! ID do banco de dados:', connection.threadId);
            resolve(connection);
        });
    });
}