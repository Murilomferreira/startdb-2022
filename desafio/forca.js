class Forca {
    vidas = 6;

    palavra = '';

    palavraSecreta = '';

    // Dicionário no formato => { [key = letra chutada]: value }
    // value = true significa que essa letra pertence a palavra
    // value = false significa que essa letra não pertence a palavra
    letrasChutadas = {};

    constructor(palavraSecreta = "") {
        this.palavraSecreta = palavraSecreta
        this.palavra = this.geraPalavraDoJogo();
    }

    chutar(letra) {
        if (!this.podeChutar(letra)) {
            console.log(`A letra ${letra} já foi chutada, tente com outra letra.`);
            return;
        }

        if (this.verificaSeAcertouChute(letra)) {
            this.adicionaChuteCorreto(letra);
            this.palavra = this.geraPalavraDoJogo();
        } else {
            this.vidas--;
        }
    }

    podeChutar(letra) {
        const aindaTemVidas = this.vidas > 0;
        const letraNaoFoiChutada = !this.letrasChutadas[letra];
        return aindaTemVidas && letraNaoFoiChutada;
    }

    adicionaLetraAosChutes(letra) {
        this.letrasChutadas[letra] = false;
    }

    adicionaChuteCorreto(letra) {
        this.letrasChutadas[letra] = true;
    }

    verificaSeAcertouChute(letra) {
        return this.palavraSecreta.includes(letra);
    }

    geraPalavraDoJogo() {
        return [...this.palavraSecreta].map((letra) => {
            if (this.letrasChutadas[letra]) {
                return letra;
            } else {
                return '_';
            }
        });
    }

    // Possiveis valores: "perdeu", "aguardando chute" ou "ganhou"
    buscarEstado() {
        const ganhou = this.palavra.join('') === this.palavraSecreta

        if (ganhou) {
            return 'ganhou';
        }

        if (this.vidas === 0) {
            return 'perdeu';
        }

        return 'aguardando chute'
    }

    buscarDadosDoJogo() {
        const letrasChutadas = Object.keys(this.letrasChutadas);
        return {
            letrasChutadas, // Deve conter todas as letras chutadas
            vidas: this.vidas, // Quantidade de vidas restantes
            palavra: this.palavra // Deve ser um array com as letras que já foram acertadas ou o valor "_" para as letras não identificadas
        }
    }
}

module.exports = Forca;

/*
chutar = letra, e verificar quantas vezes ela ta na palavra.
buscarEstado chama buscar dados do jogo e verifica se eu acertei todas letras da palavra se nao olha pras vidas. 


*/
