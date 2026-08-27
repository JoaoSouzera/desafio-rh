package com.desafiorh.backend.repository;

import com.desafiorh.backend.model.Funcionario;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

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

    public Funcionario pegarPorId(Integer id) {
        for (Funcionario funcionario : funcionarios) {
            if (funcionario.getId().equals(id)) {
                return funcionario;
            }
        }
        return null;
    }
    public void deletar(Funcionario funcionario) {
        funcionarios.remove(funcionario);
    }

    public List<Funcionario> buscarComFiltro(String param){
        if (param == null || param.isBlank()){
            return funcionarios;
        }
        String busca = param.trim().toLowerCase();

        return funcionarios.stream()
                .filter(funcionario ->
                        funcionario.getNome().toLowerCase().contains(param)
                                || funcionario.getCargo().toLowerCase().contains(param)
                                || funcionario.getStatus().toString().toLowerCase().contains(param)
                )
                .toList();
    }
}
