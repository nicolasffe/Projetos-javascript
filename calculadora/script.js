// Seleciona os elementos principais da calculadora
const display = document.getElementById('display');
const buttonsContainer = document.querySelector('.buttons');

// Objeto para guardar o estado da calculadora
const calculatorState = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
};

// Função para atualizar o que é mostrado na tela
function updateDisplay() {
    display.textContent = calculatorState.displayValue;
}

// Lida com o clique nos botões
buttonsContainer.addEventListener('click', (event) => {
    const { target } = event; // O elemento que foi clicado (o botão)

    // Se não for um botão, ignora
    if (!target.matches('button')) {
        return;
    }

    // --- Lógica para cada tipo de botão ---

    // Se for um botão de NÚMERO
    if (target.classList.contains('number')) {
        inputDigit(target.textContent);
        updateDisplay();
        return;
    }

    // Se for um botão de OPERADOR (+, -) ou outra AÇÃO
    if (target.classList.contains('operator') || target.classList.contains('equals')) {
        handleOperator(target.dataset.action);
        updateDisplay();
        return;
    }
});

// Função para inserir um dígito na tela
function inputDigit(digit) {
    const { displayValue, waitingForSecondOperand } = calculatorState;

    if (waitingForSecondOperand === true) {
        calculatorState.displayValue = digit;
        calculatorState.waitingForSecondOperand = false;
    } else {
        // Se o valor atual for '0', substitui. Se não, adiciona o dígito.
        calculatorState.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
}

// Função para lidar com as operações
function handleOperator(nextOperator) {
    const { firstOperand, displayValue, operator } = calculatorState;
    const inputValue = parseFloat(displayValue);

    // Se um operador já existe e estamos esperando o segundo número
    if (operator && calculatorState.waitingForSecondOperand) {
        calculatorState.operator = nextOperator; // Troca o operador
        return;
    }

    // Se o primeiro número ainda não foi definido, define agora
    if (firstOperand === null && !isNaN(inputValue)) {
        calculatorState.firstOperand = inputValue;
    } else if (operator) { // Se já temos um operador, calcula o resultado
        const result = calculate(firstOperand, inputValue, operator);
        calculatorState.displayValue = `${parseFloat(result.toFixed(7))}`;
        calculatorState.firstOperand = result;
    }
    
    // --- Ações especiais (C, +/-, =) ---
    switch (nextOperator) {
        case 'clear':
            resetCalculator();
            break;
        case 'negate':
            calculatorState.displayValue = (inputValue * -1).toString();
            break;
        case 'calculate': // Botão de igual
            // Espera pelo próximo número, mas não define um novo operador
            calculatorState.waitingForSecondOperand = true;
            calculatorState.operator = null;
            break;
        default: // Operador + ou -
            calculatorState.waitingForSecondOperand = true;
            calculatorState.operator = nextOperator;
    }
}

// Função que realiza o cálculo
function calculate(firstOperand, secondOperand, operator) {
    if (operator === 'add') {
        return firstOperand + secondOperand;
    } else if (operator === 'subtract') {
        return firstOperand - secondOperand;
    }
    return secondOperand; // Se não houver operador, retorna o segundo número
}

// Função para limpar e resetar a calculadora
function resetCalculator() {
    calculatorState.displayValue = '0';
    calculatorState.firstOperand = null;
    calculatorState.waitingForSecondOperand = false;
    calculatorState.operator = null;
}

// Inicia a tela
updateDisplay();