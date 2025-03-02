// Щв разгледаме кода по блокове за да е по-четим!

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

// Блок I

document.getElementById('askA').addEventListener('click', () => {           // В Блок I 
    alert("Вие НЕ чухте отговора на A")                                     // Се занимаваме с диалога и условието.
});                                                                         // Имаме EventListener-ли с дадено id на бутона за който отговарят.
document.getElementById('askB').addEventListener('click', () => {           // При натискане на един от тези 3 бутона ще излезе alert със съответно зададения текст.
    alert("A каза, че е негодник.")
});
document.getElementById('askC').addEventListener('click', () => {
    alert("Не, не вярвай на B, той лъже!")
});

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

// Блок II

function changeTextOne(){
    document.getElementById('replace-me').innerText = "Питате B: Какво каза A?"         // В Блок II
}                                                                                       // Се занимаваме отново с диалога и условието, но този път той няма да е под формата на alert, а под формата на променящ се ред текст.
function changeTextTwo(){                                                               // Тук при първоначално натискане на бутона "Попитай:[A,B,C]" html-ла вика функцията закачена към натиснатия бутон, съответно имаме три бутона и три функции отговарящи за тях. 
    document.getElementById('replace-me').innerText = "Питате C: Това вярно ли е?"      // След натискане на бутона и влизане в дадената функция взимаме елемента(този елемент е именно променящият се текст, за това и id-то е едно и също) по id в случая id-то е 'replace-me' и overwrite-ваме текста.
}
function changeTextThree(){
    document.getElementById('replace-me').innerText = "Какви са А, B и C?"
}

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

// Блок III

let wrongAnswersGivenCount = 0;     // <-- Тазиа променлива е създадена, за да брой дадените грешни отговори 
let correctAnswersGivenCount = 0    // <-- Тазиа променлива е създадена, за да брой дадените правилни отговори
                                                                                            // В Блок III
                                                                                            // Се занимаваме с проверката на текстовите полета с отговорите на играча, както и следенето бройката на грешните отговори.
function checkStringA() {                                                                   // Начина по който го правим е следния:
                                                                                            
    let inputValueA = document.getElementById("txtFieldA").value.toLowerCase(); // Тук създаваме променливата inputValueA, която получава текста написан в текстовото поле превърнат в малки букви.   
    let predefinedStringA = "благородник";                                      // Това е променливата която съхранява верния отговор.

    let resultA = inputValueA === predefinedStringA;                            // Пражим рожерка сравнявайки двете променливи. Отговора ще е или true или false.
    let resultElement = document.getElementById('resultA');                     

                                             // Създаваме image element 
    let imageElement = document.createElement('img');
    imageElement.setAttribute('alt', 'Result Image');
    imageElement.classList.add('result-image'); // Клас който позволява маниполацията на изображението.

    if (resultA) {
        imageElement.setAttribute('src', 'Images/GreenTick.png'); // Изкарване на изображението на екрана
        document.getElementById('correctSound').play();           // Пускане на звука
        correctAnswersGivenCount++;
        resultElement.innerHTML = ''; // Изчистваме предишното съдържание
        resultElement.appendChild(imageElement);
    } else {
        imageElement.setAttribute('src', 'Images/RedX.png');
        document.getElementById('incorrectSound').play();
        wrongAnswersGivenCount++;
        resultElement.innerHTML = ''; // Изчистваме предишното съдържание
        resultElement.appendChild(imageElement);
    }

}
function checkStringB() { 

    let inputValueB = document.getElementById("txtFieldB").value.toLowerCase();
    let predefinedStringB = "негодник";

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
    let predefinedStringC = "благородник";

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

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

// Блок IV

document.getElementById('revealAnswer').addEventListener('click', () => {       // <-- Имаме EventListener с дадено id на бутона за който отговарят. Този бутон е 'revealAnswer' 

    if(wrongAnswersGivenCount >= 6){                                            // <-- Тук вече имаме if() който проверява wrongAnswersGivenCount , в която съхраняваме броя грешни отговори. Съответно ако имеме 6 или повече грешни отговори ще ни даде пълния отговор.
        document.getElementById('answer').textContent = "Никой за себе си не може да каже, че е негодник. Ако негодник каже за себе си че е такъв, то той ще казва истината, пък те винаги лъжат. Ако благородник каже за себе си, че е негодник, то той ще лъже, а те винаги казват истината => следователно: ако А е негодник, В казва истината, но няма как А да е казал, че той самия е негодник ако А е благородник, то В лъже (значи е негодник) и С казва истината Значи В е негодник, а С е благородник !"
    }else if(wrongAnswersGivenCount >= 3 && wrongAnswersGivenCount <= 5){       // <-- Ако грешните ни отговори са в диапазона от 3 до 5, ще ни даде малко помощ под формата на hint
        document.getElementById('answer').textContent = "Малко напътствие преди крайния отговор: Никой за себе си не може да каже, че е негодник. Сега с тази подсказка опитайте отново."
    }else{                                                                      // <-- Ако нямаме никакви ходове ще ни подтикне към това да играем.
        document.getElementById('answer').textContent = "Пробвайте да поиграете първо ;D"
    }
    
    if(correctAnswersGivenCount >= 3){          // <-- Тук вече имаме if() който проверява correctAnswersGivenCount, в която съхраняваме броя правилни отговори. Съответно ако имеме 3 или повече правилни отговора изпълняваме всичко в {}.
        document.getElementById('answer').textContent = "Никой за себе си не може да каже, че е негодник. Ако негодник каже за себе си че е такъв, то той ще казва истината, пък те винаги лъжат. Ако благородник каже за себе си, че е негодник, то той ще лъже, а те винаги казват истината => следователно: ако А е негодник, В казва истината, но няма как А да е казал, че той самия е негодник ако А е благородник, то В лъже (значи е негодник) и С казва истината Значи В е негодник, а С е благородник !";
        document.getElementById('replace-me').innerText = "Браво!!!";
    }

});

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//