import type { Funcionario } from '../types/Funcionario'
import './ConfirmacaoExclusao.css'

interface ConfirmacaoExclusaoProps {
  funcionario: Funcionario | null
  excluindo: boolean
  erro: string
  onCancelar: () => void
  onConfirmar: () => void
}

function ConfirmacaoExclusao({
  funcionario,
  excluindo,
  erro,
  onCancelar,
  onConfirmar,
}: ConfirmacaoExclusaoProps) {
  if (!funcionario) {
    return null
  }

  return (
    <div className="modal-fundo">
      <section
        className="modal-confirmacao"
        role="dialog"
        aria-modal="true"
        aria-labelledby="titulo-exclusao"
        aria-describedby="descricao-exclusao"
      >
        <p className="modal-etapa">Confirmação</p>
        <h2 id="titulo-exclusao">Excluir funcionário</h2>

        <p id="descricao-exclusao">
          Tem certeza que deseja excluir <strong>{funcionario.nome}</strong>?
        </p>
        <p className="modal-aviso">Essa ação não poderá ser desfeita.</p>

        {erro && (
          <p className="modal-erro" role="alert">
            {erro}
          </p>
        )}

        <div className="modal-acoes">
          <button
            type="button"
            className="modal-botao modal-botao-cancelar"
            onClick={onCancelar}
            disabled={excluindo}
          >
            Cancelar
          </button>

          <button
            type="button"
            className="modal-botao modal-botao-excluir"
            onClick={onConfirmar}
            disabled={excluindo}
          >
            {excluindo ? 'Excluindo...' : 'Sim, excluir'}
          </button>
        </div>
      </section>
    </div>
  )
}

export default ConfirmacaoExclusao
