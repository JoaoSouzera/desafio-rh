package com.desafiorh.backend.controller;

import com.desafiorh.backend.dto.request.FuncionarioRequestDTO;
import com.desafiorh.backend.dto.response.FuncionarioResponseDTO;
import com.desafiorh.backend.service.FuncionarioService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/funcionario")
@RequiredArgsConstructor
public class FuncionarioController {
    private final FuncionarioService service;

    @PostMapping
    public FuncionarioResponseDTO criar(@RequestBody @Valid FuncionarioRequestDTO funcionarioRequestDTO) {
        return service.criar(funcionarioRequestDTO);
    }
}
