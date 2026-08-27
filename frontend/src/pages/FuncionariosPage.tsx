import { useEffect, useState } from 'react'
import { listarFuncionarios } from '../services/funcionarioService'
import type { Funcionario } from '../types/Funcionario'
import './FuncionariosPage.css'

function FuncionariosPage() {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')
  const [busca, setBusca] = useState('')

  useEffect(() => {
    async function carregarFuncionarios() {
      try {
        setCarregando(true)
        setErro('')

        const dados = await listarFuncionarios()
        setFuncionarios(dados)
      } catch (error) {
        if (error instanceof Error) {
          setErro(error.message)
        } else {
          setErro('Não foi possível carregar os funcionários')
        }
      } finally {
        setCarregando(false)
      }
    }

    void carregarFuncionarios()
  }, [])

  const termoBusca = busca.trim().toLocaleLowerCase('pt-BR')

  const funcionariosFiltrados = funcionarios.filter((funcionario) =>
    funcionario.nome.toLocaleLowerCase('pt-BR').includes(termoBusca),
  )

  const emAnalise = funcionarios.filter(
    (funcionario) => funcionario.status === 'EM_ANALISE',
  ).length

  const aprovados = funcionarios.filter(
    (funcionario) => funcionario.status === 'APROVADO',
  ).length

  const reprovados = funcionarios.filter(
    (funcionario) => funcionario.status === 'REPROVADO',
  ).length

  const contratados = funcionarios.filter(
    (funcionario) => funcionario.status === 'CONTRATADO',
  ).length

  if (carregando) {
    return <p className="mensagem-estado">Carregando funcionários...</p>
  }

  if (erro) {
    return <p className="mensagem-estado mensagem-erro">{erro}</p>
  }

  return (
    <main className="funcionarios-page">
      <header className="cabecalho">
        <div className="marca">
          <strong className="marca-logo">PicPay</strong>
          <span className="marca-subtitulo">Recursos Humanos</span>
        </div>

        <div className="campo-busca">
          <span aria-hidden="true">⌕</span>

          <input
            type="search"
            placeholder="Buscar por nome..."
            aria-label="Buscar funcionário por nome"
            value={busca}
            onChange={(evento) => setBusca(evento.target.value)}
          />
        </div>
      </header>

      <section className="funcionarios-conteudo">
        <div className="titulo-acoes">
          <h1 className="funcionarios-titulo">Funcionários</h1>

          <button type="button" className="botao-adicionar">
            + Adicionar
          </button>
        </div>

        <div className="indicadores">
          <span>
            Total de candidatos: <strong>{funcionarios.length}</strong>
          </span>

          <span>
            Em análise: <strong>{emAnalise}</strong>
          </span>

          <span>
            Aprovados: <strong>{aprovados}</strong>
          </span>

          <span>
            Reprovados: <strong>{reprovados}</strong>
          </span>

          <span>
            Contratados: <strong>{contratados}</strong>
          </span>
        </div>

        {funcionarios.length === 0 ? (
          <p className="mensagem-estado">Nenhum funcionário cadastrado.</p>
        ) : funcionariosFiltrados.length === 0 ? (
          <p className="mensagem-estado">
            Nenhum funcionário encontrado para “{busca}”.
          </p>
        ) : (
          <div className="tabela-container">
            <table className="funcionarios-tabela">
              <thead>
                <tr>
                  <th scope="col">Nome completo</th>
                  <th scope="col">E-mail</th>
                  <th scope="col">Cargo</th>
                  <th scope="col">Departamento</th>
                  <th scope="col">Status</th>
                  <th scope="col">Ações</th>
                </tr>
              </thead>

              <tbody>
                {funcionariosFiltrados.map((funcionario) => (
                  <tr key={funcionario.id}>
                    <td>{funcionario.nome}</td>
                    <td>{funcionario.email}</td>
                    <td>{funcionario.cargo}</td>
                    <td>{funcionario.departamento}</td>
                    <td>{funcionario.status}</td>

                    <td className="acoes">
                      <button type="button" className="botao-acao">
                        Visualizar
                      </button>

                      <button
                        type="button"
                        className="botao-acao botao-excluir"
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  )
}

export default FuncionariosPage
