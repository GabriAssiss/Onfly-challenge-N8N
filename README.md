![Banner image](https://user-images.githubusercontent.com/10284570/173569848-c624317f-42b1-45a6-ab09-f0ea3c247648.png)

# Desafio: Conector n8n Customizado - Gerador de Números Aleatórios

Este repositório é a solução para o desafio de desenvolvimento de um conector (nó) customizado para a plataforma de automação n8n. O objetivo foi estender as capacidades do n8n criando um nó que se integra a uma API externa para fornecer uma funcionalidade específica de forma simplificada ao usuário final.

O conector desenvolvido, chamado "Random", utiliza a API do Random.org para gerar números inteiros verdadeiramente aleatórios, a partir de um intervalo definido pelo usuário.

O projeto inclui o código-fonte do conector e toda a infraestrutura Docker Compose necessária para executar uma instância local do n8n conectada a um banco de dados PostgreSQL.

_____
## Funcionalidades

Conector: Random

Operação: True Random Number Generator

Inputs:
* Min: O menor valor inteiro para o intervalo (inclusivo).

* Max: O maior valor inteiro para o intervalo (inclusivo).

Output: Um único número inteiro aleatório, gerado pela API do Random.org.

Ícone: O nó possui um ícone SVG customizado para fácil identificação na interface do n8n.
_____

## Tech Stack

Automação: n8n v1.85.4

Linguagem do Conector: Node.js v22 + TypeScript

Containerização: Docker & Docker Compose

Banco de Dados: PostgreSQL v17

____
## Instalação e Configuração

Siga os passos abaixo para preparar o ambiente e instalar as dependências do conector.

1. Clone o Repositório

	```
	git clone https://github.com/seu-usuario/seu-repositorio.git
	cd Onfly-challenge-N8N
	```

2. Instale as Dependências do Conector

	O código do conector está isolado na pasta n8n-nodes-random. É necessário instalar suas dependências npm.

	```
	cd Onfly-challenge-N8N
	npm install
	```
3. Compile o Código TypeScript

	O n8n executa arquivos JavaScript. Como o conector foi desenvolvido em TypeScript, é preciso compilá-lo.

	```
	npm run build
	```
	Este comando cria uma pasta dist dentro de Onfly-challenge-N8N com os arquivos .ts que serão lidos pelo n8n.
	
_____

## Como Executar o Ambiente
A infraestrutura completa é gerenciada pelo Docker Compose, simplificando a execução.

1. Inicie os Contêineres

	Volte para a pasta raiz do projeto (onde o arquivo docker-compose.yml se encontra) e execute o seguinte comando:

	```
	docker compose up -d --build
	```
	O Docker irá baixar as imagens do n8n e do Postgres e iniciará os contêineres. O docker-compose.yml está configurado para usar a versão 1.85.4 do n8n.

2. Acesse o n8n

	Aguarde um momento para os serviços iniciarem. A instância do n8n estará disponível no seu navegador:

	URL: http://localhost:5678
___

## Teste

Acesse sua instância do n8n e crie um workflow

Clique no botão + para adicionar um novo nó

 Digite "Random" na barra de busca e adicione o nó 

Configure os campos "Min" e "Max" com os valores desejados

Execute o fluxo para ver o número aleatório gerado na saída

____
## Exemplo de Arquivo ENV
```
POSTGRES_USER=SEU_USUARIO
POSTGRES_PASSWORD=SUA_SENHA
POSTGRES_DB=SEU_BANCO_DE_DADOS
POSTGRES_NON_ROOT_USER=SEU_USUARIO_NAO_ROOT
POSTGRES_NON_ROOT_PASSWORD=SUA_SENHA_NAO_ROOT
TIMEZONE_USER=America/Sao_Paulo
```
___
## Estrutura do Projeto
```
ONFLY-CHALLENGE-N8N
├── .vscode/
├── credentials/
├── custom/
├── dist/
├── node_modules/
├── nodes/
│   └── Random/
│       ├── icon.svg
│       └── Random.node.ts
├── .editorconfig
├── .env
├── .eslintrc.js
├── .eslintrc.prepublish.js
├── .gitignore
├── .npmignore
├── .prettierrc.js
├── CODE_OF_CONDUCT.md
├── docker-compose.yml
├── gulpfile.js
├── index.js
├── LICENSE.md
├── Makefile
├── package-lock.json
├── package.json
├── README_TEMPLATE.md
├── README.md
└── tsconfig.json
```
