# e-Gest - Back-end

<img src="./public/images/home.png" alt="Homepage" width="600"/>

**e-Gest - Back-end** é a parte de servidor do sistema de gestão voltado para o gerenciamento eficiente de pessoas e endereços. Este repositório contém a API que gerencia a lógica de negócios, manipulação de dados e integração com o banco de dados MySQL.

## Funcionalidades

- **Autenticação de Usuários**: Implementa endpoints para login e registro de usuários.
- **Gestão de Usuários**: Endpoints para criar, atualizar, visualizar e excluir usuários.
- **Busca de Usuários**: Funcionalidade para buscar usuários por CPF.
- **Gerenciamento de Endereços**: Endpoints para criar, atualizar e visualizar endereços associados aos usuários.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução para JavaScript no servidor.
- **Fastify**: Framework para construção de APIs rápidas e eficientes.
- **Prisma**: ORM para interagir com o banco de dados MySQL.
- **MySQL**: Banco de dados relacional para armazenar dados do sistema.

## Configuração do Projeto

1. Clone este repositório:

   ```bash
   git clone https://github.com/Faccin27/e-gest_back-end.git
   ```

2. Navegue até o diretório do projeto:

   ```bash
   cd e-gest_back-end
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Configure as variáveis de ambiente. Crie um arquivo `.env` na raiz do projeto e adicione as configurações necessárias, como o .env.examaple presente no projeto.

5. Execute as migrações para configurar o banco de dados:

   ```bash
   npx prisma migrate deploy
   ```

6. Inicie o servidor:
   ```bash
   npm start
   ```

## Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir um PR ou relatar issues.

## Repositório do Front-end

Você pode acessar o repositório do front-end do projeto [aqui](https://github.com/Faccin27/e-gest_front-end).
