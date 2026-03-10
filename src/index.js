import readline from "readline/promises";
import { stdin as input, stdout as output } from "process";
const player1 = {
    NOME : "Mario",
    VELOCIDADE : 4,
    MANOBRABILIDADE : 3,
    PODER : 3,
    PONTOS: 0,
};
    //OBJETO É UMA COLEÇÃO DE PROPRIEDADES E VALORES 
const player2 = {
    NOME : "Luigi",
    VELOCIDADE : 3,
    MANOBRABILIDADE : 4,
    PODER : 4,
    PONTOS: 0,
};
const player3 = {
    NOME : "Peach",
    VELOCIDADE : 3,
    MANOBRABILIDADE : 4,
    PODER : 2,
    PONTOS: 0,
};
const player4 = {
    NOME : "Yoshi",
    VELOCIDADE : 2,
    MANOBRABILIDADE : 4,
    PODER : 3,
    PONTOS: 0,
};
const player5 = {
    NOME : "Bowser",
    VELOCIDADE : 5,
    MANOBRABILIDADE : 2,
    PODER : 5,
    PONTOS: 0,
};
const player6 = {
    NOME : "Donkey kong",
    VELOCIDADE : 2,
    MANOBRABILIDADE : 2,
    PODER : 5,
    PONTOS: 0,
};

async function choicePlayer() {

    const rl = readline.createInterface({ input, output });

    console.log("Vamos iniciar a corrida 🏁");
    console.log("Primeiro escolha seu jogador");
    console.log("1 - Mario");
    console.log("2 - Luigi");
    console.log("3 - Peach");
    console.log("4 - Yoshi");
    console.log("5 - Bowser");
    console.log("6 - Donkey kong");

    const escolha = await rl.question("Digite o número: ");
    rl.close();

    if(escolha == 1){
        console.log(player1.NOME)
        return player1;
    }else if(escolha == 2){
        console.log(player2.NOME)
        return player2;
    }else if(escolha == 3){
        console.log(player3.NOME)
        return player3;
    }else if(escolha == 4){
        console.log(player4.NOME)
        return player4;
    }else if(escolha == 5){
        console.log(player5.NOME)
        return player5;
    }else if(escolha == 6){
        console.log(player6.NOME)
        return player6;
    }else{
        console.log("ERROR")
    }
   
}

async function choicePlayerComputer() {

    const player = Math.floor(Math.random() * 6) + 1;

    switch(player){
        case 1 :
            return player1;
            
        case 2:
            return player2;

        case 3:
            return player3;

        case 4:
            return player4;

        case 5:
            return player5;

        case 6:
            return player6;
        default:
            console.log("ERROR")
            break;
        
    }


}
//async vai fazer com que a fução espere ser chamada para rodar o dado
async function rollDice(){
    //Math é uma biblioteca matematica 
   return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
    let random = Math.random();
    let result;

    switch(true){
        case random < 0.33:
            result = "RETA";
            break;
        case random < 0.66:
            result = "CURVA";
            break;
        default:
            result = "CONFRONTO";
    }
    return result
}

async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(`${characterName} 🎲  rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult+ attribute}`);
   
}

async function playRaceEngine(character1, character2) {
    for(let round = 1; round < 5; round++){
        console.log(`🏁 Rodada ${round}`);

        //Sortear
        let block = await getRandomBlock();
        console.log(`Bloco: ${block}`);

        //RollDice 
        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        //teste de habilidade
        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;

        //Testando blocos

        if(block == "RETA"){

            totalTestSkill1 = diceResult1 + character1.VELOCIDADE;
            totalTestSkill2 = diceResult2 + character2.VELOCIDADE;

            await logRollResult(character1.NOME, "VELOCIDADE", diceResult1, character1.VELOCIDADE);
            await logRollResult(character2.NOME, "VELOCIDADE", diceResult2, character2.VELOCIDADE);
        }
        if(block == "CURVA"){

            totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE;
            totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE;

            await logRollResult(character1.NOME, "MANOBRABILIDADE", diceResult1, character1.MANOBRABILIDADE);
            await logRollResult(character2.NOME, "MANOBRABILIDADE", diceResult2, character2.MANOBRABILIDADE);
        }
        if(block == "CONFRONTO"){
            let powerResult1 = diceResult1 + character1.PODER;
            let powerResult2 = diceResult2 + character2.PODER;

            console.log(`${character1.NOME} confrontou com ${character2.NOME}! 🥊`);

            await logRollResult(character1.NOME, "PODER", diceResult1, character1.PODER);
            await logRollResult(character2.NOME, "PODER", diceResult2, character2.PODER);   

            //IF ternario
            //resultado esperado (operação) condições ? verdadeiro : falso
            /*
            character2.PONTOS -= powerResult1 > powerResult2 && character2.PONTOS > 0 ? 1 : 0
            character1.PONTOS -= powerResult2 > powerResult1 && character2.PONTOS > 0 ? 1 : 0
            */
            //mensagem condicional 
           

            //if normal
            if(powerResult1 > powerResult2 && character2.PONTOS > 0){

                console.log(`${character1.NOME} venceu o confronto!! ${character2.NOME} perdeu 1 ponto`);
                character2.PONTOS--
            }
            if(powerResult2 > powerResult1 && character1.PONTOS > 0){

                console.log(`${character2.NOME} venceu o confronto!! ${character1.NOME} perdeu 1 ponto`);
                character1.PONTOS--
                
            } 
            console.log(powerResult2 == powerResult1 ? "Confronto empatado" : "");
        }
        
        //Verificando o vencedor 
        if(totalTestSkill1 > totalTestSkill2){
            console.log(`${character1.NOME} marcou um ponto!`);
            character1.PONTOS++;
        }
        else if(totalTestSkill1 < totalTestSkill2){
            console.log(`${character2.NOME} marcou um ponto!`);
            character2.PONTOS++;
        }
        console.log("-------------------------------------------------");
    }
}

async function declareWinner(character1, character2) {

    console.log("Resultado Final:")
    console.log(`${character1.NOME}: ${character1.PONTOS} ponto(S)`);
    console.log(`${character2.NOME}: ${character2.PONTOS} ponto(S)`);

    if(character1.PONTOS > character2.PONTOS){
        console.log(`\n ${character1.NOME} verceu a corrida! PARABENS! 🏆`);
    }else if(character2.PONTOS > character1.PONTOS){
         console.log(`\n ${character2.NOME} verceu a corrida! PARABENS! 🏆`);
    }else{
        console.log("A corrida terminou em EMPATE");
    }

}

//(function)(); É uma função auto invocavel
(async function main() {
    
    const systemPlayer = await choicePlayerComputer();
    const player = await choicePlayer();

    if(systemPlayer.NOME != player.NOME){
        console.log(`🏁🚨 Corrida entre ${player.NOME} e ${systemPlayer.NOME} começando... \n`); 
        //Fala para o codigo esperar a função terminar de executar
        await playRaceEngine(player, systemPlayer);
        await declareWinner(player, systemPlayer);
           
    }else{
        console.log("O personagem é o mesmo")
        await choicePlayerComputer()
    }
    
})();

