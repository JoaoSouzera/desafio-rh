# Desafio RH - Sistema de Contratação de Funcionários

[![Java](https://img.shields.io/badge/Java-21-ED8B00?logo=openjdk&logoColor=white)](https://www.java.com/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-4.1.1-6DB33F?logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Sistema web para apoiar o setor de Recursos Humanos no gerenciamento de candidatos durante um processo de contratação. O projeto transforma uma API inicialmente operada por clientes HTTP em uma aplicação com back-end Spring Boot e front-end React.

## Contexto

O desafio propõe um CRUD completo de funcionários com os métodos `POST`, `GET`, `PUT`, `PATCH` e `DELETE`. Nesta etapa, os dados permanecem em memória por meio de uma `ArrayList`, sem banco de dados.

## Status

- Back-end: API REST e operações CRUD implementadas.
- Front-end: estrutura React com TypeScript criada; interface e integração com a API em desenvolvimento.

## Destaques técnicos

- Arquitetura em camadas com controller, service, repository e mapper.
- DTOs distintos para criação, atualização parcial e resposta.
- Validação dos campos obrigatórios com Jakarta Validation.
- Tratamento de recursos inexistentes com resposta HTTP `404`.
- Modelo de status tipado com `enum`.
- Persistência temporária em memória, conforme o escopo do desafio.

## Tecnologias

**Back-end:** Java 21, Spring Boot, Spring MVC, Maven, Lombok e Jakarta Validation.

**Front-end:** React, TypeScript, Vite e ESLint.

## Arquitetura

```text
React + TypeScript
        |
        | HTTP/JSON
        v
Spring REST Controller
        | DTOs + Mapper
        v
Service -> Repository -> ArrayList<Funcionario>
```

## Endpoints

| Método | Endpoint | Descrição |
| --- | --- | --- |
| `POST` | `/funcionarios` | Cadastra um funcionário |
| `GET` | `/funcionarios` | Lista todos os funcionários |
| `GET` | `/funcionarios/{id}` | Consulta um funcionário por ID |
| `PUT` | `/funcionarios/{id}` | Substitui todos os dados do funcionário |
| `PATCH` | `/funcionarios/{id}` | Atualiza somente os campos enviados |
| `DELETE` | `/funcionarios/{id}` | Exclui um funcionário |

Os status aceitos são `EM_ANALISE`, `APROVADO`, `REPROVADO` e `CONTRATADO`.

### Exemplo de requisição

```bash
curl -X POST http://localhost:8080/funcionarios \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Ana Silva",
    "email": "ana.silva@email.com",
    "telefone": "11999999999",
    "cargo": "Desenvolvedora Java",
    "departamento": "Tecnologia",
    "salario": 6500.00,
    "cidade": "São Paulo",
    "status": "EM_ANALISE"
  }'
```

## Como executar

### Pré-requisitos

- Java 21
- Node.js `20.19+`, `22.13+` ou `24+`
- npm

### Back-end

```bash
cd backend
./mvnw spring-boot:run
```

A API ficará disponível em `http://localhost:8080`.

No Windows PowerShell, utilize:

```powershell
.\mvnw.cmd spring-boot:run
```

### Front-end

```bash
cd frontend
npm install
npm run dev
```

O Vite informará o endereço local da aplicação no terminal.

## Estrutura do projeto

```text
desafio-rh/
|-- backend/
|   |-- src/main/java/com/desafiorh/backend/
|   |   |-- controller/
|   |   |-- dto/
|   |   |-- enums/
|   |   |-- mapper/
|   |   |-- model/
|   |   |-- repository/
|   |   `-- service/
|   `-- pom.xml
|-- frontend/
|   |-- src/
|   `-- package.json
|-- LICENSE
`-- README.md
```

## Integrantes do Grupo
Desenvolvido por [João Souza](https://www.linkedin.com/in/joao-asouza/), [Fernanda Nagata](https://www.linkedin.com/in/fernanda-n-51a8a93b3/), [Ana Blefari](https://www.linkedin.com/in/ana-clara-blefari-2317b4409/).

## Licença

Distribuído sob a licença MIT. Consulte [LICENSE](LICENSE).