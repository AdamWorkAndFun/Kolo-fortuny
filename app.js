window.onload=function(){
init();
}
//czy litera jest spółgłoska
const isItConsonant=function(letter){
    if(letter==="b"||letter==="c"||letter==="ć"||letter==="d"||letter==="f"||letter==="g"||letter==="h"||letter==="j"||letter==="k"||letter==="l"||letter==="ł"||letter==="ł"||letter==="m"||letter==="n"||letter==="ń"||letter==="p"||letter==="r"||letter==="s"||letter==="t"||letter==="w"||letter==="z"||letter==="ż"||letter==="ź"||letter==="x"){
        return true;
    }else{
        return false;
    }
}
//czy litera jest samogłoską
const isItVowel=function(letter){
    if(letter==='a'||letter==='i'||letter==='e'||letter==='o'||letter==='u'||letter==='ó'||letter==='y'){
        return true;
    }else return false;
}
//dodanie sluchacza do buttona Nowa gra
const init=function(){
    document.querySelector('.controll__Game-button').addEventListener('click',onStart)
}
const base={
    kindPassword:['powiedzenie','serial','film','znani ludzie'],
    powiedzenie:['nigdy nie mów nigdy','nosił wilk razy kilka ponieśli i wilka'],
    serial:['daleko od noszy','m jak miłośc','noce i dnie','czarne chmury','świat według kiepskich','moda na sukces','jeden gniewny charlie'],
    film:['kiler','chłopaki nie płaczą','walka o ogień','harry poter książe tajemnic','cztery wesela i pogrzeb','jak to sie robi z dziewczynami','sami swoi','jak rozpętałem drugą wojnę światową'],
    ludzie:['maciej stoltman','kononowicz krzysztof','andrzej rosiewicz','adam lepak'],
    kind:'',
    round:1,
    rotate:0,
    circleElement:['bankrut',100,1500,300,200,250,100,400,550,250,450,'stop',350,'bankrut',1000,150,300,200,500,100,200,350,150,400],
    // password:["robic czy nie robic","być albo nie być","nie ogladaj sie za siebie"],
    findInPassword:[],
    hidePassword:[],
    pass:'',
    letter:'',
    drawPoints:0,
    player1:'active',
    player2:'unactive',
    player1Points:0,
    player2Points:0,
    player1GeneralPoints:0,
    player2GeneralPoints:0
};
//losujemy haslo
const addPassword=function(){
    base.hidePassword=[];
    base.pass='';
    document.querySelector('.password').innerHTML='';
    document.querySelector('.draw__info').innerHTML='';
    if(base.powiedzenie.length===0){
        base.kindPassword.splice(0,1);
    }else if(base.serial.length===0){base.kindPassword.splice(1,1);}
    else if(base.film.length===0){base.kindPassword.splice(2,1);}
    if(base.kindPassword.length===0){
        base.kindPassword=['powiedzenie','serial','film','znani ludzie'];
        base.powiedzenie=['nigdy nie mów nigdy','nosił wilk razy kilka ponieśli i wilka'];
        base.serial=['daleko od noszy','m jak miłośc','noce i dnie','czarne chmury','świat według kiepskich','moda na sukces','jeden gniewny charlie'];
        base.film=['kiler','chłopaki nie płaczą','walka o ogień','harry poter książe tajemnic','cztery wesela i pogrzeb','jak to sie robi z dziewczynami','sami swoi','jak rozpętałem drugą wojnę światową'];
        base.ludzie=['maciej stoltman','kononowicz krzysztof','andrzej rosiewicz','adam lepak']
    }
    
    let drawPassword=Math.floor(Math.random()*base.kindPassword.length);
    base.kind=base.kindPassword[drawPassword];
    console.log(base.kind)
    if(base.kindPassword[drawPassword]==='powiedzenie') PaswordToDraw(base.powiedzenie);
    if(base.kindPassword[drawPassword]==='serial') PaswordToDraw(base.serial);
    if(base.kindPassword[drawPassword]==='film') PaswordToDraw(base.film);
    if(base.kindPassword[drawPassword]==='znani ludzie') PaswordToDraw(base.ludzie);
    //dodaje puste haslo do htmla
    addPasswordToHtml();
}
//losowanie hasła
const PaswordToDraw=function(array){
    console.log(array)
    let drawPassword=Math.floor(Math.random()*array.length);
    base.pass=array[drawPassword].split('');
    console.log(base.pass)
    array.splice(drawPassword,1);
    console.log(base.pass)
    for(let i=0;i<base.pass.length;i++){
        if(base.pass[i]===' ')base.hidePassword.push(" ");
        else base.hidePassword.push("-");
    }
}
//funkcja dodawania pustego hasla do htmla
const addPasswordToHtml=function(whichClass){
let addDiv=`<div class='round'>Runda ${base.round}</div>`;
    for(let i=0;i<base.hidePassword.length;i++){
        if(base.hidePassword[i]==="-"){
            addDiv+='<div class="letter__white"></div>';
        }
        else if(base.hidePassword[i]===" "){addDiv+='<div class="letter__gray"></div>';}
        else{
            addDiv+=`<div class="letter__white">${base.hidePassword[i]}</div>`;
        }
    }
    addDiv+=`<div class='title'>${base.kind}</div>`;
   document.querySelector('.password').insertAdjacentHTML("beforeend",addDiv);
}
//funkcja dodawania trafionych liter do htmla
const addLetterToHtml=function(){
    let addDiv=`<div class='round'>Runda ${base.round}</div>`;
        for(let i=0;i<base.hidePassword.length;i++){
            if(base.hidePassword[i]==="-"){
                addDiv+='<div class="letter__white"></div>';
            }
            else if(base.hidePassword[i]===" "){addDiv+='<div class="letter__gray"></div>';}
            else{
                addDiv+=`<div class="letter__white"><div class="letter__white-letter">${base.hidePassword[i]}</div></div>`;
            }
        }
        addDiv+=`<div class='title'>${base.kind}</div>`;
       document.querySelector('.password').insertAdjacentHTML("beforeend",addDiv);
}
// aktywujemy pola input oraz ich buttony
const activeLetterAdd=function(){
    document.querySelector('.controll__guessLetter-button').addEventListener('click',addLetter);
    document.querySelector('.controll__buyLetter-button').addEventListener('click',buyLetter);
    document.querySelector('.controll__guessPassword-button').addEventListener('click',getPassword);
    document.querySelector('.controll__guessLetter-text').disabled=false;
    document.querySelector('.controll__buyLetter-text').disabled=false;
    document.querySelector('.controll__guessPassword-text').disabled=false;
}
//dezaktywujemy pola input i ich buttony
const disActivLetterAdd=function(){
    document.querySelector('.controll__guessLetter-button').removeEventListener('click',addLetter);
    document.querySelector('.controll__buyLetter-button').removeEventListener('click',buyLetter);
    document.querySelector('.controll__guessPassword-button').removeEventListener('click',getPassword);
    document.querySelector('.controll__guessLetter-text').disabled=true;
    document.querySelector('.controll__buyLetter-text').disabled=true;
    document.querySelector('.controll__guessPassword-text').disabled=true;
}
// podajemy literke którą chcemy sprawdzic
const addLetter=function(){
    let input=document.querySelector('.controll__guessLetter-text');
    base.letter=input.value;
    input.value='';
    if(base.letter.length===1){
    if(isItConsonant(base.letter)){
        disActivLetterAdd();
        isLetterInPassword();
        //input.disabled=true;
    }
    else{
        console.log('podaj spolgloske')
        document.querySelector('.draw__info').innerHTML='Musisz podać spółgłoskę!!!</br>Tracisz kolejkę';
        disActivLetterAdd();addListenerCircle();
        changePlayer();
    }
}else{}
  
}
const addListenerCircle=function(){
    document.querySelector('.controll__Game-spin').addEventListener('click',moveCircle);    
}
const removeListenerCircle=function(){
    document.querySelector('.controll__Game-spin').removeEventListener('click',moveCircle);    
}
//sprawdzamy czy liteka jest trafiona
const isLetterInPassword=function(){
    let struck=0;
    let isItFind=0;
    for(let j=0;j<base.findInPassword.length;j++){
        if(base.findInPassword[j]===base.letter){
            isItFind++;
        }
    }
   if (isItFind===0){
    for(let i=0;i<base.pass.length;i++){
        if(base.pass[i]===base.letter){
            base.hidePassword.splice(i,1,base.letter);
            base.findInPassword.push(base.letter);
            struck++;   
        }
    }
   }
    //nie ma litery
    if(struck===0){
        console.log('pudlo')
        document.querySelector('.player__1').classList.toggle('active');
        document.querySelector('.player__2').classList.toggle('active');
       addListenerCircle();
       changePlayer();
       document.querySelector('.draw__info').innerHTML='Pudło! </br>Przeciwnik kręci Kołem';
    }//znaleziono litere
    else{
        document.querySelector('.password').innerHTML='';
        addLetterToHtml();
        addPoints();
        disActivLetterAdd();
        addListenerCircle();
        document.querySelector('.draw__info').innerHTML='Tarfiony!Możesz </br> kupic samogłoskę za 250<br/>zakręcic kołem lub</br>Podać hasło!!!';
        document.querySelector('.controll__guessPassword-button').addEventListener('click',getPassword);
        document.querySelector('.controll__guessPassword-text').disabled=false;
        if(base.player1==='active' && base.player1Points>=250 || base.player2==='active' && base.player2Points>=250){
            document.querySelector('.controll__buyLetter-button').addEventListener('click',buyLetter);
            document.querySelector('.controll__buyLetter-text').disabled=false;
        }
    }
}
//dodawanie punktow po trfoinej literze
const addPoints=function(){
    if(base.player1==='active'){
        base.player1Points+=base.drawPoints;
        document.querySelector('.player__1-points').innerHTML=base.player1Points;
    }else if(base.player2==='active'){
        base.player2Points+=base.drawPoints;
        document.querySelector('.player__2-points').innerHTML=base.player2Points;
    }
}
//odejmowanie punktow
const removePoints=function(){
    if(base.player1==='active'){
        base.player1Points-=250;
        document.querySelector('.player__1-points').innerHTML=base.player1Points;
    }else if(base.player2==='active'){
        base.player2Points-=250;
        document.querySelector('.player__2-points').innerHTML=base.player2Points;
    }
}
//kupujemy  samogłoskę
const buyLetter=function(){
    disActivLetterAdd();
   base.letter= document.querySelector('.controll__buyLetter-text').value;
   console.log(base.letter)
   document.querySelector('.controll__buyLetter-text').value='';
   if(base.letter.length===1){
    if(isItVowel(base.letter)){
        let struck=0;
    for(let i=0;i<base.pass.length;i++){
        if(base.pass[i]===base.letter && base.hidePassword[i]!==base.letter){
            base.hidePassword.splice(i,1,base.letter);
            struck++;   
        }
    }
    //nie ma litery
    if(struck===0){
        console.log('pudlo')
        document.querySelector('.draw__info').innerHTML='Pudło! </br>Przeciwnik kręci Kołem';
        document.querySelector('.player__1').classList.toggle('active');
        document.querySelector('.player__2').classList.toggle('active');
       addListenerCircle();
    }//znaleziono litere
    else{
        document.querySelector('.password').innerHTML='';
        document.querySelector('.draw__info').innerHTML='Tarfiony! </br>Możesz kupic </br>samogłoskę za 250 <br/>zakręcic kołem lub</br>Podać hasło!!!';
        addLetterToHtml();
        removePoints();
        addListenerCircle();
            document.querySelector('.controll__buyLetter-button').removeEventListener('click',buyLetter);
            document.querySelector('.controll__buyLetter-text').disabled=true;
            document.querySelector('.controll__guessPassword-button').addEventListener('click',getPassword);
            document.querySelector('.controll__guessPassword-text').disabled=false;    
    }
    }else{
        disActivLetterAdd();addListenerCircle();
        document.querySelector('.draw__info').innerHTML='Musisz podać samogłoskę!!!</br>Tracisz kolejkę';
        changePlayer();
    }
   }
}
//odgadujemy hasło
const getPassword=function(){
    disActivLetterAdd();
     let password=document.querySelector('.controll__guessPassword-text').value;
    document.querySelector('.controll__guessPassword-text').value='';
    password=password.toLowerCase();
    password=password.split("");
    let numberToAccess=base.pass.length;
    let number=0;
    if(base.pass.length===password.length){
        for (let i=0;i<base.pass.length;i++){
            if(base.pass[i]===password[i])number++;
    }
    }
    if(number===numberToAccess){
        console.log('udalo sie');
        if(base.player1==="active"){
            base.player1GeneralPoints+=base.player1Points;
        }else if(base.player2==='active'){
            base.player2GeneralPoints+=base.player2Points;
        }
        base.player1Points=0;base.player2Points=0;
        let addDiv='';
        for(let i=0;i<base.hidePassword.length;i++){
         if(base.hidePassword[i]===" "){addDiv+='<div class="letter__gray"></div>';}
            else{
                addDiv+=`<div class="letter__white"><div class="letter__white-letter">${password[i]}</div></div>`;
            }
        }
        document.querySelector('.draw__info').innerHTML='Tarfiony! </br>Brawo!!!';
        document.querySelector('.password').innerHTML='';
       document.querySelector('.password').insertAdjacentHTML("beforeend",addDiv);
       if (base.round<3){
        setTimeout(function(){  ResetShowPoints();
            nextRound()
            ;document.querySelector('.draw__info').innerHTML='Zakręć kołem';},4000)
       }else{
           disActivLetterAdd();
           if(base.player1GeneralPoints>base.player2GeneralPoints){
            document.querySelector('.draw__info').innerHTML=`Koniec gry!</br>Wygrał Gracz-1 z sumą </br>${base.player1GeneralPoints}`;
           }else if(base.player2GeneralPoints>base.player1GeneralPoints){
            document.querySelector('.draw__info').innerHTML=`Koniec gry!</br>Wygrał Gracz-2 z sumą </br>${base.player2GeneralPoints}`;
           }
           else{
            document.querySelector('.draw__info').innerHTML=`Koniec gry!Remis </br>każdy z graczy z sumą </br>${base.player1GeneralPoints}`;
           }

       }
 
       
    }else{
        console.log('nie poszlo')
        document.querySelector('.draw__info').innerHTML='Pudło! </br>Przeciwnik kręci Kołem';
        changePlayer();
        document.querySelector('.controll__guessPassword-button').removeEventListener('click',getPassword);
        document.querySelector('.controll__guessPassword-text').disabled=true;
        addListenerCircle();
    }
}
//kolejna runda
const nextRound=function(){
    base.round++;
    base.findInPassword=[];
    addPassword();
}
//reset wyswietlania punktow
const ResetShowPoints=function(){
    document.querySelector('.player__1-points ').innerHTML=base.player1Points;
    document.querySelector('.player__2-points').innerHTML=base.player1Points;
}
//zmina aktywnego gracza
const changePlayer=function(){
    if (base.player1==='active'){
        base.player1="unactive";
        document.querySelector('.player__1').classList.remove('active');
        base.player2='active';
        document.querySelector('.player__2').classList.add('active');
    }else if(base.player2==='active'){
        base.player1="active";
        document.querySelector('.player__1').classList.add('active');
        base.player2='unactive';
        document.querySelector('.player__2').classList.remove('active');
    }
}
const reset=function(){
    base.kindPassword=['powiedzenie','serial','film','znani ludzie'];
    base.powiedzenie=['nigdy nie mów nigdy','nosił wilk razy kilka ponieśli i wilka'];
    base.serial=['daleko od noszy','m jak miłośc','noce i dnie','czarne chmury','świat według kiepskich','moda na sukces','jeden gniewny charlie'];
    base.film=['kiler','chłopaki nie płaczą','walka o ogień','harry poter książe tajemnic','cztery wesela i pogrzeb','jak to sie robi z dziewczynami','sami swoi','jak rozpętałem drugą wojnę światową'];
    base.ludzie=['maciej stoltman','kononowicz krzysztof','andrzej rosiewicz','adam lepak'],
    kind='',
    base.round=1;
    base.rotate=0;
    base.circleElement=['bankrut',100,1500,300,200,250,100,400,550,250,450,'stop',350,'bankrut',1000,150,300,200,500,100,200,350,150,400];
    base.password=["robic czy nie robic","być albo nie być","nie ogladaj sie za siebie"];
    base.findInPassword=[];
    base.hidePassword=[];
    base.pass='';
    base.letter='';
    base.drawPoints=0;
    base.player1='active';
    base.player2='unactive';
    base.player1Points=0;
    base.player2Points=0;
    document.querySelector('.circle').style.transition="all .1s";
    document.querySelector('.circle').style.transform=`rotate(0)`;
    ResetShowPoints();
}
//funkcja startu gry, dodanie hasła i słuchacza koła
const onStart=function(){
    reset();
    addPassword();
    setTimeout(() => {
        addListenerCircle();
    }, 200);
}//banktur-susuwamy punkty
const deletePoint=function(){
    if(base.player1==='active'){base.player1Points=0}
    else if(base.player2==='active'){base.player2Points=0;}
}
//krecimy kolem
async function moveCircle(){
    removeListenerCircle();
    disActivLetterAdd();
    let numberRotate=Math.floor(Math.random()*23)+1
    let selected=base.circleElement[numberRotate-1];
    base.drawPoints=selected;
    let tab0=base.circleElement.slice();
    let tabFirst=base.circleElement.slice(numberRotate-1);
    let howMany=25-numberRotate;
    let tabSecond=tab0.splice(numberRotate-1,howMany);
    base.circleElement.length=0;
    base.circleElement=tabFirst.concat(tab0);
    base.rotate+=(numberRotate*15)-15+360;
    let circle=  document.querySelector('.circle');
    circle.style.transition="all 4s cubic-bezier(.05,.83,1,1)";
    circle.style.transform=`rotate(${base.rotate}deg)`;
    //jeżeli wylosowalismy bankrut
    if(selected==='bankrut'|| selected==='stop'){
        setTimeout(function(){
            if(selected==='bankrut'){
                document.querySelector('.draw__info').innerHTML='Tracisz punkty i kolejkę';
                deletePoint();
            }else{
                document.querySelector('.draw__info').innerHTML='Tracisz kolejkę';
            }
            disActivLetterAdd();
            addListenerCircle();
            changePlayer();
        },4000);
    }// prubujemyu zgadnac litere, kupic, lub odgadnac haslo 
    else{
        setTimeout(function(){
            document.querySelector('.controll__guessLetter-button').addEventListener('click',addLetter);
            document.querySelector('.controll__guessLetter-text').disabled=false;
            //activeLetterAdd();
            document.querySelector('.draw__info').innerHTML='Podaj spółgłoskę';
          },4000);
    }
}
