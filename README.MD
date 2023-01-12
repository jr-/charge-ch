# Generate Charge Challenge

O desafio foi realizado utilizando node.js, com typescript, express como framework web, jest para os testes  e para o banco o mongodb.

Foi estrutarado pensando na utilização da Clean Architecture e princípios do SOLID, utilizando TDD como metodologia de desenvolvimento.

## Executando a aplicação
requisitos:
node 18 (LTS)
docker


Passos para executar:
`npm install` baixa as dependencias do projeto
`npm run build` compila e gera os arquivos js
`docker build -t charge-ch .` gera a imagem da node da api
`docker-compose up` levanta a imagem juntamente com o mongodb


## Executando os testes



## Melhorias