package com.desafiorh.backend.controller;

import com.desafiorh.backend.dto.request.FuncionarioPatchDTO;
import com.desafiorh.backend.dto.request.FuncionarioRequestDTO;
import com.desafiorh.backend.dto.response.FuncionarioResponseDTO;
import com.desafiorh.backend.service.FuncionarioService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import org.springframework.http.HttpStatus;

@CrossOrigin(origins = {
    "http://localhost:5173",
    "http://localhost:5174"
})

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

    @PutMapping("/{id}")
    public FuncionarioResponseDTO atualizarCompleto(
            @PathVariable Integer id,
            @RequestBody @Valid FuncionarioRequestDTO funcionarioRequestDTO) {
        return service.atualizarCompleto(id, funcionarioRequestDTO);
    }

    @PatchMapping("/{id}")
    public FuncionarioResponseDTO atualizarParcial(
            @PathVariable Integer id,
            @RequestBody FuncionarioPatchDTO patchDTO) {
        return service.atualizarParcial(id, patchDTO);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletar(@PathVariable Integer id) {
        service.deletar(id);
    }
}
