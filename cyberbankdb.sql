CREATE DATABASE cyberbankdb;
USE cyberbankdb;

CREATE TABLE userdata (
	userID INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nome VARCHAR(50) NOT NULL,
    CPF INT(11) NOT NULL,
    senha INT(6) NOT NULL,
    saldo DOUBLE NOT NULL,
    saldoCheque DOUBLE NOT NULL,
    UNIQUE (userID, CPF)
    );

CREATE TABLE transacao (
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    tipo ENUM("deposito", "saque", "transferencia") NOT NULL,
    data_t DATE NOT NULL,
    valor DOUBLE NOT NULL
) Engine=InnoDB;

CREATE TABLE transferencia (
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    transacao_id INT NOT NULL,
    remetente INT NOT NULL,
    destinatario INT NOT NULL,
    FOREIGN KEY (`transacao_id`) REFERENCES transacao (`id`)
    );
    
    SELECT * FROM userdata;
    SELECT * FROM transacao;
    SELECT * FROM transferencia;
    
