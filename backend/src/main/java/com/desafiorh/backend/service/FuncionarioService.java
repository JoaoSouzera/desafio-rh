package com.desafiorh.backend.service;

import com.desafiorh.backend.dto.request.FuncionarioRequestDTO;
import com.desafiorh.backend.dto.response.FuncionarioResponseDTO;
import com.desafiorh.backend.mapper.FuncionarioMapper;
import com.desafiorh.backend.model.Funcionario;
import com.desafiorh.backend.repository.FuncionarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FuncionarioService {
    private final FuncionarioRepository repository;
    private final FuncionarioMapper FuncionarioMapper;

    public FuncionarioResponseDTO criar(FuncionarioRequestDTO funcionarioRequestDTO){
        Funcionario funcionario = FuncionarioMapper.toFuncionario(funcionarioRequestDTO);
        funcionario.setId(repository.geradorId());
        repository.salvar(funcionario);
        return FuncionarioMapper.toFuncionarioResponseDTO(funcionario);
    }
}
