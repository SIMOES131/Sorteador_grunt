document.addEventListener('DOMContentLoaded', function() {
    let numerosSorteados = [];

    document.getElementById('form-sorteador').addEventListener('submit', function(evento) {
        evento.preventDefault();
        let numeroMaximo = parseInt(document.getElementById('numero-maximo').value);

        if (numerosSorteados.length >= numeroMaximo) {
            alert('Todos os números possíveis já foram sorteados.');
            return;
        }

        let numeroAleatorio;
        do {
            numeroAleatorio = Math.floor(Math.random() * numeroMaximo) + 1;
        } while (numerosSorteados.includes(numeroAleatorio));

        numerosSorteados.push(numeroAleatorio);

        document.getElementById('resultado-valor').innerText = numeroAleatorio; 
        document.querySelector('.resultado').style.display = 'block'; // o display=block só vai aparecer quando clicarmos no botão
    });
});
