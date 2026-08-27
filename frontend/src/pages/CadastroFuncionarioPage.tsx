import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { cadastrarFuncionario } from '../services/funcionarioService'
import type {
  FuncionarioRequest,
  StatusFuncionario,
} from '../types/Funcionario'
import './PaginaSecundaria.css'

const formularioInicial: FuncionarioRequest = {
  nome: '',
  email: '',
  telefone: '',
  cargo: '',
  departamento: '',
  salario: 0,
  cidade: '',
  status: 'EM_ANALISE',
}

function CadastroFuncionarioPage() {
  const navigate = useNavigate()
  const [formulario, setFormulario] = useState<FuncionarioRequest>(formularioInicial)
  const [enviando, setEnviando] = useState(false)
  const [erro, setErro] = useState('')

  function atualizarCampo(
    campo: keyof FuncionarioRequest,
    valor: string | number,
  ) {
    setFormulario((formularioAtual) => ({
      ...formularioAtual,
      [campo]: valor,
    }))
  }

  async function enviarFormulario(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()

    try {
      setEnviando(true)
      setErro('')
      await cadastrarFuncionario(formulario)
      navigate('/funcionarios')
    } catch (error) {
      setErro(
        error instanceof Error
          ? error.message
          : 'Não foi possível cadastrar o funcionário',
      )
    } finally {
      setEnviando(false)
    }
  }

  return (
    <main className="pagina-secundaria">
      <Link to="/funcionarios" className="link-voltar">
        ← Voltar para funcionários
      </Link>

      <section className="pagina-secundaria-card">
        <p className="pagina-secundaria-etapa">Cadastro</p>
        <h1>Novo funcionário</h1>

        {erro && <p className="formulario-erro">{erro}</p>}

        <form className="formulario-funcionario" onSubmit={enviarFormulario}>
          <label>
            Nome completo <span aria-hidden="true">*</span>
            <input
              type="text"
              value={formulario.nome}
              onChange={(evento) => atualizarCampo('nome', evento.target.value)}
              required
            />
          </label>

          <label>
            E-mail <span aria-hidden="true">*</span>
            <input
              type="email"
              value={formulario.email}
              onChange={(evento) => atualizarCampo('email', evento.target.value)}
              required
            />
          </label>

          <label>
            Telefone
            <input
              type="tel"
              value={formulario.telefone}
              onChange={(evento) => atualizarCampo('telefone', evento.target.value)}
            />
          </label>

          <label>
            Cargo <span aria-hidden="true">*</span>
            <input
              type="text"
              value={formulario.cargo}
              onChange={(evento) => atualizarCampo('cargo', evento.target.value)}
              required
            />
          </label>

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
              onChange={(evento) => atualizarCampo('cidade', evento.target.value)}
            />
          </label>

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
            <Link to="/funcionarios" className="botao-secundario">
              Cancelar
            </Link>

            <button type="submit" className="botao-principal" disabled={enviando}>
              {enviando ? 'Cadastrando...' : 'Cadastrar funcionário'}
            </button>
          </div>
        </form>
      </section>
    </main>
  )
}

export default CadastroFuncionarioPage
