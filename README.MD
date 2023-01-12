# Generate Charge Challenge

O desafio foi realizado utilizando node.js com typescript, express como framework web, jest para os testes e para o banco o mongodb.

Foi estruturado pensando na utilização da Clean Architecture e princípios do SOLID, utilizando TDD como metodologia de desenvolvimento.

## Executando a aplicação
requisitos:

    node 18 (LTS)
    docker

Passos para executar:

    npm install # baixa as dependencias do projeto
    npm run build # compila e gera os arquivos js
    docker build -t charge-ch . # gera a imagem da node da api
    docker-compose up # levanta a imagem juntamente com o mongodb


## Executando os testes

Foram configurados os seguintes scripts:

    npm run test # testes unitários/integração
    npm run test:verbose # testes unitários/integração + log habilitado
    npm run test:unit # test unitários
    npm run test:integration # testes de integração
    npm run test:ci # testes unitários/integração + coverage
   O coverage report é gerado em:
   

  

    ./coverage

## Sobre o projeto

Criei duas versoes do projeto:

Branch master: Tem um projeto que não cumpre com o requisito de envio de csv e também a parte de tratamento de erros, e até mesmo o retorno das funções não estão bem lapidados. Aqui vocês vão poder ver um pouco mais da minha proposta em implementar usando a metodologia TDD, ter um coverage alto com testes unitários e de integração.
 
Branch v2: Nessa branch refatorar o comportamento da rota que realiza várias cobranças para seguir uma lógica mais de cobrança em massa e para cumprir com os requisitos do desafio, porém perdi muito a qualidade do projeto, pois estava com o prazo apertado entre outros fatores.
Sobre o comportamento: aqui estou recebendo um CSV, validando se eh um csv e se ele tem conteúdo, faco o parser dele pra estrutura esperada e retorno, por se tratar de uma rota bulk, sem ter uma limitação de quantidade de cobranças, ficar esperando o resultado mesmo com workers, paralelismo poderia resultar em um timeout sem uma limitação de tamanho de csv. Outra decisão do projeto, foi aceitar uma cobrança com dados inválidos e lançar um log para negócio, e processar as que estão corretas no bulk mesmo assim. Considerei isso como uma regra de negócio que deveria ser feito no use case no data layer.


## Possiveis melhorias

Como todo projeto de software sempre é possível fazer melhorias, ao longo do projeto fui anotando algumas coisas que eu poderia melhorar, mas optei por não fazer por questões de tempo.
 
Logs de controle para o negócio - na v2 acabei deixando só uns console.info para demonstrar os logs para negócio, informando que cobranças não foram realizadas, poderia ter implementado uma classe e adapter para alguma ferramenta de log/dashboards, etc.
 
Solução de envio de emails e boleto - acabei deixando um código que funciona somente para uso local, poderia ter separado um comportamento para dev e produção.
 
Isolamento de camadas na Clean Architecture - em alguns lugares acabei não respeitando todos os princípios, ou acabei colocando responsabilidades na camada errada, um exemplo eh ChargeMongoRepository.add(), em que eu estou adicionando o status waiting_payment ali mesmo.

## Mudanças para um sistema em produção

Tanto a maneira como eu gerei o boleto e o email, são maneiras que não funcionam em produção em um sistema de produção eu optaria no brasil por usar as seguintes soluções.
 
Sendgrid ou SNS para geração de email.
Mundipagg/pagarme ou Asaas para geração de boletos, simplesmente por serem ferramentas que já usei em sistemas reais.
 
Uma das coisas que eu deveria ter feito em um sistema real, é ter enviado o debtId ou o id da tabela charges para o parceiro responsável do boleto, para quando receber o webhook saber de que cobranca se trata.
