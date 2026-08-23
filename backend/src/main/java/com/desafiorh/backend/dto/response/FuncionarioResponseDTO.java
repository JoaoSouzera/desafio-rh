package com.desafiorh.backend.dto.response;

import com.desafiorh.backend.enums.StatusFuncionario;

public record FuncionarioResponseDTO(
    Integer id,
    String nome,
    String email,
    String telefone,
    String cargo,
    String departamento,
    double salario,
    String cidade,
    StatusFuncionario status
) {
}
