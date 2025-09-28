// Aguarda o evento de 'submit' (clique no botão) do formulário com id 'form-frete'
document.getElementById('form-frete').addEventListener('submit', function(event) {
    // Impede o comportamento padrão do formulário, que é recarregar a página
    event.preventDefault();

    // Pega os valores dos campos do formulário (inputs)
    const distancia = parseFloat(document.getElementById('distancia').value);
    const qtdPecas = parseInt(document.getElementById('qtdPecas').value);
    const regiao = parseInt(document.getElementById('regiao').value);
    const querRastreamento = document.querySelector('input[name="rastreamento"]:checked').value;
    const precoCombustivel = parseFloat(document.getElementById('precoCombustivel').value);
    
    // --- Início da Lógica de Cálculo ---
    
    let taxaRastreamento = (querRastreamento === 'S') ? 200 : 0;
    let valorFretePecas = 0;
    let valorPorPeca = 0;
    let desconto = 0;
    
    // Define o valor por peça e o desconto com base na região
    switch (regiao) {
        case 1: // Sul
            valorPorPeca = 1.00;
            desconto = 0.10; // 10%
            break;
        case 2: // Sudeste
            valorPorPeca = 1.20;
            desconto = 0.12; // 12%
            break;
        case 3: // Centro-Oeste
            valorPorPeca = 1.30;
            desconto = 0.13; // 13%
            break;
    }

    // Calcula o frete das peças, aplicando desconto se necessário
    if (qtdPecas <= 1000) {
        valorFretePecas = qtdPecas * valorPorPeca;
    } else {
        const pecasExcedentes = qtdPecas - 1000;
        const valorComDesconto = valorPorPeca * (1 - desconto);
        valorFretePecas = (1000 * valorPorPeca) + (pecasExcedentes * valorComDesconto);
    }
    
    // Calcula os custos restantes e o total
    const valorFreteKm = distancia * precoCombustivel;
    const totalFrete = taxaRastreamento + valorFretePecas + valorFreteKm;
    
    // --- Fim da Lógica de Cálculo ---

    // Pega o elemento 'div' onde o resultado será exibido
    const resultadoDiv = document.getElementById('resultado-frete');
    // Torna a div visível
    resultadoDiv.style.display = 'block';
    
    // Insere o texto formatado com os resultados dentro da div
    resultadoDiv.innerHTML = 
        `Taxa do rastreamento: R$ ${taxaRastreamento.toFixed(2)}\n` +
        `Valor do frete pelas peças: R$ ${valorFretePecas.toFixed(2)}\n` +
        `Valor do frete por quilômetro: R$ ${valorFreteKm.toFixed(2)}\n` +
        `----------------------------------------\n` +
        `Total do frete: R$ ${totalFrete.toFixed(2)}`;
});