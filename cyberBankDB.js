export function ConnectionDB(mysql) {

    const connection =  mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        port: 3306,
        database: 'cyberbankdb'
    })

    connection.connect(function(err) {
        if(err){
            console.error('Erro ao conectar banco de dados: ', err.stack);
            return;
        }
        console.log('Conexão feita! ID do banco de dados: ', connection.threadId);
    });

    return connection;
}