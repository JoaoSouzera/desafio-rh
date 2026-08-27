import { useEffect, useState, type FormEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  atualizarFuncionarioCompleto,
  atualizarFuncionarioParcial,
  buscarFuncionarioPorId,
} from '../services/funcionarioService'
import type {
  Funcionario,
  FuncionarioPatchRequest,
  FuncionarioRequest,
  StatusFuncionario,
} from '../types/Funcionario'
import './PaginaSecundaria.css'

interface EditarFuncionarioPageProps {
  modo: 'completo' | 'parcial'
}

function EditarFuncionarioPage({ modo }: EditarFuncionarioPageProps) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [funcionarioOriginal, setFuncionarioOriginal] =
    useState<Funcionario | null>(null)
  const [formulario, setFormulario] = useState<FuncionarioRequest | null>(null)
  const [carregando, setCarregando] = useState(true)
  const [salvando, setSalvando] = useState(false)
  const [erro, setErro] = useState('')

  const funcionarioId = Number(id)
  const edicaoCompleta = modo === 'completo'

  useEffect(() => {
    async function carregarFuncionario() {
      if (!Number.isInteger(funcionarioId) || funcionarioId <= 0) {
        setErro('ID de funcionário inválido')
        setCarregando(false)
        return
      }

      try {
        setCarregando(true)
        setErro('')
        const dados = await buscarFuncionarioPorId(funcionarioId)
        const { id: _id, ...dadosFormulario } = dados

        setFuncionarioOriginal(dados)
        setFormulario(dadosFormulario)
      } catch (error) {
        setErro(
          error instanceof Error
            ? error.message
            : 'Não foi possível carregar o funcionário',
        )
      } finally {
        setCarregando(false)
      }
    }

    void carregarFuncionario()
  }, [funcionarioId])

  function atualizarCampo(
    campo: keyof FuncionarioRequest,
    valor: string | number,
  ) {
    setFormulario((formularioAtual) =>
      formularioAtual
        ? {
            ...formularioAtual,
            [campo]: valor,
          }
        : formularioAtual,
    )
  }

  async function salvarEdicao(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()

    if (!formulario || !funcionarioOriginal) {
      return
    }

    try {
      setSalvando(true)
      setErro('')

      if (edicaoCompleta) {
        await atualizarFuncionarioCompleto(funcionarioId, formulario)
      } else {
        const alteracoes: FuncionarioPatchRequest = {}

        if (formulario.cargo !== funcionarioOriginal.cargo) {
          alteracoes.cargo = formulario.cargo
        }

        if (formulario.salario !== funcionarioOriginal.salario) {
          alteracoes.salario = formulario.salario
        }

        if (formulario.status !== funcionarioOriginal.status) {
          alteracoes.status = formulario.status
        }

        if (Object.keys(alteracoes).length === 0) {
          setErro('Altere pelo menos um campo antes de salvar')
          return
        }

        await atualizarFuncionarioParcial(funcionarioId, alteracoes)
      }

      navigate(`/funcionarios/${funcionarioId}`)
    } catch (error) {
      setErro(
        error instanceof Error
          ? error.message
          : 'Não foi possível atualizar o funcionário',
      )
    } finally {
      setSalvando(false)
    }
  }

  return (
    <main className="pagina-secundaria">
      <Link to={`/funcionarios/${id}`} className="link-voltar">
        ← Voltar para os detalhes
      </Link>

      {carregando && <p className="mensagem-pagina">Carregando funcionário...</p>}

      {!carregando && formulario && (
        <section className="pagina-secundaria-card">
          <p className="pagina-secundaria-etapa">
            {edicaoCompleta ? 'PUT - edição completa' : 'PATCH - atualização parcial'}
          </p>
          <h1>
            {edicaoCompleta ? 'Editar funcionário' : 'Atualização rápida'}
          </h1>

          <p className="edicao-explicacao">
            {edicaoCompleta
              ? 'Todos os dados editáveis serão enviados ao backend.'
              : 'Somente cargo, salário ou status alterados serão enviados.'}
          </p>

          {erro && <p className="formulario-erro">{erro}</p>}

          <form className="formulario-funcionario" onSubmit={salvarEdicao}>
            {edicaoCompleta && (
              <>
                <label>
                  Nome completo <span aria-hidden="true">*</span>
                  <input
                    type="text"
                    value={formulario.nome}
                    onChange={(evento) =>
                      atualizarCampo('nome', evento.target.value)
                    }
                    required
                  />
                </label>

                <label>
                  E-mail <span aria-hidden="true">*</span>
                  <input
                    type="email"
                    value={formulario.email}
                    onChange={(evento) =>
                      atualizarCampo('email', evento.target.value)
                    }
                    required
                  />
                </label>

                <label>
                  Telefone
                  <input
                    type="tel"
                    value={formulario.telefone}
                    onChange={(evento) =>
                      atualizarCampo('telefone', evento.target.value)
                    }
                  />
                </label>
              </>
            )}

            <label>
              Cargo {edicaoCompleta && <span aria-hidden="true">*</span>}
              <input
                type="text"
                value={formulario.cargo}
                onChange={(evento) => atualizarCampo('cargo', evento.target.value)}
                required={edicaoCompleta}
              />
            </label>

            {edicaoCompleta && (
              <>
                <label>
                  Departamento
                  <input
                    type="text"
                    value={formulario.departamento}
                    onChange={(evento) =>
                      atualizarCampo('departamento', evento.target.value)
                    }
                  />
                </label>

                <label>
                  Cidade
                  <input
                    type="text"
                    value={formulario.cidade}
                    onChange={(evento) =>
                      atualizarCampo('cidade', evento.target.value)
                    }
                  />
                </label>
              </>
            )}

            <label>
              Salário
              <input
                type="number"
                min="0"
                step="0.01"
                value={formulario.salario}
                onChange={(evento) =>
                  atualizarCampo('salario', Number(evento.target.value))
                }
              />
            </label>

            <label>
              Status
              <select
                value={formulario.status}
                onChange={(evento) =>
                  atualizarCampo(
                    'status',
                    evento.target.value as StatusFuncionario,
                  )
                }
              >
                <option value="EM_ANALISE">Em análise</option>
                <option value="APROVADO">Aprovado</option>
                <option value="REPROVADO">Reprovado</option>
                <option value="CONTRATADO">Contratado</option>
              </select>
            </label>

            <div className="formulario-acoes">
              <Link
                to={`/funcionarios/${funcionarioId}`}
                className="botao-secundario"
              >
                Cancelar
              </Link>

              <button
                type="submit"
                className="botao-principal"
                disabled={salvando}
              >
                {salvando ? 'Salvando...' : 'Salvar alterações'}
              </button>
            </div>
          </form>
        </section>
      )}

      {!carregando && erro && !formulario && (
        <p className="mensagem-pagina mensagem-pagina-erro">{erro}</p>
      )}
    </main>
  )
}

export default EditarFuncionarioPage
