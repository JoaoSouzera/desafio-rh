package com.desafiorh.backend.service;

import com.desafiorh.backend.dto.request.FuncionarioPatchDTO;
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

    public FuncionarioResponseDTO criar(FuncionarioRequestDTO funcionarioRequestDTO) {
        Funcionario funcionario = FuncionarioMapper.toFuncionario(funcionarioRequestDTO);
        funcionario.setId(repository.geradorId());
        repository.salvar(funcionario);
        return FuncionarioMapper.toFuncionarioResponseDTO(funcionario);
    }

    public List<FuncionarioResponseDTO> listar() {
        return repository.listar().stream().map(FuncionarioMapper::toFuncionarioResponseDTO).toList();
    }

    public List<FuncionarioResponseDTO> buscarComFiltro(String param) {
        return repository.buscarComFiltro(param).stream().map(FuncionarioMapper::toFuncionarioResponseDTO).toList();
    }

    public FuncionarioResponseDTO pegarPorId(Integer id) {
        Funcionario funcionario = repository.pegarPorId(id);
        if (funcionario == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Funcionário não encontrado");
        }
        return FuncionarioMapper.toFuncionarioResponseDTO(funcionario);
    }

    public FuncionarioResponseDTO atualizarCompleto(Integer id, FuncionarioRequestDTO funcionarioRequestDTO) {

        Funcionario funcionario = repository.pegarPorId(id);

        if (funcionario == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Funcionário não encontrado");
        }

        funcionario.setNome(funcionarioRequestDTO.nome());
        funcionario.setEmail(funcionarioRequestDTO.email());
        funcionario.setTelefone(funcionarioRequestDTO.telefone());
        funcionario.setCargo(funcionarioRequestDTO.cargo());
        funcionario.setDepartamento(funcionarioRequestDTO.departamento());
        funcionario.setSalario(funcionarioRequestDTO.salario());
        funcionario.setCidade(funcionarioRequestDTO.cidade());
        funcionario.setStatus(funcionarioRequestDTO.status());

        return FuncionarioMapper.toFuncionarioResponseDTO(funcionario);
    }

    public FuncionarioResponseDTO atualizarParcial(
            Integer id,
            FuncionarioPatchDTO patchDTO) {

        Funcionario funcionario = repository.pegarPorId(id);

        if (funcionario == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Funcionário não encontrado");
        }

        if (patchDTO.nome() != null) {
            funcionario.setNome(patchDTO.nome());
        }

        if (patchDTO.email() != null) {
            funcionario.setEmail(patchDTO.email());
        }

        if (patchDTO.telefone() != null) {
            funcionario.setTelefone(patchDTO.telefone());
        }

        if (patchDTO.cargo() != null) {
            funcionario.setCargo(patchDTO.cargo());
        }

        if (patchDTO.departamento() != null) {
            funcionario.setDepartamento(patchDTO.departamento());
        }

        if (patchDTO.salario() != null) {
            funcionario.setSalario(patchDTO.salario());
        }

        if (patchDTO.cidade() != null) {
            funcionario.setCidade(patchDTO.cidade());
        }

        if (patchDTO.status() != null) {
            funcionario.setStatus(patchDTO.status());
        }

        return FuncionarioMapper.toFuncionarioResponseDTO(funcionario);
    }

    public void deletar(Integer id) {
        Funcionario funcionario = repository.pegarPorId(id);
        if (funcionario == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Funcionário não encontrado");
        }
        repository.deletar(funcionario);
    }
}
