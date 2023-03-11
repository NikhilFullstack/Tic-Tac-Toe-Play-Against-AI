var a11=0;
var a12=0;
var a13=0;
var a21=0;
var a22=0;
var a23=0;
var a31=0;
var a32=0;
var a33=0;
const a11x=document.querySelector("[a11x]");
const a11o=document.querySelector("[a11o]");
const a12x=document.querySelector("[a12x]");
const a12o=document.querySelector("[a12o]");
const a13x=document.querySelector("[a13x]");
const a13o=document.querySelector("[a13o]");

const a21x=document.querySelector("[a21x]");
const a21o=document.querySelector("[a21o]");
const a22x=document.querySelector("[a22x]");
const a22o=document.querySelector("[a22o]");
const a23x=document.querySelector("[a23x]");
const a23o=document.querySelector("[a23o]");

const a31x=document.querySelector("[a31x]");
const a31o=document.querySelector("[a31o]");
const a32x=document.querySelector("[a32x]");
const a32o=document.querySelector("[a32o]");
const a33x=document.querySelector("[a33x]");
const a33o=document.querySelector("[a33o]");
const res=document.querySelectorAll(".items img");
const logo=document.querySelectorAll("#logo path");
const startdiv=document.querySelector(".start-div");
const wrapper=document.querySelector(".wrapper");
let player;
let winner=0;
const mainchessboard=document.querySelector(".main");
const playerwon=document.querySelector(".winner");
const winnerpara=document.querySelector(".winner h1");
function reset(){
    mainchessboard.classList.remove("pak");
    mainchessboard.classList.add("ind");
    playerwon.classList.remove("ind");
    playerwon.classList.add("pak");
    res.forEach((e)=>{
        try{
        e.classList.remove("ind");
        e.classList.remove("pak");
        }
        catch{

        }
        e.classList.add("pak");
    })
   
 
 a11=0;
 a12=0;
 a13=0;
 a21=0;
 a22=0;
 a23=0;
 a31=0;
 a32=0;
 a33=0;
}
//if player wins winner=1 if comp wins winner=2
function iswinner(){
    if((a11==1 && a12==1 && a13==1) || (a21==1 && a22==1 && a23==1) || (a13==1 && a23==1 && a33==1) || (a12==1 && a22==1 && a32==1) ||
    (a31==1 && a32==1 && a33==1) || (a11==1 && a22==1 && a33==1) || (a13==1 && a22==1 && a31==1) || (a11==1 && a21==1 && a31==1))
    {
        winner=1;
    return true;
    }
    if((a11==2 && a12==2 && a13==2) || (a21==2 && a22==2 && a23==2) || (a13==2 && a23==2 && a33==2) || (a12==2 && a22==2 && a32==2) ||
    (a31==2 && a32==2 && a33==2) || (a11==2 && a22==2 && a33==2) || (a13==2 && a22==2 && a31==2) || (a11==2 && a21==2 && a31==2))
    {
        winner=2;
    return true;
    }
    return false;
}
function ComputerMove(){
    let array=[a11,a12,a13,a21,a22,a23,a31,a32,a33];
    let vec=["a11","a12","a13","a21","a22","a23","a31","a32","a33"];

    //check comp can win in next move
    let cnt=0;
    for(let i=0;i<vec.length;i++){
        let e=vec[i];
        if(eval(`${e}==0`))
        {
            let flag=0;
            eval(`${e}=2`)
            if(!iswinner())
            flag=1;
            if(flag==1)
            eval(`${e}=0`)
            else
            {
                
            console.log("computerwins")
            return vec[cnt];
            }
        }
        cnt++;
    }

    //block player winning move
    cnt=0;
    for(let ij=0;ij<vec.length;ij++){
        let e=vec[ij];
        if(eval(`${e}==0`))
        {
            let flag=0;
            
            eval(`${e}=1`);
            if(!iswinner())
            flag=1;
            if(flag==1)
            eval(`${e}=0`);
            else
            {
            eval(`${e}=2`);
            console.log("Blocked win",e)
            return e;
            }
        }
        cnt++;
    }

    //try to take any corner is they are free
    let corner=[a11,a13,a31,a33];
    let cornerstr=["a11","a13","a31","a33"];

    let avail=[];
    let c123=0;
    let pos=[];
    corner.forEach((e)=>{
        if(e==0)
        {
            avail.push(cornerstr[c123]);
            pos.push(c123);
        }
        c123++;
    });
    if(avail.length>0){
        let ind=Math.round(Math.random(0,avail.length));
        corner[pos[ind]]=2;
        console.log("capture corner",cornerstr[pos[ind]])
        return cornerstr[pos[ind]];
    }

    //try to take center if it is free
    if(a22==0)
    {
        a22=2;
        return "a22";
    }

    //try to more on rest places
    let middle=[a12,a21,a23,a32];
    let middlestr=["a12","a21","a23","a32"];
    avail=[];
    c123=0;
    pos=[]
    middle.forEach((e)=>{
        if(e==0)
        {
            avail.push(middlestr[c123]);
            pos.push(c123);
        }
        c123++;
    });
    if(avail.length>0){
        let ind=Math.round(Math.random(0,avail.length));
        middle[pos[ind]]=2;
        return avail[ind];
    }
    

}
function gameover(){
    const myTimeout = setTimeout(myGreeting, 500);

    function myGreeting() {
    
        mainchessboard.classList.remove("ind");
        mainchessboard.classList.add("pak");
        playerwon.classList.remove("pak");
        playerwon.classList.add("ind");
        winnerpara.textContent="Congoo! You have won the game!"
    }
}
function match(action){
    switch(action){
        case "a11":
            a11=2;break;
        case "a12":
            a12=2;break;
        case "a13":
            a13=2;break;
        case "a21":
            a21=2
    }
}
function fun(){
    let comp=ComputerMove();
        let vec=["a11","a12","a13","a21","a22","a23","a31","a32","a33"];
        let origo=[a11o,a12o,a13o,a21o,a22o,a23o,a31o,a32o,a33o];
        let origx=[a11x,a12x,a13x,a21x,a22x,a23x,a31x,a32x,a33x];
        let valg=[a11,a12,a13,a21,a22,a23,a31,a32,a33];

        if(player==0)
        {
            for(let i=0;i<vec.length;i++)
            {
                let e=vec[i];
                if(comp==e)
                {
                    origo[i].classList.remove("pak")
                    origo[i].classList.add("ind");
                    eval(`${e}= 2`);
                    break;
                }
            }
        }
        else{
            for(let i=0;i<vec.length;i++)
            {
                if(comp==vec[i])
                {
                    origx[i].classList.remove("pak")
                    origx[i].classList.add("ind");
                    const ab =vec[i];
                    eval(`${ab}= 2`);
                    break;
                }
            }
        }
        let test=iswinner();
        if(test==true)
        {
            if(winner==2)
            {
                const myTimeout = setTimeout(myGreeting, 500);
                wrapper.style.scale=1;
                function myGreeting() {
                wrapper.style.scale=1;
                mainchessboard.classList.remove("ind");
                mainchessboard.classList.add("pak");
                playerwon.classList.remove("pak");
                playerwon.classList.add("ind");
                winnerpara.textContent="The computer has beaten you! You lose.";
                }
            }
        }
}
function arr11(){
    if(a11==0)
    {
        a11=1;
        if(chance%2==0)
        {
            a11x.classList.remove("pak");
            a11x.classList.add("ind");
        }
        else
        {
            a11o.classList.remove("pak");
            a11o.classList.add("ind");
        }
        let temp=iswinner();
       if(temp!=true){
        fun();
       }
       else{
        gameover();
       }
    }
}
function arr12(){
    if(a12==0)
    {
        a12=1;
        if(chance%2==0)
        {
            a12x.classList.remove("pak");
            a12x.classList.add("ind");
        }
        else
        {
            a12o.classList.remove("pak");
            a12o.classList.add("ind");
        }
        let temp=iswinner();

       if(temp!=true){
            fun();
       }
       else{
        gameover();
       }
    }
}
function arr13(){
    if(a13==0)
    {
        a13=1;
        if(chance%2==0)
        {
            a13x.classList.remove("pak");
            a13x.classList.add("ind");
        }
        else
        {
            a13o.classList.remove("pak");
            a13o.classList.add("ind");
        }
        let temp=iswinner();

        if(temp!=true){
            fun();
           }
           else{
            gameover();
           }
        }
    }
function arr21(){
    if(a21==0)
    {
        a21=1;
        if(chance%2==0)
        {
            a21x.classList.remove("pak");
            a21x.classList.add("ind");
            
        }
        else
        {
            a21o.classList.remove("pak");
            a21o.classList.add("ind");
            
        }
        let temp=iswinner();

        if(temp!=true){
            fun();
           }
           else{
            gameover();
           }
    }
}
function arr22(){
    if(a22==0)
    {
        a22=1;
        if(chance%2==0)
        {
            a22x.classList.remove("pak");
            a22x.classList.add("ind");
            
        }
        else
        {
            a22o.classList.remove("pak");
            a22o.classList.add("ind");
            
        }
        let temp=iswinner();

        if(temp!=true){
            fun();
           }
           else{
            gameover();
           }
    }
}
function arr23(){
    if(a23==0)
    {
        a23=1;
        if(chance%2==0)
        {
            a23x.classList.remove("pak");
            a23x.classList.add("ind");
            
        }
        else
        {
            a23o.classList.remove("pak");
            a23o.classList.add("ind");
            
        }
        let temp=iswinner();

        if(temp!=true){
            fun();
           }
           else{
            gameover();
           }
    }
}
function arr31(){
    if(a31==0)
    {
        a31=1;
        if(chance%2==0)
        {
            a31x.classList.remove("pak");
            a31x.classList.add("ind");
            
        }
        else
        {
            a31o.classList.remove("pak");
            a31o.classList.add("ind");
            
        }
        let temp=iswinner();

        if(temp!=true){
            fun();
           }
           else{
            gameover();
           }
    }
}
function arr32(){
    if(a32==0)
    {
        a32=1;
        if(chance%2==0)
        {
            a32x.classList.remove("pak");
            a32x.classList.add("ind");
            
        }
        else
        {
            a32o.classList.remove("pak");
            a32o.classList.add("ind");
            
        }
        let temp=iswinner();

        if(temp!=true){
            fun();
           }
           else{
            gameover();
           }
    }
}
function arr33(){
    if(a33==0)
    {
        a33=1;
        if(chance%2==0)
        {
            a33x.classList.remove("pak");
            a33x.classList.add("ind");
            
        }
        else
        {
            a33o.classList.remove("pak");
            a33o.classList.add("ind");
            
        }
        let temp=iswinner();

        if(temp!=true){
            fun();
           }
           else{
            gameover();
           }
    }
}


let val=0.5;
//svg animation
logo.forEach((e)=>{
    e.style.strokeDasharray=`${e.getTotalLength()}`;
    e.style.strokeDashoffset=`${e.getTotalLength()}`;
    e.classList.add("anim");
    e.style.animationDuration=val+"s";
    // val+=0.2;

})
//x click player=0
function xclick(){
    player=0;
    startdiv.classList.add("pak");
    wrapper.classList.remove("pak");
    wrapper.classList.add("ind");
    chance=0;
}
//o click player=1
function oclick(){
    player=1;
    startdiv.classList.add("pak");
    wrapper.classList.remove("pak");
    wrapper.classList.add("ind");
    chance=1;
}
