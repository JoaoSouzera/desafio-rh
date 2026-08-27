export type StatusFuncionario =
  | 'EM_ANALISE'
  | 'APROVADO'
  | 'REPROVADO'
  | 'CONTRATADO'

export interface Funcionario {
  id: number
  nome: string
  email: string
  telefone: string
  cargo: string
  departamento: string
  salario: number
  cidade: string
  status: StatusFuncionario
}

export type FuncionarioRequest = Omit<Funcionario, 'id'>

export type FuncionarioPatchRequest = Partial<FuncionarioRequest>
