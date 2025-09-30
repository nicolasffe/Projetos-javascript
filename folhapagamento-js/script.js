document.getElementById('form-pagamento').addEventListener('submit', function(event) {
    event.preventDefault();

    // Pega os valores dos campos do formulário
    const codigo = document.getElementById('codigo').value;
    const horasTrabalhadas = parseInt(document.getElementById('horasTrabalhadas').value);
    const turno = document.getElementById('turno').value;
    const categoria = document.getElementById('categoria').value;
    const salarioMinimo = parseFloat(document.getElementById('salarioMinimo').value);

    let valorHoraTrabalhada = 0;

    // --- Lógica para calcular o valor da hora trabalhada ---
    if (categoria === 'G') { // Gerente
        valorHoraTrabalhada = salarioMinimo * 0.04;
    } else if (categoria === 'F') { // Funcionário
        if (turno === 'N') { // Turno Noturno
            valorHoraTrabalhada = salarioMinimo * 0.02;
        } else { // Turnos Matutino ou Vespertino
            valorHoraTrabalhada = salarioMinimo * 0.01;
        }
    }

    // --- CORREÇÃO: Calcular o salário inicial ---
    const salarioInicial = horasTrabalhadas * valorHoraTrabalhada;

    // Calcula o auxílio-alimentação com base no salário inicial
    let auxilioAlimentacao = 0;
    if (salarioInicial <= 800) {
        auxilioAlimentacao = salarioInicial * 0.25;
    } else if (salarioInicial <= 1200) {
        auxilioAlimentacao = salarioInicial * 0.20;
    } else { // Acima de 1200
        auxilioAlimentacao = salarioInicial * 0.15;
    }

    const salarioFinal = salarioInicial + auxilioAlimentacao;

    // resultados
    const resultadoDiv = document.getElementById('resultado-pagamento');
    resultadoDiv.style.display = 'block';

    // Insere o texto na div de resultado (usando <br> para quebrar linha)
    resultadoDiv.innerHTML =
        `Código: ${codigo}<br>` +
        `Horas trabalhadas: ${horasTrabalhadas}<br>` +
        `Valor da hora: R$ ${valorHoraTrabalhada.toFixed(2)}<br>` +
        `Salário inicial: R$ ${salarioInicial.toFixed(2)}<br>` +
        `Auxílio-alimentação: R$ ${auxilioAlimentacao.toFixed(2)}<br>` +
        `----------------------------------------<br>` +
        `<b>Salário Final: R$ ${salarioFinal.toFixed(2)}</b>`;
});