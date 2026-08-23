package com.desafiorh.backend.controller;

import com.desafiorh.backend.dto.request.FuncionarioRequestDTO;
import com.desafiorh.backend.dto.response.FuncionarioResponseDTO;
import com.desafiorh.backend.service.FuncionarioService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

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
}
