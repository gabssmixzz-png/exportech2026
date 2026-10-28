# ExporTech 2026 — Convite Digital Interativo

Site de convite oficial da **ExporTech 2026 — Educação e Tecnologia**, promovido pela comunidade escolar da Escola Estadual Prof.ª Anésia Gonçalves Longuinhos (Pirapora-MG).

## Como usar

1. Abra o arquivo `index.html` em um navegador moderno (Chrome, Firefox, Safari, Edge).
2. Ou hospede a pasta inteira em qualquer serviço estático (Netlify, Vercel, GitHub Pages, Firebase Hosting etc.).

## Configurar o formulário (Formspree)

O formulário já está pronto. Para gravar de verdade as confirmações:

1. Acesse [https://formspree.io](https://formspree.io) e crie uma conta gratuita.
2. Clique em **New Form**.
3. Copie o endpoint gerado (exemplo: `https://formspree.io/f/xyzabcde`).
4. Abra o arquivo `script.js` e substitua a linha:

```js
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';
```

pelo endpoint real.

5. No painel do Formspree você poderá:
   - Ver todas as respostas
   - Exportar em CSV
   - Configurar notificações por e-mail
   - Proteger o acesso

**Importante:** enquanto o `YOUR_FORM_ID` estiver no código, o formulário simula sucesso (útil para testes locais). Assim que você colocar o endpoint real, os dados passam a ser gravados de verdade.

## Informações do evento (já configuradas)

- **Data:** 05 de novembro de 2026
- **Horário:** 18:30
- **Local:** Escola Estadual Prof.ª Anésia Gonçalves Longuinhos  
  Rua Raimundo Nascimento, 432 — Santos Dumont, Pirapora/MG

## Estrutura de arquivos

```
exportech2026/
├── index.html      → Página principal
├── styles.css      → Estilos e animações
├── script.js       → Interatividade + formulário + contador
├── logo.png        → Logo oficial (não alterar)
└── README.md       → Este arquivo
```

## Recursos implementados

- Tela misteriosa com partículas e linhas luminosas
- Revelação cinematográfica da logo
- Convite oficial completo
- Contador regressivo
- Formulário de confirmação funcional
- Compartilhamento nativo + copiar link
- Aviso de privacidade (LGPD)
- Totalmente responsivo (celular, tablet, desktop)
- Respeita `prefers-reduced-motion`
- Sem sons automáticos
- Identidade visual alinhada à logo oficial

## Observações

- Não inventamos data, horário ou endereço — tudo foi confirmado.
- Não há listas de atrações, oficinas ou programação (conforme solicitado).
- O site é um convite puro + confirmação de presença.
