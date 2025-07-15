# Projeto Carta de Cancelamento

Este projeto é uma aplicação web para geração de cartas de cancelamento de serviços, desenvolvida com HTML, CSS e JavaScript puro.

## Funcionalidades

- Formulário para preenchimento de dados pessoais
- Seleção de tipos de cancelamento (Comerciais, Habitacionais, Abertura de conta)
- Formatação automática de CPF
- Visualização da carta gerada em modal
- Download da carta em formato de texto
- Limpeza do formulário com confirmação
- Design responsivo para dispositivos móveis

## Estrutura do Projeto

```
carta-cancelamento/
├── index.html          # Página principal
├── css/
│   └── style.css       # Estilos da aplicação
├── js/
│   └── script.js       # Lógica JavaScript
└── README.md           # Documentação
```

## Como Usar

1. Abra o arquivo `index.html` em um navegador web
2. Preencha todos os campos obrigatórios:
   - Cidade
   - Data
   - Nome completo
   - CPF (formatação automática)
   - Nome para assinatura
3. Selecione pelo menos um tipo de cancelamento
4. Use os botões:
   - **Visualizar Carta**: Mostra a carta gerada em um modal
   - **Baixar PDF**: Faz download da carta em formato de texto
   - **Limpar Formulário**: Limpa todos os campos (com confirmação)

## Recursos Técnicos

- **HTML5**: Estrutura semântica e acessível
- **CSS3**: Design moderno e responsivo
- **JavaScript ES6**: Funcionalidades interativas
- **Formatação automática**: CPF e data
- **Modal personalizado**: Para visualização da carta
- **Download de arquivo**: Geração de arquivo de texto

## Compatibilidade

- Navegadores modernos (Chrome, Firefox, Safari, Edge)
- Dispositivos móveis e desktop
- Não requer servidor web (funciona localmente)

## Melhorias Futuras

- Geração de PDF real (usando bibliotecas como jsPDF)
- Validação mais robusta de CPF
- Salvamento local dos dados
- Mais tipos de cancelamento
- Integração com APIs de correio

## Desenvolvido por

Este projeto foi desenvolvido como uma versão similar ao site de carta de cancelamento do parceiro Nippon Serviços CCA.

