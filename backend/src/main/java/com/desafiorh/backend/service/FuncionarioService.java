package com.desafiorh.backend.service;

import com.desafiorh.backend.dto.request.FuncionarioRequestDTO;
import com.desafiorh.backend.dto.response.FuncionarioResponseDTO;
import com.desafiorh.backend.model.Funcionario;
import com.desafiorh.backend.repository.FuncionarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FuncionarioService {
    private final FuncionarioRepository repository;

    public FuncionarioResponseDTO criar(FuncionarioRequestDTO funcionarioRequestDTO){

    }
}
