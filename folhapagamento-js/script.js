// Aguarda o evento de 'submit' (clique no botão) do formulário com id 'form-pagamento'
document.getElementById('form-pagamento').addEventListener('submit', function(event) {
    // Impede o recarregamento da página
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
        // Para gerente, o valor da hora é 4% do salário mínimo, independente do turno
        valorHoraTrabalhada = salarioMinimo * 0.04;
    } else if (categoria === 'F') { // Funcionário
        if (turno === 'N') { // Turno Noturno
            valorHoraTrabalhada = salarioMinimo * 0.02; // 2% do salário mínimo
        } else { // Turnos Matutino ou Vespertino
            valorHoraTrabalhada = salarioMinimo * 0.01; // 1% do salário mínimo
        }
    }

    // --- Lógica para calcular salários e auxílio ---
    const salarioInicial = horasTrabalhadas * valorHoraTrabalhada;
    let auxilioAlimentacao = 0;

    // Calcula o auxílio-alimentação com base no salário inicial
    if (salarioInicial <= 800) {
        auxilioAlimentacao = salarioInicial * 0.25; // 25%
    } else if (salarioInicial <= 1200) {
        auxilioAlimentacao = salarioInicial * 0.20; // 20%
    } else { // Acima de 1200
        auxilioAlimentacao = salarioInicial * 0.15; // 15%
    }

    const salarioFinal = salarioInicial + auxilioAlimentacao;
    
    // --- Exibição dos resultados ---
    const resultadoDiv = document.getElementById('resultado-pagamento');
    resultadoDiv.style.display = 'block'; // Torna a div visível

    // Insere o texto formatado na div de resultado
    resultadoDiv.innerHTML =
        `Código: ${codigo}\n` +
        `Horas trabalhadas: ${horasTrabalhadas}\n` +
        `Valor da hora: R$ ${valorHoraTrabalhada.toFixed(2)}\n` +
        `Salário inicial: R$ ${salarioInicial.toFixed(2)}\n` +
        `Auxílio-alimentação: R$ ${auxilioAlimentacao.toFixed(2)}\n` +
        `----------------------------------------\n` +
        `Salário Final: R$ ${salarioFinal.toFixed(2)}`;
});