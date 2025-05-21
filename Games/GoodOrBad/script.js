document.getElementById('askA').addEventListener('click', () => {           
    alert(/*"You did NOT hear Atlas!"*/"Вие не чухте какво каза Александър!")                                     
});                                                                         
document.getElementById('askB').addEventListener('click', () => {           
    alert(/*"Atlas said that he was a scoundrel."*/"Александър, каза че той е негодник.")
});
document.getElementById('askC').addEventListener('click', () => {
    alert(/*"No, don't believe Basil, he is lying!"*/"Не, не вярвай на Борис, той лъже!")
});

function changeTextOne(){
    document.getElementById('replace-me').innerText = /*"Asking Basil: What did Atlas say?"*/"Питате Борис: Какво каза Александър?" 
}                                                                                       
function changeTextTwo(){                                                               
    document.getElementById('replace-me').innerText = /*"Asking Crystal: Is that true?"*/"Питате Васил: Товавярно ли е?"   
}
function changeTextThree(){
    document.getElementById('replace-me').innerText = /*"What are Аtlas, Basil and Crystal?"*/"Какви са Александър, Борис и Васил?"
}

let wrongAnswersGivenCount = 0;     
let correctAnswersGivenCount = 0    
                                                                                            
                                                                                            
function checkStringA() {                                                                   
                                                                                            
    let inputValueA = document.getElementById("txtFieldA").value.toLowerCase();   
    let predefinedStringA = "noble";                                     

    let resultA = inputValueA === predefinedStringA;                            
    let resultElement = document.getElementById('resultA');                     

    let imageElement = document.createElement('img');
    imageElement.setAttribute('alt', 'Result Image');
    imageElement.classList.add('result-image');

    if (resultA) {
        imageElement.setAttribute('src', 'Images/GreenTick.png');
        document.getElementById('correctSound').play();      
        correctAnswersGivenCount++;
        resultElement.innerHTML = '';
        resultElement.appendChild(imageElement);
    } else {
        imageElement.setAttribute('src', 'Images/RedX.png');
        document.getElementById('incorrectSound').play();
        wrongAnswersGivenCount++;
        resultElement.innerHTML = '';
        resultElement.appendChild(imageElement);
    }

}
function checkStringB() { 

    let inputValueB = document.getElementById("txtFieldB").value.toLowerCase();
    let predefinedStringB = "scoundrel";

    let resultB = inputValueB === predefinedStringB;
    let resultElement = document.getElementById('resultB');

    let imageElement = document.createElement('img');
    imageElement.setAttribute('alt', 'Result Image');
    imageElement.classList.add('result-image'); 

    if (resultB) {
        imageElement.setAttribute('src', 'Images/GreenTick.png');
        document.getElementById('correctSound').play();
        correctAnswersGivenCount++;
        resultElement.innerHTML = ''; 
        resultElement.appendChild(imageElement);
    } else {
        imageElement.setAttribute('src', 'Images/RedX.png');
        document.getElementById('incorrectSound').play();
        wrongAnswersGivenCount++;
        resultElement.innerHTML = ''; 
        resultElement.appendChild(imageElement);
    }

}
function checkStringC() { 

    let inputValueC = document.getElementById("txtFieldC").value.toLowerCase();
    let predefinedStringC = "noble";

    let resultC = inputValueC === predefinedStringC;
    let resultElement = document.getElementById('resultC');

    let imageElement = document.createElement('img');
    imageElement.setAttribute('alt', 'Result Image');   
    imageElement.classList.add('result-image');

    if (resultC) {
        imageElement.setAttribute('src', 'Images/GreenTick.png');
        document.getElementById('correctSound').play();
        correctAnswersGivenCount++;
        resultElement.innerHTML = ''; 
        resultElement.appendChild(imageElement);
    } else {
        imageElement.setAttribute('src', 'Images/RedX.png');
        document.getElementById('incorrectSound').play();
        wrongAnswersGivenCount++;
        resultElement.innerHTML = '';
        resultElement.appendChild(imageElement);
    }

}

document.getElementById('revealAnswer').addEventListener('click', () => {      

    if(wrongAnswersGivenCount >= 6){                                            
        document.getElementById('answer').textContent = /*"No one can say of himself that he is a scoundrel. If a scoundrel says he is, he is telling the truth, but they always lie. If a noble says about himself that he is a scoundrel, then he will lie, and they always tell the truth => therefore: if A is a scoundrel, B tells the truth, but there is no way A would have said that he himself is a scoundrel, if A is a noble, then B is lying (so he is a scoundrel) and C is telling the truth So B is a scoundrel and C is a noble!"*/"Никой не може да каже за себе си, че е негодник. Ако един негодник каже, че е, той казва истината, но те винаги лъжат. Ако благородник каже за себе си, че е негодник, значи ще излъже, а те винаги казват истината => следователно: ако Александър е негодник, Борис казва истината, но няма как Александър да е казал, че самият той е негодник, ако Александър е благородник, то Борис лъже (значи е негодник) и Васил казва истината, значи Борис е негодник, а Васил е благородник!"
    }else if(wrongAnswersGivenCount >= 3 && wrongAnswersGivenCount <= 5){       
        document.getElementById('answer').textContent = /*"A little guidance before the final answer: No one can say of himself that he is a scoundrel. Now with this hint, try again."*/"Малко насоки преди даване на пълен отговор: Никой не може да каже за себе си, че е негодник. Ако един негодник каже, че е, той казва истината, но те винаги лъжат. Ако благородник каже за себе си, че е негодник, значи ще излъже, а те винаги казват истината."
    }else{                                                                      
        document.getElementById('answer').textContent = /*"Try to play a little first ;D"*/"Опитайте да пойграете малко ;D"
    }
    
    if(correctAnswersGivenCount >= 3){          
        document.getElementById('answer').textContent = /*"No one can say of himself that he is a scoundrel. If a scoundrel says he is, he is telling the truth, but they always lie. If a noble says about himself that he is a scoundrel, then he will lie, and they always tell the truth => therefore: if A is a scoundrel, B tells the truth, but there is no way A would have said that he himself is a scoundrel, if A is a noble, then B is lying (so he is a scoundrel) and C is telling the truth So B is a scoundrel and C is a noble!"*/"Никой не може да каже за себе си, че е негодник. Ако един негодник каже, че е, той казва истината, но те винаги лъжат. Ако благородник каже за себе си, че е негодник, значи ще излъже, а те винаги казват истината => следователно: ако Александър е негодник, Борис казва истината, но няма как Александър да е казал, че самият той е негодник, ако Александър е благородник, то Борис лъже (значи е негодник) и Васил казва истината, значи Борис е негодник, а Васил е благородник!"
        document.getElementById('replace-me').innerText = /*"You won!!!"*/"Вие спечелихте!!!";
    }

});

