package com.desafiorh.backend.dto.request;

import jakarta.validation.constraints.NotBlank;

public record FuncionarioRequestDTO(
        @NotBlank(message = "O nome é obrigatório")
        String nome,
        @NotBlank(message = "O email é obrigatório")
        String email,
        String telefone,
        @NotBlank(message = "O cargo é obrigatório")
        String cargo,
        String departamento,
        double salario,
        String cidade
) {
}
