package com.desafiorh.backend.repository;

import com.desafiorh.backend.model.Funcionario;

import java.util.ArrayList;

public class FuncionarioRepository {
    ArrayList<Funcionario> funcionarios = new ArrayList<>();

    public void salvar(Funcionario funcionario) {
        funcionarios.add(funcionario);
    }
    public ArrayList<Funcionario> listar() {
        return funcionarios;
    }

}
