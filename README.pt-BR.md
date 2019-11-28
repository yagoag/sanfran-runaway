<div align="center">
  <img src="https://repository-images.githubusercontent.com/224040734/8973df00-11d5-11ea-8c36-93da73de47af" style="width: 100%; max-width: 640px;">

# San Francisco Runaway

</div>

[![Netlify Status](https://api.netlify.com/api/v1/badges/4d79bf52-b817-416b-b72e-a260e3040a7d/deploy-status)](https://app.netlify.com/sites/sanfranrunaway/deploys) | [Info in English](/README.md)

Você está viajando por São Francisco, a cidade com o maior número de hipsters por metro quadrado do mundo, e todo mundo sabe que não tem nada que um hipster goste mais do que um bom café.

Para vencer esse jogo, você precisa encontrar cinco lojas da famosa rede "Star Café" sem atropelar nenhum dos hipsters que estão andando pela rua com copos do café da rede na mão.

Jogue agora em https://sanfranrunaway.netlify.com

## Executar locamente

Para rodar localmente em modo de desenvolvimento, apenas clone o repositório e execute `yarn start`

Você também pode utilizar o `npm`, só lembre de apagar o `yarn.lock` para não ter reclamações por parte dele.

## Testando

Para rodar os testes em modo interativo (serão re-executados ao alterar os arquivos), basta rodar `yarn test`

## Gerar uma build

Para gerar uma build de produção localmente, você pode rodar `yarn deploy`. Isso executará todos os testes e realizará a build caso eles passem. Para não rodar os testes, é possível rodar `yarn build` diretamente.

Nós também temos um processo de build & deployment automatizado na Netlify. Ele roda automaticamente após todo commit enviado para a `master`.

Para ver os deployments, [clique aqui](https://app.netlify.com/sites/sanfranrunaway/deploys) ou do badge de build status na parte superior deste Readme.
