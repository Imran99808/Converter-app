window.onload=function(){
    main();
}

const converter={
    length:{
        name:"Length",
        units:{
              kilometer:"Kilometer",
              meter:"Meter",
              centimeter:"Centimeter",
              millimeter:"Millimeter",

        },
        variants:{
            "kilometer:meter":{
                formula:"multiply the length value by 1000",
                calculation(n){
                  return n*1000;
                },
            },
            "kilometer:centimeter":{
                formula:"multiply the length value by 100000",
                calculation(n){
                    return n*100000;
                },
            },
            "kilometer:millimeter":{
                formula:"multiply the length value by 1e+6",
                calculation(n){
                    return n*new Number("1e+6");
                },
            },

            "meter:kilometer":{
                formula:"divide the length value by 1000",
                calculation(n){
                     return n/1000;
                },
            },
            "meter:centimeter":{
                formula:"multiply the length value by 100",
               calculation(n){
                return n/100;

            },
        },
            "meter:millimeter":{
                formula:"multiply the length value by 1000",
                calculation(n){
                 return n*1000;
                },
            },

            "centimeter:kilometer":{
                formula:"divide the length value by 100000",
                calculation(n){
                    return n/100000;
                },
            },
            "centimeter:meter":{
                formula:"divide the length value by 100",
                calculation(n){
                    return n/100;
                },
            },
            "centimeter:millimeter":{
                formula:"multiply the length value by 10",
                calculation(n){
                    return n*10;
                },
            },

            "millimeter:kilometer":{
                formula:"divide the length value by 1e+6",
                calculation(n){
                    return n/new Number("1e+6");
                },
            },
            "millimeter:meter":{
                formula:"divide the length value by 1000",
                calculation(n){
                    return n/1000;
            },
        },
            "millimeter:centimeter":{
                formula:"divide the length value by 10 ",
                calculation(n){
                    return n/10;

                },
            },
            
        },

    },
    area:{
        name:"Area",
        units:{
           squareKm:"Square Kilometer",
           squareM:"Square Meter",
           squareMile:"Square Mile",
           squareYard:"Square Yard",
           squareFoot:"Square Foot",
        }
    },
    mass:{
        name:"Mass",
        units:{
            toone:"Toone",
            kiloGram:"KiloGram",
            gram:"Gram",
            miliGram:"MiliGram",
        }
    },

    time:{
        name:"Time",
        units:{
            second:"Second",
            minit:"Minit",
            hour:"Hour",
            day:"Day",
        }
    },
   
};


function main(){

const categorySelect=document.getElementById("category-select");


const leftSelect=document.getElementById("left-select");
const rightSelect=document.getElementById("right-select");

rightSelect.children[0].style.display="none";
rightSelect.children[1].selected="selected"
mainSelect(categorySelect);
allEvent(categorySelect,leftSelect,rightSelect);


  
 
  

//  console.log(variantKey)
 
 
  }
// dom element..............

function selectOption(parent,option){
    const opt=document.createElement("option");
    opt.setAttribute("value",option.value);
    opt.innerText=option.text;
    parent.appendChild(opt);
   
    }
  function removeAllChild(parent1){

    while( parent1.firstElementChild){
        parent1.firstElementChild.remove();
  }
}
function  selectionDsplay(parent,value){
    removeAllChild(parent);
    const arr=Object.keys(converter[value].units);
    for(let i=0;i<arr.length;i++){
        selectOption(parent,{value:arr[i],text:converter[value].units[arr[i]]});
    

    }
   
}
function  calculate(parent,inp){
    const  variantKey=`${parent.value2}:${parent.value3}`;
   const firstKey=parent.value1;
    const variants=converter[firstKey].variants
    const variant=variants[variantKey];
    document.getElementById("formula").innerText=variant.formula;
    
      console.log(variant.formula)
    
      inp.inp2.value=variant.calculation(inp.inp1.value);
    //   
   
     if(!inp.inp2.value ||!inp.inp1.value){
        inp.inp2.value=null;
     }
     
}




// event handaler..........................
function allEvent(select1 ,select2,select3){
 const leftInp=document.getElementById("left-inp");
 const rightInp=document.getElementById("right-inp");
  let  lastLefttValue=select2.value;
//   let variantKey=`${select2.value}:${select3.value}`;


  leftInp.addEventListener("keyup",function(){
      calculate({value1:select1.value,value2:select2.value,value3:select3.value},{inp1:leftInp,inp2:rightInp});
});
rightInp.addEventListener("keyup",function(){
    calculate({value1:select1.value,value2:select3.value,value3:select2.value},{inp1:rightInp,inp2:leftInp});
});

  
    select1.addEventListener("change",function(){
      
           
        selectionDsplay(select2,select1.value);
        selectionDsplay(select3,select1.value);
         select3.children[0].style.display="none";
         select3.children[1].selected="selected"
         calculate({value1:select1.value,value2:select2.value,value3:select3.value},{inp1:leftInp,inp2:rightInp});
      
         
         lastLefttValue=select2.value;
    });


     select2.addEventListener("change",function(){
        console.log("r"+lastLefttValue)
        console.log(this.value);
      
       for(let i=0;i<select3.length;i++){
        
        if(lastLefttValue==select3.children[i].value && select2.value==select3.value){
            console.log( "1"+select3.value)
            select3.children[i].selected="selected";
            console.log( "2"+select3.value)
            

           
          
        }

        if(select2.value==select3.children[i].value){
            select3.children[i].style.display="none";
            lastLefttValue.selected="selected"
             continue;
        }
        
          select3.children[i].style.display="inline-block";
       
         
       }
     
  
        lastLefttValue=select2.value;
        
        calculate({value1:select1.value,value2:select2.value,value3:select3.value},{inp1:leftInp,inp2:rightInp});
       
         
    });
    select3.addEventListener("change",function(){
        calculate({value1:select1.value,value2:select2.value,value3:select3.value},{inp1:leftInp,inp2:rightInp});
       
    });
      leftInp.value=1;
     calculate({value1:select1.value,value2:select2.value,value3:select3.value},{inp1:leftInp,inp2:rightInp});
    
   
}
// main select.............................
function mainSelect(categorySelect){
    const categoryKeys=Object.keys(converter);
    for(let i=0;i<categoryKeys.length;i++){
        selectOption(categorySelect,{value:categoryKeys[i],text:converter[categoryKeys[i]].name});
       
       }
     
}

