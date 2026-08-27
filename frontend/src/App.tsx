import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import CadastroFuncionarioPage from './pages/CadastroFuncionarioPage'
import DetalhesFuncionarioPage from './pages/DetalhesFuncionarioPage'
import FuncionariosPage from './pages/FuncionariosPage'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/funcionarios" replace />} />
        <Route path="/funcionarios" element={<FuncionariosPage />} />
        <Route path="/funcionarios/novo" element={<CadastroFuncionarioPage />} />
        <Route path="/funcionarios/:id" element={<DetalhesFuncionarioPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
