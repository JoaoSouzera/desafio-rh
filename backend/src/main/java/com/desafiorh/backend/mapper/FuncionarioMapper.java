package com.desafiorh.backend.mapper;

import com.desafiorh.backend.dto.request.FuncionarioRequestDTO;
import com.desafiorh.backend.model.Funcionario;
import org.springframework.stereotype.Component;

@Component
public class FuncionarioMapper {
    public Funcionario toFuncionario(FuncionarioRequestDTO funcionarioRequestDTO) {
        Funcionario funcionario = new Funcionario();

    }
}
