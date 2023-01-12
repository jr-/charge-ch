# Generate Charge Challenge

O desafio foi realizado utilizando node.js, com typescript, express como framework web, jest para os testes  e para o banco o mongodb.

Foi estruturado pensando na utilização da Clean Architecture e princípios do SOLID, utilizando TDD como metodologia de desenvolvimento.

## Executando a aplicação
requisitos: <br />
node 18 (LTS) <br />
docker <br />


Passos para executar: <br />
`npm install` - baixa as dependencias do projeto <br />
`npm run build` - compila e gera os arquivos js <br />
`docker build -t charge-ch .` - gera a imagem da node da api <br />
`docker-compose up` - levanta a imagem juntamente com o mongodb <br />


## Executando os testes



## Melhorias