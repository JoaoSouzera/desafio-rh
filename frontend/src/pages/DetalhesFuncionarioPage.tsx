import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { buscarFuncionarioPorId } from '../services/funcionarioService'
import type { Funcionario } from '../types/Funcionario'
import './PaginaSecundaria.css'

function DetalhesFuncionarioPage() {
  const { id } = useParams()
  const [funcionario, setFuncionario] = useState<Funcionario | null>(null)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  useEffect(() => {
    async function carregarFuncionario() {
      const funcionarioId = Number(id)

      if (!Number.isInteger(funcionarioId) || funcionarioId <= 0) {
        setErro('ID de funcionário inválido')
        setCarregando(false)
        return
      }

      try {
        setCarregando(true)
        setErro('')
        const dados = await buscarFuncionarioPorId(funcionarioId)
        setFuncionario(dados)
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
  }, [id])

  return (
    <main className="pagina-secundaria">
      <Link to="/funcionarios" className="link-voltar">
        ← Voltar para funcionários
      </Link>

      {carregando && <p className="mensagem-pagina">Carregando funcionário...</p>}

      {erro && <p className="mensagem-pagina mensagem-pagina-erro">{erro}</p>}

      {!carregando && !erro && funcionario && (
        <section className="pagina-secundaria-card">
          <p className="pagina-secundaria-etapa">Funcionário #{funcionario.id}</p>
          <div className="detalhes-cabecalho">
            <h1>{funcionario.nome}</h1>

            <div className="detalhes-acoes">
              <Link
                to={`/funcionarios/${funcionario.id}/editar`}
                className="botao-secundario"
              >
                Edição completa
              </Link>

              <Link
                to={`/funcionarios/${funcionario.id}/editar-parcial`}
                className="botao-principal"
              >
                Atualização parcial
              </Link>
            </div>
          </div>

          <dl className="detalhes-funcionario">
            <div>
              <dt>E-mail</dt>
              <dd>{funcionario.email}</dd>
            </div>
            <div>
              <dt>Telefone</dt>
              <dd>{funcionario.telefone || 'Não informado'}</dd>
            </div>
            <div>
              <dt>Cargo</dt>
              <dd>{funcionario.cargo}</dd>
            </div>
            <div>
              <dt>Departamento</dt>
              <dd>{funcionario.departamento || 'Não informado'}</dd>
            </div>
            <div>
              <dt>Cidade</dt>
              <dd>{funcionario.cidade || 'Não informada'}</dd>
            </div>
            <div>
              <dt>Salário</dt>
              <dd>
                {funcionario.salario.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>{funcionario.status}</dd>
            </div>
          </dl>
        </section>
      )}
    </main>
  )
}

export default DetalhesFuncionarioPage
