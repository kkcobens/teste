let lives = 3;
let currentType = 1;  // 1 para 1º grau, 2 para 2º grau

function generateFirstDegreeEquation() {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    const c = Math.floor(Math.random() * 10) + 1;
    const result = a * c + b;
    return { a, b, c, result };
}

function generateSecondDegreeEquation() {
    const a = Math.floor(Math.random() * 5) + 1;
    const b = Math.floor(Math.random() * 10) - 5;
    const c = Math.floor(Math.random() * 10) - 5;
    const delta = b * b - 4 * a * c;
    return { a, b, c, delta };
}

function solveSecondDegreeEquation(a, b, delta) {
    if (delta < 0) {
        return null;
    } else if (delta === 0) {
        const x = -b / (2 * a);
        return [x, x];
    } else {
        const sqrtDelta = Math.sqrt(delta);
        const x1 = (-b + sqrtDelta) / (2 * a);
        const x2 = (-b - sqrtDelta) / (2 * a);
        return [x1, x2];
    }
}

function displayEquation() {
    const equationType = document.getElementById('equationType').value;
    currentType = parseInt(equationType);
    let equation, x1, x2;
    
    if (currentType === 1) {
        equation = generateFirstDegreeEquation();
        document.getElementById('equation').textContent = `${equation.a}x + ${equation.b} = ${equation.result}`;
        document.getElementById('equation').dataset.answer = equation.c;
        document.getElementById('answer2').style.display = 'none';
    } else {
        equation = generateSecondDegreeEquation();
        const solutions = solveSecondDegreeEquation(equation.a, equation.b, equation.delta);
        
        if (solutions) {
            [x1, x2] = solutions;
            document.getElementById('equation').textContent = `${equation.a}x² + ${equation.b}x + ${equation.c} = 0`;
            document.getElementById('equation').dataset.answer1 = x1;
            document.getElementById('equation').dataset.answer2 = x2;
            document.getElementById('answer2').style.display = 'inline-block';
        } else {
            displayEquation();  // Gerar uma nova equação se delta for negativo
        }
    }
}

function checkAnswer() {
    const resultDiv = document.getElementById('result');
    const livesDiv = document.getElementById('lives');
    const answer1 = parseFloat(document.getElementById('answer1').value);
    const answer2 = parseFloat(document.getElementById('answer2').value);
    
    let correctAnswer1, correctAnswer2;

    if (currentType === 1) {
        correctAnswer1 = parseFloat(document.getElementById('equation').dataset.answer);
        if (answer1 === correctAnswer1) {
            resultDiv.textContent = 'Correto! Você avança para o próximo nível.';
            displayEquation();
        } else {
            lives -= 1;
            resultDiv.textContent = `Errado! Você tem ${lives} vidas restantes.`;
        }
    } else {
        correctAnswer1 = parseFloat(document.getElementById('equation').dataset.answer1);
        correctAnswer2 = parseFloat(document.getElementById('equation').dataset.answer2);
        if ((answer1 === correctAnswer1 && answer2 === correctAnswer2) || (answer1 === correctAnswer2 && answer2 === correctAnswer1)) {
            resultDiv.textContent = 'Correto! Você avança para o próximo nível.';
            displayEquation();
        } else {
            lives -= 1;
            resultDiv.textContent = `Errado! Você tem ${lives} vidas restantes.`;
        }
    }

    if (lives <= 0) {
        resultDiv.textContent = 'Fim de jogo! Tente novamente.';
        lives = 3;
        displayEquation();
    }

    livesDiv.textContent = `Vidas restantes: ${lives}`;
    document.getElementById('answer1').value = '';
    document.getElementById('answer2').value = '';
}

function startGame() {
    lives = 3;
    displayEquation();
    document.getElementById('lives').textContent = `Vidas restantes: ${lives}`;
}

window.onload = startGame;