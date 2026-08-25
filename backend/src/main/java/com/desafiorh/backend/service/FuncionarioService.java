package com.desafiorh.backend.service;

import com.desafiorh.backend.dto.request.FuncionarioRequestDTO;
import com.desafiorh.backend.dto.response.FuncionarioResponseDTO;
import com.desafiorh.backend.mapper.FuncionarioMapper;
import com.desafiorh.backend.model.Funcionario;
import com.desafiorh.backend.repository.FuncionarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

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
    public List<FuncionarioResponseDTO> listar(){
        return repository.listar().stream().map(FuncionarioMapper::toFuncionarioResponseDTO).toList();
    }
    public FuncionarioResponseDTO pegarPorId(Integer id) {
    Funcionario funcionario = repository.pegarPorId(id);
    if (funcionario == null) {
        throw new ResponseStatusException(
                HttpStatus.NOT_FOUND,
                "Funcionário não encontrado"
        );
    }
    return FuncionarioMapper.toFuncionarioResponseDTO(funcionario);
    }
    public void deletar(Integer id) {
        Funcionario funcionario = repository.pegarPorId(id);
        if (funcionario == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Funcionário não encontrado"
            );
        }
        repository.deletar(funcionario);
    }
}
