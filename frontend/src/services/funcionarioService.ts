const API_URL = "http://localhost:8080/funcionarios";

import type {
    Funcionario,
    FuncionarioPatchRequest,
    FuncionarioRequest,
} from "../types/Funcionario";

export async function listarFuncionarios(): Promise<Funcionario[]> {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Não foi possível carregar os funcionários");
    }

    const dados = await response.json();
    return dados;
}

export async function buscarFuncionarioPorId(id: number): Promise<Funcionario> {
    const response = await fetch(`${API_URL}/${id}`);

    if (!response.ok) {
        if (response.status === 404) {
            throw new Error("Funcionário não encontrado");
        }

        throw new Error("Não foi possível carregar o funcionário");
    }

    return response.json();
}

export async function cadastrarFuncionario(
    funcionario: FuncionarioRequest,
): Promise<Funcionario> {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(funcionario),
    });

    if (!response.ok) {
        throw new Error("Não foi possível cadastrar o funcionário");
    }

    return response.json();
}

export async function deletarFuncionario(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        if (response.status === 404) {
            throw new Error("Funcionário não encontrado");
        }

        throw new Error("Não foi possível excluir o funcionário");
    }
}

export async function atualizarFuncionarioCompleto(
    id: number,
    funcionario: FuncionarioRequest,
): Promise<Funcionario> {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(funcionario),
    });

    if (!response.ok) {
        if (response.status === 404) {
            throw new Error("Funcionário não encontrado");
        }

        throw new Error("Não foi possível atualizar o funcionário");
    }

    return response.json();
}

export async function atualizarFuncionarioParcial(
    id: number,
    alteracoes: FuncionarioPatchRequest,
): Promise<Funcionario> {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(alteracoes),
    });

    if (!response.ok) {
        if (response.status === 404) {
            throw new Error("Funcionário não encontrado");
        }

        throw new Error("Não foi possível atualizar o funcionário");
    }

    return response.json();
}
