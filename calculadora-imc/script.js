document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('imc-form');
    const nomeInput = document.getElementById('nome');
    const alturaInput = document.getElementById('altura');
    const pesoInput = document.getElementById('peso');
    const resultadoDiv = document.getElementById('resultado');

    form.addEventListener('submit', (event) => {
        
        event.preventDefault();

        const nome = nomeInput.value.trim();
        const alturaCm = parseFloat(alturaInput.value);
        const peso = parseFloat(pesoInput.value);

        if (!nome || isNaN(alturaCm) || isNaN(peso) || alturaCm <= 0 || peso <= 0) {
            resultadoDiv.innerHTML = `<p>Por favor, preencha todos os campos com valores válidos.</p>`;
            resultadoDiv.className = 'resultado-card baixo-peso-grave'; 
            resultadoDiv.classList.remove('hidden');
            return;
        }
        const alturaM = alturaCm / 100;
        const imc = peso / (alturaM ** 2);

        const { classificacao, classeCss } = obterClassificacao(imc);

        resultadoDiv.innerHTML = `<strong>${nome}</strong>, seu índice de massa corporal é <strong>${imc.toFixed(2)}</strong>, sendo classificado como: <strong>${classificacao}</strong>.`;
        
        resultadoDiv.className = `resultado-card ${classeCss}`; 
        resultadoDiv.classList.remove('hidden');
    });

    /**
     * @param {number} imc - O valor do índice de massa corporal.
     * @returns {object} - Um objeto com a 'classificacao' e a 'classeCss'.
     */
    function obterClassificacao(imc) {
        if (imc < 16) return { classificacao: "Baixo peso muito grave", classeCss: "baixo-peso-grave" };
        if (imc < 17) return { classificacao: "Baixo peso grave", classeCss: "baixo-peso-grave" };
        if (imc < 18.5) return { classificacao: "Baixo peso", classeCss: "baixo-peso" };
        if (imc < 25) return { classificacao: "Peso normal", classeCss: "normal" };
        if (imc < 30) return { classificacao: "Sobrepeso", classeCss: "sobrepeso" };
        if (imc < 35) return { classificacao: "Obesidade grau I", classeCss: "obesidade" };
        if (imc < 40) return { classificacao: "Obesidade grau II", classeCss: "obesidade" };
        return { classificacao: "Obesidade grau III", classeCss: "obesidade" };
    }
});