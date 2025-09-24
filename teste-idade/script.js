document.addEventListener('DOMContentLoaded', () => {


    const inputElement = document.getElementById('idadeInput');
    const resultadoElement = document.getElementById('resultado');
    const verifyButton = document.getElementById('verifyButton');

    function verificarFaixaEtaria() {
        const idadeString = inputElement.value;
        const idade = parseInt(idadeString);

        if (idadeString === "" || isNaN(idade)) {
            resultadoElement.textContent = "Por favor, digite um número válido.";
            resultadoElement.className = 'error';
            return;
        }
        
        if (idade < 0) {
            resultadoElement.textContent = "A idade não pode ser negativa.";
            resultadoElement.className = 'error';
            return;
        }

        let classificacao = "";
        if (idade >= 0 && idade < 15) {
            classificacao = "Criança";
        } else if (idade >= 15 && idade < 30) {
            classificacao = "Jovem";
        } else if (idade >= 30 && idade < 60) {
            classificacao = "Adulto";
        } else {
            classificacao = "Idoso";
        }

        resultadoElement.textContent = `Com ${idade} anos, a classificação é: ${classificacao}.`;
        resultadoElement.className = '';
    }

    verifyButton.addEventListener('click', verificarFaixaEtaria);

    inputElement.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            verificarFaixaEtaria();
        }
    });
});