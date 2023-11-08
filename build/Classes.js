"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Farmacia = void 0;
const leitor = __importStar(require("readline-sync"));
const db_1 = __importDefault(require("./db"));
class Medicamento {
    constructor(nome, qtd, preco) {
        this.nome = nome;
        this.qtd = qtd;
        this.preco = preco;
    }
}
class Farmacia {
    constructor() {
        this.medicamentos = [];
    }
    adicionarMedicamento() {
        return __awaiter(this, void 0, void 0, function* () {
            let nome = leitor.question("Informe o nome do novo medicamento: ");
            let qtd = parseFloat(leitor.question("Informe a quantidade do novo medicamento: "));
            let preco = parseFloat(leitor.question("Informe o preço do novo medicamento: "));
            let medicamento = new Medicamento(nome, qtd, preco);
            this.medicamentos.push(medicamento);
            yield this.criarMedicamentoBanco(medicamento);
            console.log(`Foi adicionado ao estoque: ${qtd} de ${nome}`);
        });
    }
    criarMedicamentoBanco(medicamento) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield executeDatabaseQuery(`INSERT INTO medicamentos (nome, qtd, preco) VALUES (?, ?, ?)`, [medicamento.nome, medicamento.qtd, medicamento.preco]);
                console.log(`Medicamento ${medicamento.nome} inserido no BD com sucesso!`);
            }
            catch (err) {
                console.log('Erro: ', err);
            }
        });
    }
    deletarMedicamento() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.medicamentosBanco();
            let id_medicamento = leitor.questionInt("Informe o ID do medicamento a ser deletado: ");
            try {
                yield executeDatabaseQuery("DELETE FROM medicamentos WHERE id_medicamento = ?", [id_medicamento]);
                console.log(`Medicamento deletado com sucesso`);
            }
            catch (err) {
                console.log(`Erro: `, err);
            }
        });
    }
    visualizarEstoque() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const medicamentos = yield this.medicamentosBanco();
                console.log("Medicamentos disponíveis no estoque:");
                medicamentos.forEach(({ nome, qtd, preco }) => {
                    console.log(`${nome} - Quantidade: ${qtd} - Preço: R$ ${preco}`);
                });
            }
            catch (err) {
                console.log('Erro: ', err);
            }
        });
    }
    medicamentosBanco() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const medicamentos = yield executeDatabaseQuery("SELECT * FROM medicamentos", []);
                return medicamentos;
            }
            catch (err) {
                console.log('Erro: ', err);
                return [];
            }
        });
    }
}
exports.Farmacia = Farmacia;
function executeDatabaseQuery(query, params) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield db_1.default.execute(query, params);
            return result;
        }
        catch (err) {
            console.error('Erro na execução da consulta', err);
            throw err;
        }
    });
}
