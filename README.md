# NE45 + Jornal.IA: Jornalismo Esportivo 4.0

Site de apresentação da solução NE45 + Jornal.IA, que demonstra os benefícios da implementação de tecnologias de IA no jornalismo esportivo do Nordeste.

## Estrutura do Projeto

```
ne45-jornalismo-4.0/
├── index.html         # Página principal
├── styles.css         # Estilos CSS
├── script.js          # Funcionalidades JavaScript
└── images/            # Diretório de imagens
```

## Opções de Deploy

### GitHub Pages

1. Crie um repositório no GitHub
2. Faça push do código para o repositório:

```bash
git init
git add .
git commit -m "Versão inicial"
git remote add origin https://github.com/seu-usuario/ne45-jornalismo-4.0.git
git push -u origin main
```

3. Nas configurações do repositório, ative o GitHub Pages apontando para a branch principal.

### Netlify

1. Crie uma conta em [netlify.com](https://www.netlify.com/)
2. Clique em "New site from Git"
3. Conecte com seu repositório GitHub
4. Configure as opções de build (não necessárias para este projeto estático)
5. Clique em "Deploy site"

### Vercel

1. Crie uma conta em [vercel.com](https://vercel.com/)
2. Importe seu repositório do GitHub
3. Configure as opções de projeto (mantenha as configurações padrão)
4. Clique em "Deploy"

## Domínio Personalizado

Para adicionar um domínio personalizado:

1. Compre um domínio em um registrador de sua escolha
2. Configure os registros DNS para apontar para seu serviço de hospedagem
3. Adicione o domínio nas configurações da sua plataforma de deploy

## Desenvolvimento Local

Para visualizar o site localmente:

1. Clone o repositório
2. Abra o arquivo `index.html` em seu navegador

Ou use um servidor local simples:

```bash
# Se você tem Python instalado
python -m http.server

# Se você tem Node.js instalado
npx serve
```

Acesse o site em `http://localhost:8000` ou `http://localhost:5000`.
