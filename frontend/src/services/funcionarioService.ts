const API_URL = "http://localhost:8080/funcionarios";

import type { Funcionario } from "../types/Funcionario";

export async function listarFuncionarios(): Promise<Funcionario[]> {
    const response = await fetch(API_URL);
    const dados = await response.json();
    return dados;    
}