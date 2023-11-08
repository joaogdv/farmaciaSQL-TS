"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var mariadb = require("mariadb");
const banco = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 5000,
    database: 'farmacia',
    waitForConnections: true,
    connectionLimit: 10
});
function criarBancoETabelas() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield banco.execute("CREATE DATABASE IF NOT EXISTS farmacia;");
            yield banco.execute(`
            CREATE TABLE IF NOT EXISTS medicamentos (
                id_medicamento INT AUTO_INCREMENT PRIMARY KEY,
                nome VARCHAR(50) NOT NULL,
                preco INT NOT NULL,
                estoque INT NOT NULL
            );
        `);
            yield banco.execute(`
            CREATE TABLE IF NOT EXISTS usuarios (
                id_usuario INT AUTO_INCREMENT PRIMARY KEY,
                nome VARCHAR(50) NOT NULL,
                endereco VARCHAR(50) NOT NULL
            );
        `);
            yield banco.execute(`
            CREATE TABLE IF NOT EXISTS sistemafarmacia (
                id_farmacia INT AUTO_INCREMENT PRIMARY KEY,
                id_medicamento INT NOT NULL,
                id_usuario INT NOT NULL,
                FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
                FOREIGN KEY (id_livro) REFERENCES livros(id_livro)
            );
        `);
            console.log('Banco de dados e tabelas criados com sucesso.');
        }
        catch (err) {
            console.error('Erro ao criar o banco de dados e tabelas:', err);
        }
    });
}
criarBancoETabelas();
