# Projeto Talker Manager

  Aplicação de requisito obrigatório do curso de Desenvolvimento Full-Stack da Trybe. 🚀
  <br>
  Módulo: Back-end.


## Objetivo da aplicação

  Aplicação criada para cadastro de talkers (palestrantes) aplicando boas práticas de programação, como:
    <br>
    - Código Limpo e Legível (Clean Code)
  <br>
    - Organização
  <br>
    - Performance
  </br>

## Funcionalidades

  1. Cadastrar palestrantes
  2. Visualizar palestrantes
  3. Pesquisar palestantes
  4. Editar os dados dos palestrantes
  5. Excluir informações
   
## Principais Tecnologias utilizadas

  1. Docker
  2. Node.js
  3. Express
  4. JavaScript

## Banco de dados

Neste projeto foi utilizado dois tipos de banco de dados:
1. Arquivo .json
2. Banco de dados SQL
<br>
Para acesso aos palestrantes cadastrados no arquivo .json utilizar a rota localhost:${port}/talker.
<br>
Para acesso aos palestrantes cadastrados no banco de dados SQL utilizar a rota localhost:${port}/talker/db


### Conexão com o banco de dados SQL

As definições de conexão com o banco de dados SQL podem ser verificadas no arquivo docker-compose.yaml.
<br>
Como trata-se de um projeto demonstrativo, as portas de MYSQL User e MYSQL Password para acesso ao Data Base, estão informadas também no arquivo docker-compose.yaml.

## Instruções

### Inicialização do projeto

Para bom funcionamento do projeto e evitar problemas de compatibilidade, neste projeto é recomendado utilizar o docker para inicialização do projeto, com as seguinte instruções:
<br>
```bash
# em um terminal, inicie os containers
docker-compose up -d

# acesse o terminal do container inicie a aplicação
docker exec -it project_talker_manager bash
npm start
# ou para iniciar com live-reload
npm run dev
```

### Requisições

Para requisições como cadastro, remoção e edição de palestantes pode-se utilizar o Thunder Client, Postman, Insomnia e similares.

## Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).

## Contato

- Linkedin: https://www.linkedin.com/in/matheus-rosa-2a0652201/
- E-mail: matheusrosa.dev@gmail.com
