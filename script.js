
import { countryList } from "./codes.js";
const base_url= "https://currency-rate-exchange-api.onrender.com";
const dropdowns= document.querySelectorAll(".selection");

const btn = document.querySelector(".rate-btn");
const iconBtn = document.querySelector(".icon-btn");

const from_flag = document.querySelector(".from-flag");
const to_flag = document.querySelector(".to-flag");

const fromCurr= document.querySelector(".from select");
const toCurr= document.querySelector(".to select");

console.log(fromCurr.value)
console.log(toCurr.value)
const output = document.querySelector(".output");

for(let select of dropdowns){
    for(let CurrencyCode in countryList){
        let newOption= document.createElement("option");
        newOption.innerText = CurrencyCode;
        newOption.value = CurrencyCode;
        
        if(select.name === "from" && CurrencyCode === "BDT"){
            newOption.selected=true;
        } else if(select.name === "to" && CurrencyCode === "USD"){
            newOption.selected=true;
        }
        
        select.append(newOption);
      
    }
    select.addEventListener("change", (evt) =>{
        updateFlag(evt.target);
        console.log(evt.target);
    //    updateFlag(select.value,select.name);

    });
}

// modified code
const updateFlag= (select)=>{
    let selectedCode= select.value;
    let flagUrl = `https://flagsapi.com/${countryList[selectedCode]}/flat/64.png`;
    //here img is the child of class from-part or to-part   
    let img = select.parentElement.querySelector('img');
    img.src= flagUrl; 
    console.log("Selected Code:", selectedCode); 
    console.log("Flag URL:", flagUrl);
}
//my thought process
// const updateFlag = (Flag, selectName) =>{
//     let selectedCode = Flag; 
//     let flagUrl = `https://flagsapi.com/${countryList[selectedCode]}/flat/64.png`;
    
//     console.log("Selected Code:", selectedCode); // Check selected currency
//     console.log("Flag URL:", flagUrl);

//     if (selectName === "from") {
//         from_flag.src = flagUrl;
//         console.log("From flag changed");
//     } else {
//         to_flag.src = flagUrl;
//         console.log("To flag changed");
//     }
// };

async function updatedRate(){
    const input = document.querySelector("input");
    let amount= input.value;
   
    if(amount === "" || amount < 1){
        amount= 1;
        input.value="1" ;
    }

   let fromData = fromCurr.value.toLowerCase();
   let toData = toCurr.value.toLowerCase();

   console.log(fromData);
   console.log(toData);

    let url= `${base_url}/${fromData}`
   
    console.log(url)
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    let rate= data.rates[fromData][toData];
    output.innerText = `${amount} ${fromData.toUpperCase()} = ${rate*amount} ${toData.toUpperCase()}`;
    console.log(rate);
}

btn.addEventListener("click",async(evt)=>{
    evt.preventDefault();

    updatedRate();
});


iconBtn.addEventListener("click",()=>{
    let from = fromCurr.value;
    let to = toCurr.value;
    fromCurr.value = to;
    toCurr.value = from;
    
   let fromFlagUrl = `https://flagsapi.com/${countryList[to]}/flat/64.png`;
   let toFlagUrl = `https://flagsapi.com/${countryList[from]}/flat/64.png`;

   from_flag.src = fromFlagUrl;
   to_flag.src = toFlagUrl;
});

window.addEventListener("load",()=>{
    updatedRate();
})