[![Maintainability](https://api.codeclimate.com/v1/badges/7d34f4c49b56a7c38466/maintainability)](https://codeclimate.com/github/prefeiturasp/SME-PratoAberto-Frontend/maintainability)

# Pátio Digital

_“Recurso público retorna ao público”._

Nós somos o **pátio digital**, uma iniciativa da Secretaria Municipal de Educação de São Paulo que, por meio do fortalecimento da transparência, da participação social e do desenvolvimento de novas tecnologias, aproxima diferentes grupos da sociedade civil por um objetivo maior: a melhoria da educação na cidade de São Paulo. 

# Prato Aberto


"Prato Aberto – Comida Boa Não Tem Segredo". 

## Conteúdo

1. [Sobre o prato aberto](#sobre-o-prato-aberto)
2. [Comunicação](#comunicação)
3. [Roadmap de tecnologia](#roadmap-de-tecnologia)
4. [Como contribuir](#como-contribuir)
5. [Instalação](#instalação)

## Sobre o prato aberto



Projetada para funcionar em computadores e dispositivos móveis como tablets e celulares. A ferramenta permite a consulta dos cardápios por dia e por escola, com visualização no mapa. É a primeira vez que os cardápios 
são divulgados por unidade escolar. Além de facilitar a consulta dos cardápios,a plataforma permite a avaliação da qualidade das refeições e prevê interação com usuários via Facebook e Telegram, por meio de um assistente virtual, o Robô Edu.

### Nossos outros repositórios

1. [Robô Edu](https://github.com/prefeiturasp/SME-PratoAberto-Edu)
2. [API](https://github.com/prefeiturasp/SME-PratoAberto-API)
3. [Editor](https://github.com/prefeiturasp/SME-PratoAberto-Editor)
  
## Comunicação


| Canal de comunicação | Objetivos |
|----------------------|-----------|
| [Issues do Github](https://github.com/prefeiturasp/SME-PratoAberto-Frontend/issues) | - Sugestão de novas funcionalidades<br> - Reportar bugs<br> - Discussões técnicas |
| [Telegram](https://t.me/patiodigital ) | - Comunicar novidades sobre os projetos<br> - Movimentar a comunidade<br>  - Falar tópicos que **não** demandem discussões profundas |

Qualquer outro grupo de discussão não é reconhecido oficialmente.

## Roadmap de tecnologia


### Passos iniciais
- Melhorar a qualidade de código
- Iniciar a escrita de testes para possibilitar refatorações
- Configurar Docker
- Iniciar escrita de testes funcionais
- Melhorar documentação de maneira enxuta

## Como contribuir

Contribuições são **super bem vindas**! Se você tem vontade de construir o
prato aberto conosco, veja o nosso [guia de contribuição](./CONTRIBUTING.md)
onde explicamos detalhadamente como trabalhamos e de que formas você pode nos
ajudar a alcançar nossos objetivos. Lembrando que todos devem seguir 
nosso [código de conduta](./CODEOFCONDUCT.md).

## Instalação


### Dependências

 * [angular-cli](https://github.com/angular/angular-cli)
 * Sass (latest)
 * Typescript (latest)

### Organização do projeto

 * Instalar dependências via cli com o comando --save-dev
 * Manter templates em arquivos separados, da mesma forma que já é proposto pelo @angular-cli na criação de componentes
 * Classes devem ser criadas via @angular-cli e escritas em Typescript
 * CSS utiliza Sass
 * A pasta `src/assets` concentra qualquer asset necessário, como imagens, fontes e dados

### Deploy

 1. `ng build -prod`, gera a versão de distribuição na pasta `dist`
 2. `npm install`
 3. `ng-serve`, para rodar uma versão do servidor de desenvolvimento



---

Baseado no Readme do [i-educar](https://github.com/portabilis/i-educar)

