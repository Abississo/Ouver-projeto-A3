function mostrarBotoes() {
    // Oculta o botão "Iniciar"
    document.getElementById('iniciar').style.display = 'none';
    
    // Seleciona a div dos botões das notas musicais
    var botoesNotas = document.getElementById("botoes-notas");
    
    // Verifica se os botões estão visíveis
    if (botoesNotas.style.display === "none") {
        botoesNotas.style.display = "flex";
        botoesNotas.classList.add('show');
    }
}

function playSound(soundFile, event) {
    var audio = new Audio(soundFile);
    audio.play();

    var botao = event.currentTarget;
    var botaoRect = botao.getBoundingClientRect();
    var cor = window.getComputedStyle(botao).backgroundColor;

    // Gera uma quantidade aleatória de bolinhas entre 5 e 15
    var quantidadeBolinhas = Math.floor(Math.random() * 11) + 5;

    for (var i = 0; i < quantidadeBolinhas; i++) {
        setTimeout(function() {
            criarBolinha(botaoRect, cor);
        }, Math.random() * 2000); // Intervalo de início de queda aleatório entre 0 e 2000 milissegundos
    }
}

function criarBolinha(botaoRect, cor) {
    var bolinha = document.createElement('div');
    bolinha.classList.add('bolinha');
    bolinha.style.backgroundColor = cor;

    // Posição inicial aleatória dentro do botão
    var x = Math.random() * botaoRect.width;
    var y = Math.random() * botaoRect.height;
    bolinha.style.left = (botaoRect.left + x) + 'px';
    bolinha.style.top = (botaoRect.top + y) + 'px';

    document.body.appendChild(bolinha);

    // Define uma animação com duração aleatória para a queda
    bolinha.style.animationDuration = (Math.random() * 2 + 1) + 's';

    // Remove a bolinha após a animação de descida
    bolinha.addEventListener('animationend', function() {
        bolinha.remove();
    });

    // Verifica a colisão com os botões e evita que as bolinhas ultrapassem
    setInterval(function() {
        var bolinhaRect = bolinha.getBoundingClientRect();
        if (
            bolinhaRect.left < botaoRect.right &&
            bolinhaRect.right > botaoRect.left &&
            bolinhaRect.top < botaoRect.bottom &&
            bolinhaRect.bottom > botaoRect.top
        ) {
            bolinha.style.display = 'none';
        }
    }, 10);
}
