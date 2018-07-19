[![Maintainability](https://api.codeclimate.com/v1/badges/7d34f4c49b56a7c38466/maintainability)](https://codeclimate.com/github/prefeiturasp/SME-PratoAberto-Frontend/maintainability)

# Prato Aberto

_“Recurso público retorna ao público”._

Nós somos o **pátio digital**, uma iniciativa da Secretaria Municipal de Educação que, por meio do fortalecimento da transparência, da participação social e do desenvolvimento de novas tecnologias, aproxima diferentes grupos da sociedade civil por um objetivo maior: a melhoria da educação na cidade de São Paulo. 

## Conteúdo

1. [Sobre o prato aberto](#sobre-o-prato-aberto)
2. [Comunicação](#comunicação)
3. [Roadmap de tecnologia](#roadmap-de-tecnologia)
4. [Como contribuir](#como-contribuir)
5. [Instalação](#instalação)

## Sobre o prato aberto

"Prato Aberto – Comida Boa Não Tem Segredo". 


Projetada para funcionar em computadores e dispositivos móveis como 
tablets e celulares. A ferramenta permite a consulta dos cardápios por dia
 e por escola, com visualização no mapa. É a primeira vez que os cardápios 
 são divulgados por unidade escolar. Além de facilitar a consulta dos cardápios, 
 a plataforma permite a avaliação da qualidade das refeições e prevê interação 
 com usuários via Facebook e Telegram, por meio de um assistente virtual, o Robô
  Edu. Site: https://pratoaberto.sme.prefeitura.sp.gov.br/
  
## Comunicação


| Canal de comunicação | Objetivos |
|----------------------|-----------|
| [Issues do Github](https://github.com/prefeiturasp/SME-PratoAberto-Frontend/issues) | - Sugestão de novas funcionalidades<br> - Reportar bugs<br> - Discussões técnicas |
| [Telegram](https://t.me/patiodigital ) | - Comunicar novidades sobre os projetos<br> - Movimentar a comunidade<br>  - Falar tópicos que **não** demandem discussões profundas |

Qualquer outro grupo de discussão não é reconhecido oficialmente pela
comunidade i-Educar e não terá suporte.

## Roadmap de tecnologia


### Passos iniciais

- Iniciar a cobertura de testes para possibilitar refatorações


## Como contribuir

Contribuições são **super bem vindas**! Se você tem vontade de construir o
prato aberto conosco, veja o nosso [guia de contribuição](./CONTRIBUTING.md)
onde explicamos detalhadamente como trabalhamos e de que formas você pode nos
ajudar a alcançar nossos objetivos.

## Instalação


### Dependências

 * [angular-cli](https://github.com/angular/angular-cli)
 * Sass (latest)
 * Typescript (latest)

### Organização do projeto

 * instalar dependências via cli com o comando --save-dev
 * manter templates em arquivos separados, da mesma forma que já é proposto pelo @angular-cli na criação de componentes
 * classes devem ser criadas via @angular-cli e escritas em Typescript
 * CSS utiliza Sass
 * a pasta `src/assets` concentra qualquer asset necessário, como imagens, fontes e dados

### Deploy

 1. `ng build -prod`, gera a versão de distribuição na pasta `dist`
 2. `npm install`
 3. `ng-serve`, para rodar uma versão do servidor de desenvolvimento



---

Baseado no Readme do [i-educar](https://github.com/portabilis/i-educar)

