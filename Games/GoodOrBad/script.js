document.getElementById('askA').addEventListener('click', () => {           
    alert("You did NOT hear Atlas")                                     
});                                                                         
document.getElementById('askB').addEventListener('click', () => {           
    alert("Atlas said that he was a scoundrel.")
});
document.getElementById('askC').addEventListener('click', () => {
    alert("No, don't believe Basil, he is lying!")
});

function changeTextOne(){
    document.getElementById('replace-me').innerText = "Asking Basil: Какво каза A?"         
}                                                                                       
function changeTextTwo(){                                                               
    document.getElementById('replace-me').innerText = "Asking Crystal: Това вярно ли е?"      
}
function changeTextThree(){
    document.getElementById('replace-me').innerText = "What are Аtlas, Basil and Crystal?"
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
        document.getElementById('answer').textContent = "No one can say of himself that he is a scoundrel. If a scoundrel says he is, he is telling the truth, but they always lie. If a noble says about himself that he is a scoundrel, then he will lie, and they always tell the truth => therefore: if A is a scoundrel, B tells the truth, but there is no way A would have said that he himself is a scoundrel, if A is a noble, then B is lying (so he is a scoundrel) and C is telling the truth So B is a scoundrel and C is a noble!"
    }else if(wrongAnswersGivenCount >= 3 && wrongAnswersGivenCount <= 5){       
        document.getElementById('answer').textContent = "A little guidance before the final answer: No one can say of himself that he is a scoundrel. Now with this hint, try again."
    }else{                                                                      
        document.getElementById('answer').textContent = "Try to play a little first ;D"
    }
    
    if(correctAnswersGivenCount >= 3){          
        document.getElementById('answer').textContent = "No one can say of himself that he is a scoundrel. If a scoundrel says he is, he is telling the truth, but they always lie. If a noble says about himself that he is a scoundrel, then he will lie, and they always tell the truth => therefore: if A is a scoundrel, B tells the truth, but there is no way A would have said that he himself is a scoundrel, if A is a noble, then B is lying (so he is a scoundrel) and C is telling the truth So B is a scoundrel and C is a noble!";
        document.getElementById('replace-me').innerText = "You won!!!";
    }

});

