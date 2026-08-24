package com.desafiorh.backend.repository;

import com.desafiorh.backend.model.Funcionario;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
@Repository
public class FuncionarioRepository {
    ArrayList<Funcionario> funcionarios = new ArrayList<>();
    Integer contador = 0;

    public void salvar(Funcionario funcionario) {
        funcionarios.add(funcionario);
    }
    public ArrayList<Funcionario> listar() {
        return funcionarios;
    }

    public Integer geradorId() {
        Integer id = contador + 1;
        this.contador = id;
        return id;
    }
}
