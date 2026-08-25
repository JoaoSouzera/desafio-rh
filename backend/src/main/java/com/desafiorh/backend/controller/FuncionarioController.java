package com.desafiorh.backend.controller;

import com.desafiorh.backend.dto.request.FuncionarioRequestDTO;
import com.desafiorh.backend.dto.response.FuncionarioResponseDTO;
import com.desafiorh.backend.service.FuncionarioService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/funcionarios")
@RequiredArgsConstructor
public class FuncionarioController {
    private final FuncionarioService service;

    @PostMapping
    public FuncionarioResponseDTO criar(@RequestBody @Valid FuncionarioRequestDTO funcionarioRequestDTO) {
        return service.criar(funcionarioRequestDTO);
    }
    @GetMapping
    public List<FuncionarioResponseDTO> listar() {
        return service.listar();
    }
    @GetMapping("/{id}")
    public FuncionarioResponseDTO pegarPorId(@PathVariable Integer id) {
        return service.pegarPorId(id);
    }
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletar(@PathVariable Integer id) {
        service.deletar(id);
    }
}
