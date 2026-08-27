import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ConfirmacaoExclusao from '../components/ConfirmacaoExclusao'
import {
  deletarFuncionario,
  listarFuncionarios,
} from '../services/funcionarioService'
import type { Funcionario } from '../types/Funcionario'
import './FuncionariosPage.css'

function FuncionariosPage() {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')
  const [busca, setBusca] = useState('')
  const [funcionarioParaExcluir, setFuncionarioParaExcluir] =
    useState<Funcionario | null>(null)
  const [excluindo, setExcluindo] = useState(false)
  const [erroExclusao, setErroExclusao] = useState('')

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

  function abrirConfirmacaoExclusao(funcionario: Funcionario) {
    setFuncionarioParaExcluir(funcionario)
    setErroExclusao('')
  }

  function fecharConfirmacaoExclusao() {
    if (excluindo) {
      return
    }

    setFuncionarioParaExcluir(null)
    setErroExclusao('')
  }

  async function confirmarExclusao() {
    if (!funcionarioParaExcluir) {
      return
    }

    try {
      setExcluindo(true)
      setErroExclusao('')
      await deletarFuncionario(funcionarioParaExcluir.id)

      setFuncionarios((listaAtual) =>
        listaAtual.filter(
          (funcionario) => funcionario.id !== funcionarioParaExcluir.id,
        ),
      )

      setFuncionarioParaExcluir(null)
    } catch (error) {
      setErroExclusao(
        error instanceof Error
          ? error.message
          : 'Não foi possível excluir o funcionário',
      )
    } finally {
      setExcluindo(false)
    }
  }

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

          <Link to="/funcionarios/novo" className="botao-adicionar">
            + Adicionar
          </Link>
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
                      <Link
                        to={`/funcionarios/${funcionario.id}`}
                        className="botao-acao"
                      >
                        Visualizar
                      </Link>

                      <button
                        type="button"
                        className="botao-acao botao-excluir"
                        onClick={() => abrirConfirmacaoExclusao(funcionario)}
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

      <ConfirmacaoExclusao
        funcionario={funcionarioParaExcluir}
        excluindo={excluindo}
        erro={erroExclusao}
        onCancelar={fecharConfirmacaoExclusao}
        onConfirmar={confirmarExclusao}
      />
    </main>
  )
}

export default FuncionariosPage
