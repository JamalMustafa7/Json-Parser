const readline = require('readline');
const fs=require('fs');
let data=fs.readFileSync('./trdata_array.json',"utf-8");
data=JSON.parse(data);


// Create an interface to read from the standard input
const r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function changeAllByAdding(value)
{
  // console.log(value);
    data.values.forEach((element,i) => {
        for (const pokeProperty in element) {
            if (pokeProperty.startsWith('poke')) {
              element[pokeProperty].level=element[pokeProperty].level+value; 
            }
        }
    });
    fs.writeFileSync('./trdata_array.json',JSON.stringify(data));
    r1.close();
    console.log("Level Changed For All Instances SuccessFully");
}
function changeAllBySubtracting(value)
{
  // console.log(value);
    data.values.forEach((element,i) => {
        for (const pokeProperty in element) {
            if (pokeProperty.startsWith('poke')) {
              element[pokeProperty].level=element[pokeProperty].level - value; 
            }
        }
    });
    fs.writeFileSync('./trdata_array.json',JSON.stringify(data));
    r1.close();
    console.log("Level Changed For All Instances SuccessFully");
}
function changeSpecific(value,tri)
{
    let doesExist=false;
    data.values.forEach(element=>
    {
        const firstQuoteIndex = element.trid.indexOf('"');

        // Find the index of the first underscore after the first double quote
        const firstUnderscoreIndex = element.trid.indexOf('_', firstQuoteIndex);

        // if (firstQuoteIndex !== -1 && firstUnderscoreIndex !== -1) {
          // Extract the text between the double quotes and the first underscore
          const textBetweenQuotesAndUnderscore = element.trid.substring(firstQuoteIndex + 1, firstUnderscoreIndex);

        if(textBetweenQuotesAndUnderscore===tri)
        {
            doesExist=true;
            for(const pokeProperty in element) {
                if (pokeProperty.startsWith('poke')) {
                  element[pokeProperty].level=element[pokeProperty].level+value; 
                }
            }
        }
    })
    fs.writeFileSync('./trdata_array.json',JSON.stringify(data));
    r1.close();
    if(doesExist)
    {
      console.log("Levels Changed Successfully!");
    }
    else{
      console.log("Trid Does'nt Exist");
    }
}

function changeSpecificSubtract(value,tri)
{
    let doesExist=false;
    data.values.forEach(element=>
    {
        const firstQuoteIndex = element.trid.indexOf('"');

        // Find the index of the first underscore after the first double quote
        const firstUnderscoreIndex = element.trid.indexOf('_', firstQuoteIndex);

        // if (firstQuoteIndex !== -1 && firstUnderscoreIndex !== -1) {
          // Extract the text between the double quotes and the first underscore
          const textBetweenQuotesAndUnderscore = element.trid.substring(firstQuoteIndex + 1, firstUnderscoreIndex);

        if(textBetweenQuotesAndUnderscore===tri)
        {
            doesExist=true;
            for(const pokeProperty in element) {
                if (pokeProperty.startsWith('poke')) {
                  element[pokeProperty].level=element[pokeProperty].level - value; 
                }
            }
        }
    })
    fs.writeFileSync('./trdata_array.json',JSON.stringify(data));
    r1.close();
    if(doesExist)
    {
      console.log("Levels Changed Successfully!");
    }
    else{
      console.log("Trid Does'nt Exist");
    }
}
function interface()
{
    let changeAll=false;
    r1.question('Do You Want to Change All The Level Values Inside the File\n(Enter "yes" if you want to and "no" if you want to specify trid): ',(choice)=>
    {
        changeAll= (choice.toLowerCase()==='yes')? true:false;

        r1.question('Do you want to add a number in the value of level or subtract a number from the value of "level"\n(Enter "yes" if you want to add and "no" if you want to subtract): ',(addOrSubtract)=>
        {
            if(addOrSubtract.toLowerCase()==="yes")
            {
              r1.question("Enter the Integer you want to add to level values\n(Enter Number like 1,2,3 i.e any integer): ",(number)=>
              {
                if (changeAll)
                {
                  changeAllByAdding(parseInt(number));
                }
                else
                {
                  r1.question("Enter the trid of the section in which you want to change level: ",(trid)=>
                  {
                    changeSpecific(parseInt(number),trid)
                  })
                }
              })
            }
            else if(addOrSubtract.toLowerCase()==="no")
            {
              r1.question("Enter the Integer you want to Subtract from level values\n(Enter Number like 1,2,3 i.e any integer): ",(number)=>
              {
                if (changeAll)
                {
                  changeAllBySubtracting(parseInt(number));
                }
                else
                {
                  r1.question("Enter the trid of the section in which you want to change level: ",(trid)=>
                  {
                    changeSpecificSubtract(parseInt(number),trid)
                  })
                }
              })
            }
            else{
              console.log("Invalid Choice");
            }
        })
    })
}
interface();