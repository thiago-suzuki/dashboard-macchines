# Dashboard Macchines - Frontend
Aplicação de Cadastro e Consulta de Máquinas

<h1 align="center">
  <img alt="Macchine" title="Macchines" width="700" src=".github/image.png" />
</h1>


## 💻 Tecnologias Utilizadas nesse Projeto
<div style="display: inline_block">
  <img align="center" height="50" width="60" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg">
  <img align="center" height="50" width="60" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ionic/ionic-original.svg">
  <img align="center" height="50" width="60" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg">
</div>

<br>

## Especificações
- Node: 20.17.0
- Pacote de Gerenciamento de Dependências: NPM
- Framework: Angular + Ionic
- Deploy: Vercel
- Link Deploy: https://dashboard-macchines.vercel.app/

<br>

## Como Rodar a Aplicação
- Primeiro, clone o projeto backend e realize a instalação: https://github.com/thiago-suzuki/dashboard-macchines-backend
- Clone o projeto frontend
- Realize a instalação das dependências:
```bash
$ npm install
$ npm install -g @ionic/cli
$ npm install -g @angular/cli
```
- No arquivo src/environments/environment.ts configure as APIs, caso queira rodar o backend local bastar deixar dessa forma:
<h1>
  <img alt="Macchine" title="Macchines" width="700" src=".github/environment.png" />
</h1>

- Em seguida, rode o Projeto:
```bash
$ npm run dev
```