// Aguarda o evento de 'submit' do formulário 'form-data'
document.getElementById('form-data').addEventListener('submit', function(event) {
    // Impede o recarregamento da página
    event.preventDefault();

    // Pega o elemento 'div' onde o resultado será exibido
    const resultadoDiv = document.getElementById('resultado-data');
    resultadoDiv.style.display = 'block'; // Torna a div visível

    // Pega o valor digitado no campo de input
    const dataInput = document.getElementById('dataInput').value;

    // A função 'split' quebra a string em um array usando a '/' como separador
    const partesData = dataInput.split('/');

    // Validação básica para garantir que o formato está correto
    if (partesData.length !== 3) {
        resultadoDiv.textContent = 'Formato de data inválido. Use dd/mm/aaaa.';
        return;
    }

    const dia = partesData[0];
    const mesNumero = partesData[1];
    const ano = partesData[2];

    // Array com os nomes dos meses em português
    const meses = [
        'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
        'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
    ];

    // O índice do array começa em 0, então subtraímos 1 do número do mês
    const indiceDoMes = parseInt(mesNumero, 10) - 1;

    // Validação para garantir que o mês é válido (entre 0 e 11)
    if (indiceDoMes >= 0 && indiceDoMes < 12) {
        const mesExtenso = meses[indiceDoMes];
        resultadoDiv.textContent = `${dia} de ${mesExtenso} de ${ano}.`;
    } else {
        resultadoDiv.textContent = 'Mês inválido. Verifique a data digitada.';
    }
});