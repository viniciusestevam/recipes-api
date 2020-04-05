# :fork_and_knife: Recipes API

Projeto simples que busca receitas no [RecipePuppy]('http://www.recipepuppy.com/') utilizando os ingredientes passados por parametro e atribui gifs do [Giphy](https://developers.giphy.com/docs/api) a cada uma das receitas.

## Todo

- [ ] Melhorar error handling.

## Setup

Clone esse projeto com o comando `git clone https://github.com/estevam31/recipes-api` ou faça download do mesmo.

Certifique-se de ter a última versão do [Docker](https://www.docker.com/) e do [Yarn](https://yarnpkg.com/) instaladas em sua máquina.

### Giphy

Para executar o projeto é necessário uma conta de desenvolvedor do Giphy, crie uma ou faça login.

- Acesse a página de desenvolvedores da [API do Giphy](https://developers.giphy.com/docs/api/).
- Clique em [Create APP](https://developers.giphy.com/dashboard/?create=true).
- Selecione a opção API e clique em Next Step.
- Assim que a criação da app estiver completa, seus apps com suas respectivas Keys estarão disponíveis no [Dashboard](https://developers.giphy.com/dashboard/)
- Copie a API Key para utilizar como variável de ambiente

### Variáveis de ambiente

- Coloque a API Key do seu app do Giphy na chave GIPHY_API_KEY
- Mude o nome do arquivo `.env.example` para `.env`
- Altere as variáveis de ambiente do arquivo com os valores desejados. As instruções sobre cada variável estão presentes no arquivo.

### Desenvolvimento

- Instale as dependências executando o comando `yarn` na pasta raiz do projeto
- Execute o comando `yarn dev` para ter auto-reload ou `yarn start`

### Docker

- Execute `docker build -t recipes .` na raiz do projeto para fazer o build da imagem Docker
- Agora para rodar o projeto basta executar `docker run -d -p 3000:3000 recipes`

## Endpoints

A API possui apenas um Enpoint de `GET`:
`http://{HOST}/recipes/?i={ingredient_1},{ingredient_2}`

_Request:_
`http://127.0.0.1/recipes/?i=onion,tomato`

_Response:_

```json
{
  "keywords": ["onion", "tomato"],
  "recipes": [
    {
      "title": "Greek Omelet with Feta",
      "ingredients": [
        "eggs",
        "feta cheese",
        "garlic",
        "red onions",
        "spinach",
        "tomato",
        "water"
      ],
      "link": "http://www.kraftfoods.com/kf/recipes/greek-omelet-feta-104508.aspx",
      "gif": "https://media.giphy.com/media/xBRhcST67lI2c/giphy.gif"
    },
    {
      "title": "Guacamole Dip Recipe",
      "ingredients": ["avocado", "onions", "tomato"],
      "link": "http://cookeatshare.com/recipes/guacamole-dip-2783",
      "gif": "https://media.giphy.com/media/I3eVhMpz8hns4/giphy.gif"
    }
  ]
}
```
