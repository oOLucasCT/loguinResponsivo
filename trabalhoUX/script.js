    const raiz = document.documentElement;
    const passo = 10; // cada clique muda 10%
    const min = 80, max = 150;
 
    function aplicarEscala(valor){
        valor = Math.min(max, Math.max(min, valor));
        raiz.style.fontSize = valor + '%';
        localStorage.setItem('esmeralda-escala', valor);
    }
 
    aplicarEscala(parseInt(localStorage.getItem('esmeralda-escala')) || 100);
 
    document.getElementById('fonte-mais').addEventListener('click', () => {
        aplicarEscala((parseInt(raiz.style.fontSize) || 100) + passo);
    });
    document.getElementById('fonte-menos').addEventListener('click', () => {
        aplicarEscala((parseInt(raiz.style.fontSize) || 100) - passo);
    });
    document.getElementById('fonte-reset').addEventListener('click', () => {
        aplicarEscala(100);
    });
 
    const btnContraste = document.getElementById('alto-contraste');
    function aplicarContraste(ativo){
        raiz.classList.toggle('alto-contraste', ativo);
        btnContraste.setAttribute('aria-pressed', String(ativo));
        localStorage.setItem('esmeralda-contraste', ativo ? '1' : '0');
    }
    aplicarContraste(localStorage.getItem('esmeralda-contraste') === '1');
    btnContraste.addEventListener('click', () => {
        aplicarContraste(!raiz.classList.contains('alto-contraste'));
    });
 
    const dialog = document.getElementById('dialog-agendamento');
    const resumo = document.getElementById('resumo-agendamento');
    const campoData = document.getElementById('data-agendamento');
    const btnConfirmar = document.getElementById('confirmar-agendamento');
 
    const agendamento = { servico: null, data: null, horario: null };
 
    // abrir e fechar o modal
    document.querySelectorAll('[data-abre-agendamento]').forEach(btn => {
        btn.addEventListener('click', () => dialog.showModal());
    });
    document.querySelectorAll('[data-fecha-agendamento]').forEach(btn => {
        btn.addEventListener('click', () => dialog.close());
    });
    // fecha clicando fora da caixa (no backdrop do <dialog>)
    dialog.addEventListener('click', (evento) => {
        if (evento.target === dialog) dialog.close();
    });
 
    // seleção dentro de cada grupo (serviço / horário)
    document.querySelectorAll('.opcoes').forEach(grupo => {
        grupo.addEventListener('click', (evento) => {
            const botao = evento.target.closest('.opcao');
            if (!botao) return;
 
            grupo.querySelectorAll('.opcao').forEach(op => op.classList.remove('selecionada'));
            botao.classList.add('selecionada');
 
            agendamento[grupo.dataset.grupo] = botao.textContent;
            atualizarResumo();
        });
    });
 
    // data vem de um input, não de botões
    campoData.addEventListener('change', () => {
        agendamento.data = campoData.value
            ? new Date(campoData.value + 'T00:00').toLocaleDateString('pt-BR')
            : null;
        atualizarResumo();
    });
 
    function atualizarResumo() {
        const { servico, data, horario } = agendamento;
        if (servico && data && horario) {
            resumo.textContent = `${servico} · ${data} · ${horario}`;
            resumo.classList.add('completo');
        } else {
            resumo.textContent = 'Escolha o serviço, a data e o horário.';
            resumo.classList.remove('completo');
        }
    }
 
    // confirmação
    btnConfirmar.addEventListener('click', () => {
        if (!agendamento.servico || !agendamento.data || !agendamento.horario) {
            resumo.textContent = 'Falta escolher alguma opção acima.';
            return;
        }
 
        resumo.textContent = `Agendamento confirmado: ${agendamento.servico} · ${agendamento.data} · ${agendamento.horario}`;
        resumo.classList.add('completo');
 
        setTimeout(() => {
            dialog.close();
            // reset para a próxima vez que o modal abrir
            document.querySelectorAll('.opcao.selecionada').forEach(op => op.classList.remove('selecionada'));
            campoData.value = '';
            agendamento.servico = agendamento.data = agendamento.horario = null;
            atualizarResumo();
        }, 1600);
    });