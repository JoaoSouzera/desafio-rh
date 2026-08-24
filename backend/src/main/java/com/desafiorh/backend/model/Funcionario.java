package com.desafiorh.backend.model;

import com.desafiorh.backend.enums.StatusFuncionario;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Funcionario {
    private Integer id;
    private String nome;
    private String email;
    private String telefone;
    private String cargo;
    private String departamento;
    private double salario;
    private String cidade;
    private StatusFuncionario status;
}
