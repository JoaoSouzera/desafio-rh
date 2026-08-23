package com.desafiorh.backend.mapper;

import com.desafiorh.backend.dto.request.FuncionarioRequestDTO;
import com.desafiorh.backend.dto.response.FuncionarioResponseDTO;
import com.desafiorh.backend.model.Funcionario;
import org.springframework.stereotype.Component;

@Component
public class FuncionarioMapper {
    public Funcionario toFuncionario(FuncionarioRequestDTO funcionarioRequestDTO) {
        Funcionario funcionario = new Funcionario();

        funcionario.setNome(funcionarioRequestDTO.nome());
        funcionario.setEmail(funcionarioRequestDTO.email());
        funcionario.setTelefone(funcionarioRequestDTO.telefone());
        funcionario.setCargo(funcionarioRequestDTO.cargo());
        funcionario.setDepartamento(funcionarioRequestDTO.departamento());
        funcionario.setSalario(funcionarioRequestDTO.salario());
        funcionario.setCidade(funcionarioRequestDTO.cidade());
        funcionario.setStatus(funcionarioRequestDTO.status());

        return funcionario;
    }

    public FuncionarioResponseDTO toFuncionarioResponseDTO(Funcionario funcionario) {
        return new FuncionarioResponseDTO(
            funcionario.getId(),
            funcionario.getNome(),
            funcionario.getEmail(),
            funcionario.getTelefone(),
            funcionario.getCargo(),
            funcionario.getDepartamento(),
            funcionario.getSalario(),
            funcionario.getCidade(),
            funcionario.getStatus()
        );
    }
}
