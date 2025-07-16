document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('cancellationForm');
    const visualizarCartaBtn = document.getElementById('visualizarCarta');
    const baixarPdfBtn = document.getElementById('baixarPdf');
    const limparFormularioBtn = document.getElementById('limparFormulario');
    const cpfInput = document.getElementById('cpf');

    // Preencher a data atual automaticamente
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Mês é 0-indexed
    const year = today.getFullYear();
    document.getElementById('data').value = `${year}-${month}-${day}`;

    // Definir a cidade como Uberlândia e desabilitar o campo
    const cidadeInput = document.getElementById('cidade');
    cidadeInput.value = 'Uberlândia';
    cidadeInput.setAttribute('readonly', 'true');

    // Marcar todos os tipos de cancelamento por padrão no formulário
    document.getElementById('comerciais').checked = true;
    document.getElementById('habitacionais').checked = true;
    document.getElementById('aberturaConta').checked = true;

    // Função para formatar CPF
    const formatCPF = (value) => {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1');
    };

    // Adicionar formatação do CPF no input
    cpfInput.addEventListener('input', (e) => {
        e.target.value = formatCPF(e.target.value);
    });

    // Função para formatar data para exibição
    const formatDateForDisplay = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR');
    };

    // Função para validar formulário
    const validateForm = () => {
        const cidade = document.getElementById('cidade').value.trim();
        const data = document.getElementById('data').value;
        const nomeCompleto = document.getElementById('nomeCompleto').value.trim();
        const cpf = document.getElementById('cpf').value.trim();
        const nomeAssinatura = document.getElementById('nomeCompleto').value.trim();
        const tiposCancelamento = Array.from(document.querySelectorAll('input[name="tipoCancelamento"]:checked'));

        if (!cidade) {
            alert('Por favor, preencha a cidade.');
            return false;
        }
        if (!data) {
            alert('Por favor, preencha a data.');
            return false;
        }
        if (!nomeCompleto) {
            alert('Por favor, preencha o nome completo.');
            return false;
        }
        if (!cpf) {
            alert('Por favor, preencha o CPF.');
            return false;
        }
        if (!nomeAssinatura) {
            alert('Por favor, preencha o nome para assinatura.');
            return false;
        }
        if (tiposCancelamento.length === 0) {
            alert('Por favor, selecione pelo menos um tipo de cancelamento.');
            return false;
        }

        return true;
    };

    // Função para gerar o texto da carta (mesmo conteúdo do PDF)
    const generateLetterText = () => {
        if (!validateForm()) {
            return '';
        }

        const cidade = document.getElementById('cidade').value.trim();
        const data = document.getElementById('data').value;
        const nomeCompleto = document.getElementById('nomeCompleto').value.trim();
        const cpf = document.getElementById('cpf').value.trim();
        const nomeAssinatura = document.getElementById('nomeAssinatura').value.trim();

        // Formatar data
        const dataObj = new Date(data);
        const dia = dataObj.getDate().toString().padStart(2, '0');
        const mes = (dataObj.getMonth() + 1).toString().padStart(2, '0');
        const ano = dataObj.getFullYear();

        // Obter tipos de cancelamento selecionados
        const tiposCancelamento = [];
        if (document.getElementById('comerciais').checked) tiposCancelamento.push('( X ) Comerciais');
        if (document.getElementById('habitacionais').checked) tiposCancelamento.push('( X ) Habitacionais');
        if (document.getElementById('aberturaConta').checked) tiposCancelamento.push('( X ) Abertura de conta');

        // Montar o texto da carta igual ao PDF
        const letterContent = `${cidade}, ${dia} de ${mes} de ${ano}.

Eu, ${nomeCompleto} portador do CPF ${cpf}, domiciliado no endereço: Uberlândia - MG, solicito o cancelamento de todas as avaliações e propostas:

${tiposCancelamento.join('\n')}

Realizadas na Caixa Econômica Federal até a presente data em meu nome.

Estou ciente que uma nova avaliação poderá não ser aprovada ou ter os valores condicionados.

Atenciosamente,


_____________________________________________________
Nome e assinatura do solicitante

${nomeCompleto}`;

        return letterContent;
    };

    // Event listener para visualizar carta
    visualizarCartaBtn.addEventListener('click', () => {
        const letterText = generateLetterText();
        if (letterText) {
            // Criar modal para exibir a carta
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
            `;

            const modalContent = document.createElement('div');
            modalContent.style.cssText = `
                background-color: white;
                padding: 30px;
                border-radius: 8px;
                max-width: 600px;
                max-height: 80%;
                overflow-y: auto;
                position: relative;
                box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            `;

            const closeButton = document.createElement('button');
            closeButton.textContent = 'Fechar';
            closeButton.style.cssText = `
                position: absolute;
                top: 10px;
                right: 10px;
                background-color: #dc3545;
                color: white;
                border: none;
                padding: 8px 16px;
                border-radius: 4px;
                cursor: pointer;
                font-size: 14px;
            `;

            const letterPre = document.createElement('pre');
            letterPre.textContent = letterText;
            letterPre.style.cssText = `
                white-space: pre-wrap;
                font-family: Arial, sans-serif;
                line-height: 1.6;
                margin-top: 30px;
                font-size: 14px;
                color: #333;
            `;

            closeButton.addEventListener('click', () => {
                document.body.removeChild(modal);
            });

            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    document.body.removeChild(modal);
                }
            });

            modalContent.appendChild(closeButton);
            modalContent.appendChild(letterPre);
            modal.appendChild(modalContent);
            document.body.appendChild(modal);
        }
    });

    // Event listener para baixar PDF
    baixarPdfBtn.addEventListener('click', () => {
        console.log('Iniciando geração do PDF...');
        
        if (!validateForm()) {
            return;
        }

        try {
            // Verificar se jsPDF está disponível
            if (!window.jspdf) {
                alert('Erro: Biblioteca jsPDF não carregada. Tente recarregar a página.');
                return;
            }

            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            // Adicionar logo no topo do PDF
            const img = new Image();
            img.onload = () => {
                doc.addImage(img, 'PNG', 20, 10, 40, 15); // Posição e tamanho da logo

                // Obter dados do formulário
                const cidade = document.getElementById('cidade').value.trim();
                const data = new Date(document.getElementById('data').value).toLocaleDateString('pt-BR');
                const nomeCompleto = document.getElementById('nomeCompleto').value.trim();
                const cpf = document.getElementById('cpf').value.trim();
                const nomeAssinatura = document.getElementById('nomeCompleto').value.trim();

                // Configurações de margem e posição - melhor tabulação
                const margemEsquerda = 25;
                const margemDireita = 185;
                const larguraPagina = 210;
                let posicaoY = 35;

                // Título centralizado
                doc.setFontSize(16);
                doc.setFont('helvetica', 'bold');
                doc.text('CARTA DE CANCELAMENTO', larguraPagina/2, posicaoY, { align: 'center' });
                posicaoY += 30;

                // Data alinhada à direita
                doc.setFontSize(12);
                doc.setFont('helvetica', 'normal');
                
                // Separar dia, mês e ano
                const dataObj = new Date(document.getElementById('data').value);
                const dia = dataObj.getDate().toString().padStart(2, '0');
                const mes = (dataObj.getMonth() + 1).toString().padStart(2, '0');
                const ano = dataObj.getFullYear();
                
                // Formato: "Cidade, dd/mm/aaaa."
                const textoData = `${cidade}, ${dia}/${mes}/${ano}.`;
                doc.text(textoData, margemDireita, posicaoY, { align: 'right' });
                posicaoY += 25;

                // Primeiro parágrafo em uma linha só
                const textoCompleto = `Eu, ${nomeCompleto.toUpperCase()}, portador(a) do CPF ${cpf}, solicito o cancelamento de todas as avaliações e propostas:`;
                
                // Quebrar texto em múltiplas linhas se necessário
                const linhas = doc.splitTextToSize(textoCompleto, margemDireita - margemEsquerda);
                linhas.forEach(linha => {
                    doc.text(linha, margemEsquerda, posicaoY);
                    posicaoY += 12;
                });
                
                posicaoY += 10;

                // Tipos de cancelamento alinhados à esquerda
                doc.setFont('helvetica', 'normal');
                const todasOpcoes = [
                    { valor: 'Comerciais', id: 'comerciais' },
                    { valor: 'Habitacionais', id: 'habitacionais' },
                    { valor: 'Abertura de conta', id: 'aberturaConta' }
                ];
                
                todasOpcoes.forEach(opcao => {
                    const isChecked = document.getElementById(opcao.id).checked;
                    const marcador = isChecked ? '( X )' : '(   )';
                    doc.text(`${marcador} ${opcao.valor}`, margemEsquerda, posicaoY);
                    posicaoY += 15;
                });
                
                posicaoY += 10;

                // Texto sobre a Caixa Econômica Federal
                const textoCaixa = 'Realizadas na Caixa Econômica Federal até a presente data em meu nome. Estou ciente que uma nova avaliação poderá não ser aprovada ou ter os valores condicionados.';
                const linhasCaixa = doc.splitTextToSize(textoCaixa, margemDireita - margemEsquerda);
                linhasCaixa.forEach(linha => {
                    doc.text(linha, margemEsquerda, posicaoY);
                    posicaoY += 12;
                });
                
                posicaoY += 20;

                // Despedida
                doc.text('Atenciosamente,', margemEsquerda, posicaoY);
                posicaoY += 50;

                // Linha de assinatura
                doc.line(margemEsquerda, posicaoY, margemEsquerda + 100, posicaoY);
                posicaoY += 8;

                // Nome do solicitante
                doc.setFontSize(12);
                doc.setFont('helvetica', 'bold');
                doc.text(nomeAssinatura, margemEsquerda, posicaoY);
                posicaoY += 8;

                // Texto da assinatura
                doc.setFontSize(10);
                doc.setFont('helvetica', 'normal');
                doc.text('Nome e assinatura do solicitante', margemEsquerda, posicaoY);

                doc.save('carta-cancelamento.pdf');
                console.log('PDF gerado com sucesso!');
            };
            
            img.onerror = () => {
                console.warn('Não foi possível carregar a logo, gerando PDF sem logo');
                // Gerar PDF sem logo seguindo o mesmo padrão
                const cidade = document.getElementById('cidade').value.trim();
                const nomeCompleto = document.getElementById('nomeCompleto').value.trim();
                const cpf = document.getElementById('cpf').value.trim();
                const nomeAssinatura = document.getElementById('nomeCompleto').value.trim();

                const margemEsquerda = 25;
                const larguraPagina = 210;
                let posicaoY = 35;

                doc.setFontSize(12);
                doc.setFont('helvetica', 'normal');
                
                const dataObj = new Date(document.getElementById('data').value);
                const dia = dataObj.getDate().toString().padStart(2, '0');
                const mes = (dataObj.getMonth() + 1).toString().padStart(2, '0');
                const ano = dataObj.getFullYear();
                
                const textoData = `${cidade}, ${dia} de ${mes} de ${ano}.`;
                doc.text(textoData, larguraPagina/2, posicaoY, { align: 'center' });
                posicaoY += 25;

                doc.text('Eu, ', margemEsquerda, posicaoY);
                doc.setFont('helvetica', 'bold');
                doc.text(nomeCompleto, margemEsquerda + 15, posicaoY);
                
                const larguraNome = doc.getTextWidth(nomeCompleto);
                doc.setFont('helvetica', 'normal');
                doc.text(' e CPF ', margemEsquerda + 15 + larguraNome, posicaoY);
                
                doc.setFont('helvetica', 'bold');
                const larguraECpf = doc.getTextWidth(' e CPF ');
                doc.text(cpf, margemEsquerda + 15 + larguraNome + larguraECpf, posicaoY);
                
                doc.setFont('helvetica', 'normal');
                const larguraCpf = doc.getTextWidth(cpf);
                doc.text(',', margemEsquerda + 15 + larguraNome + larguraECpf + larguraCpf, posicaoY);
                
                posicaoY += 12;
                
                doc.text('domiciliado no endereço: ', margemEsquerda, posicaoY);
                doc.setFont('helvetica', 'bold');
                doc.text('Uberlândia - MG', margemEsquerda + 75, posicaoY);
                doc.setFont('helvetica', 'normal');
                doc.text(', solicito o cancelamento de todas as', margemEsquerda + 130, posicaoY);
                posicaoY += 12;
                
                doc.text('avaliações e propostas:', margemEsquerda, posicaoY);
                posicaoY += 20;

                const todasOpcoes = [
                    { valor: 'Comerciais', id: 'comerciais' },
                    { valor: 'Habitacionais', id: 'habitacionais' },
                    { valor: 'Abertura de conta', id: 'aberturaConta' }
                ];
                
                todasOpcoes.forEach(opcao => {
                    const isChecked = document.getElementById(opcao.id).checked;
                    const marcador = isChecked ? '( X )' : '(   )';
                    doc.text(`${marcador} ${opcao.valor}`, margemEsquerda + 10, posicaoY);
                    posicaoY += 12;
                });
                
                posicaoY += 15;

                doc.text('Realizadas na Caixa Econômica Federal até a presente data em meu nome.', margemEsquerda, posicaoY);
                posicaoY += 20;
                
                doc.text('Estou ciente que uma nova avaliação poderá não ser aprovada ou ter os valores', margemEsquerda, posicaoY);
                posicaoY += 10;
                doc.text('condicionados.', margemEsquerda, posicaoY);
                posicaoY += 35;

                doc.text('Atenciosamente,', margemEsquerda, posicaoY);
                posicaoY += 30;

                doc.line(margemEsquerda, posicaoY, margemEsquerda + 120, posicaoY);
                posicaoY += 8;

                doc.setFontSize(10);
                doc.text('Nome e assinatura do solicitante', margemEsquerda + 25, posicaoY);
                posicaoY += 15;

                doc.setFontSize(12);
                doc.setFont('helvetica', 'bold');
                doc.text(nomeAssinatura, margemEsquerda + 5, posicaoY);

                doc.save('carta-cancelamento.pdf');
            };
            
            img.src = 'img/logo-aprovacca.png';

        } catch (error) {
            console.error('Erro ao gerar PDF:', error);
            alert('Erro ao gerar PDF. Verifique o console para mais detalhes.');
        }
    });

    // Event listener para limpar formulário
    limparFormularioBtn.addEventListener('click', () => {
        if (confirm('Tem certeza que deseja limpar todos os campos?')) {
            form.reset();
            // Reconfigurar valores padrão após limpar
            document.getElementById('cidade').value = 'Uberlândia';
            document.getElementById('comerciais').checked = true;
            document.getElementById('habitacionais').checked = true;
            document.getElementById('aberturaConta').checked = true;
            
            // Reconfigurar data atual
            const today = new Date();
            const day = String(today.getDate()).padStart(2, '0');
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const year = today.getFullYear();
            document.getElementById('data').value = `${year}-${month}-${day}`;
        }
    });
});
