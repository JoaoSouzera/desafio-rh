package com.desafiorh.backend.dto.request;

import com.desafiorh.backend.enums.StatusFuncionario;

public record FuncionarioPatchDTO(
        String nome,
        String email,
        String telefone,
        String cargo,
        String departamento,
        Double salario,
        String cidade,
        StatusFuncionario status
) {
}