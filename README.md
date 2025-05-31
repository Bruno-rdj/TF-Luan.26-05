# API de Pessoas e Telefones

Trabalho Final de Desenvolvimento Web - API REST para listagem de pessoas e seus telefones relacionados.

## Funcionalidades

- Listagem de pessoas com seus telefones relacionados
- Paginação com parâmetros `limit` e `offset`
- Ordenação com parâmetro `orderBy` (id, created_at, updated_at)
- Formato de resposta REST em JSON

## Tecnologias Utilizadas

- Node.js
- Express
- Sequelize ORM
- PostgreSQL
- Docker

## Pré-requisitos

Para executar este projeto, você precisará ter instalado em seu computador:

- [Docker](https://www.docker.com/products/docker-desktop/) - Para criar e gerenciar os containers
- [Docker Compose](https://docs.docker.com/compose/install/) - Geralmente já vem com o Docker Desktop

## Como Executar

1. **Clone o repositório**
   ```
   git clone https://github.com/Bruno-rdj/TF-Luan.26-05.git

   cd TF-Luan.26-05
   ```

2. **Crie um arquivo .env na raiz do projeto**
   
   Crie um arquivo chamado `.env` na pasta principal do projeto com o seguinte conteúdo:
   ```
   PORT=8080
   NODE_PORT=3000
   POSTGRES_HOST=postgres
   POSTGRES_PORT=5432
   POSTGRES_DB=postgres
   POSTGRES_USER=postgres
   POSTGRES_PASSWORD=postgres
   ```

3. **Inicie os containers**
   ```
   docker-compose up -d
   ```
   
   O parâmetro `-d` faz com que os containers rodem em segundo plano.

4. **Verifique se os containers estão rodando**
   ```
   docker ps
   ```
   
   Você deverá ver três containers em execução: postgres, node e nginx.

5. **Acesse a API**
   
   Abra seu navegador e acesse: http://localhost:8080/api/pessoas

## Como Usar a API

### Listar todas as pessoas
```
GET http://localhost:8080/api/pessoas
```

### Limitar o número de resultados
```
GET http://localhost:8080/api/pessoas?limit=5
```
Este comando retornará apenas 5 pessoas.

### Pular alguns resultados (paginação)
```
GET http://localhost:8080/api/pessoas?offset=3
```
Este comando pula as 3 primeiras pessoas e mostra a partir da quarta.

### Combinar limit e offset para paginação
```
GET http://localhost:8080/api/pessoas?limit=2&offset=4
```
Este comando pula as 4 primeiras pessoas e mostra apenas 2 resultados (pessoas 5 e 6).

### Ordenar os resultados
```
GET http://localhost:8080/api/pessoas?orderBy=id,desc
```
Este comando ordena as pessoas pelo ID em ordem decrescente.

Outros exemplos de ordenação:
- `orderBy=id,asc` - Ordena por ID em ordem crescente (padrão) 

- `orderBy=created_at,desc` - Ordena pela data de criação, do mais recente para o mais antigo

- `orderBy=updated_at,asc` - Ordena pela data de atualização, do mais antigo para o mais recente

### Combinar todos os parâmetros
```
GET http://localhost:8080/api/pessoas?limit=3&offset=2&orderBy=id,desc
```
Este comando pula as 2 primeiras pessoas, mostra apenas 3 resultados, e ordena por ID em ordem decrescente.

## Estrutura do Projeto

- `app/` - Contém os modelos e controladores da aplicação
- `config/` - Configurações do banco de dados e constantes
- `docker/` - Arquivos de configuração do Docker
- `routes/` - Definição das rotas da API
- `bootstrap/` - Inicialização da aplicação
- `public/` - Arquivos estáticos

## Solução de Problemas

Se encontrar o erro "502 Bad Gateway":
1. Verifique se todos os containers estão rodando com `docker ps`
2. Verifique os logs do container Node.js com `docker logs [nome_do_container_node]`
3. Reinicie os containers com `docker-compose down` e depois `docker-compose up -d`