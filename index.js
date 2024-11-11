const slider=document.querySelector("[data-lengthslider]");
const lengthdisplay=document.querySelector("[data-length]")
const passworddisplay=document.querySelector("[data-passwordDisplay]")
const copybtn=document.querySelector("[data-copy]")
const copymsg=document.querySelector("[data-copymsg]")
const uppercase=document.querySelector("#uppercase")
const lowercase=document.querySelector("#lowercase")
const numbers=document.querySelector("#numbers")
const getsymbols=document.querySelector("#symbols");
const indicator=document.querySelector("[data-indicator]");
const generatebtn=document.querySelector(".generatebutton");
const allcheckbox=document.querySelectorAll("input[type=checkbox]")
let password="";
let pwlen=10;
let checkcount=0;
//set strentgh circle to white
setindicator("#ccc");//default color is white

//set passwods length
function handleslider()
{
    slider.value=pwlen;//default value 
    lengthdisplay.innerText=pwlen;
    // const min=slider.min;
    // const max=slider.max;
    // slider.style.backgroundSize=((pwlen-min)*100/(max-min)) + "% 100%"
}
handleslider();
function setindicator(color)
{
    indicator.style.backgroundColor=color;
    indicator.style.boxShadow=`0px 0px 16px 0px ${color}`;

}
function getrandominteger(min,max)
{
    return Math.floor(Math.random()*(max-min))+min;
}
function genertaerandomnumber()
{
    return getrandominteger(0,9);
}
function generatelowercase()
{
    return String.fromCharCode(getrandominteger(97,123));
}
function generateuppercase()
{
    return String.fromCharCode(getrandominteger(65,91));
}
const symbols="~!@#$%^&*(){}[]_+-=?/>.<,:;|\`'"
function generatesymbols()
{
    const randsymindex=getrandominteger(0,symbols.length);
    return symbols.charAt(randsymindex);
}
function calstrength()
{
    let hasupper=false;
    let haslower=false;
    let hasnum=false;
    let hassym=false;
    if(uppercase.checked) hasupper=true;
    if(lowercase.checked) haslower=true;
    if(numbers.checked) hasnum=true;
    if(symbols.checked) hassym=true;
    if(hasupper && haslower &&(hasnum||hassym)&&pwlen>=8)
        {
             setindicator("#008000");//strong password//green color
        }
    else if(
        (haslower||hasupper)&&
        (hasnum||hassym)&&
        pwlen>=6
    ){
        setindicator("#FFFF00")//medium password//yellow color
    }else{
        setindicator("#FF0000")//weak password//red color
    }    
}

async function copycontent()
{ 
    try{
    await navigator.clipboard.writeText(passworddisplay.value);
    copymsg.innerText="copied ";
    }
    catch(e)
    {
        copymsg.innerText="failed to copy ";
    }
    //this visibles copymsg----copied
    copymsg.classList.add("active")
    setTimeout(()=>{
        copymsg.classList.remove("active");
    },800);
}
function shufflepassword(array)
{
    //fisher yates method
    for(let i=array.length-1;i>0;i--)
        {
            const j=Math.floor(Math.random()*(i+1));
            const temp=array[i];
            array[i]=array[j];
            array[j]=temp;
        }
        let str="";
        array.forEach((el)=>(str+=el));
        return str;
}
function handlecheckboxchange()
{
    checkcount=0;
    allcheckbox.forEach((checkbox)=>{
        if(checkbox.checked)
            checkcount++;

})
//special codition
if(pwlen<checkcount)
    {
        pwlen=checkcount;
        handleslider();
    } 
}
allcheckbox.forEach((checkbox)=>{
    checkbox.addEventListener('change',handlecheckboxchange)
});

slider.addEventListener('input',(e)=>{
    pwlen=e.target.value;
    handleslider();
});
copybtn.addEventListener('click',()=>{
    if(passworddisplay.value)
        copycontent();
});


generatebtn.addEventListener('click',()=>{
    //none of the checkbox are selected
    if(checkcount<=0) return;
    if(pwlen<checkcount){
        pwlen=checkcount;
        handleslider();
    }
    //to find new pw
    console.log()
    //firstly remove old pw 
    password="";
    //lets put the staff mentioned by checboxes.
    // if(uppercaseCheck.checked)
    //     {
    //         password+=generateuppercase();
    //     }
    // if(lowercaseCheck.checked)
    //     {
    //             password+=generatelowercase();
    //     }
    // if(numbersCheck.checked)
    //     {
    //         password+=genertaerandomnumber();
    //     }
    // if(getsymbolsCheck.checked)
    //     {
    //         password+=generatesymbols();
    //     }


    let funcArr=[];
    if(uppercase.checked)
        {
            funcArr.push(generateuppercase)
        }
    if(lowercase.checked)
        {
            funcArr.push(generatelowercase)
        }
    if(numbers.checked)
        {
            funcArr.push(genertaerandomnumber)
        }
    if(getsymbols.checked)
        {
            funcArr.push(generatesymbols)
        } 
    //compulsory addition

    for(let i=0;i<funcArr.length;i++)
        {
            password+=funcArr[i]();
        }
    console.log("compulsory addition done");

    //remaining addiiton
    for(let i=0;i<pwlen-funcArr.length;i++)
        {
            let randindex=getrandominteger(0,funcArr.length);
            password+=funcArr[randindex]();
        }
    console.log("remaining addition done");

    // shuffling the password
    password=shufflepassword(Array.from(password));
    console.log("shuffling done");
    //show in UI

    passworddisplay.value=password; 
    // calculate strength
    calstrength();
})
