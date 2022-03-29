//make every variable global because i think scopes make everything more complicated
var number;
var amountofdigits;
var temporarydigit;
var thetable;
var therows;
var theelements;
var arrayguess;
var stringguess;
var guesscount;
var theoutput;
var duplication;
var duplicates;
var emojiinstance;
window.onload = function()
{
  //initialize variables
  number = [];
  amountofdigits = 0;
  temporarydigit = 0;
  selecteddigit = 0;
  thetable = document.getElementById("thetable");
  therows = [];
  theelements = [[]];
  stringguess = 0;
  arrayguess = 0;
  guesscount = 0;
  theoutput = [];
  duplication = [];
  duplicates = 0;
  emojiinstance = [0, 0, 0];
}

function makegame()
{
  amountofdigits = document.getElementById("amountofdigits").value;
  //block invalid inputs
  if (isNaN(amountofdigits))
  {
    document.getElementById("userealnumber").style.display = "block";
  }
  else if (amountofdigits == 0)
  {
    document.getElementById("usenonzeronumber").style.display = "block";
  }
  else if (amountofdigits > 10)
  {
    document.getElementById("uselownumber").style.display = "block";
  }
  else if (amountofdigits < 0)
  {
    document.getElementById("usepositivenumber").style.display = "block";
  }
  else
  {
    amountofdigits = parseInt(amountofdigits);
    amountofdigits = Math.floor(amountofdigits);
    //hide and show stuff
    document.getElementById("specifytext").style.display = "none";
    document.getElementById("amountofdigits").style.display = "none";
    document.getElementById("userealnumber").style.display = "none";
    document.getElementById("usenonzeronumber").style.display = "none";
    document.getElementById("uselownumber").style.display = "none";
    document.getElementById("usepositivenumber").style.display = "none";
    document.getElementById("makegame").style.display = "none";
    document.getElementById("guessspecify").style.display = "block";
    document.getElementById("guess").style.display = "block";
    document.getElementById("submitter").style.display = "block";
    document.getElementById("thetable").style.display = "table";
    //make number
    for (i = 0; i < amountofdigits; i++)
    {
      number[i] = -1;
    }
    for (i = 0; i < amountofdigits; i++)
    {
      makedigit = function()
      {
        temporarydigit = Math.floor(Math.random() * 10);
        if (number.includes(temporarydigit))
        {
          makedigit();
        }
        else
        {
          if (i == 0 && temporarydigit == 0)
          {
            makedigit();
          }
          else
          {
            number[i] = temporarydigit;
          }
        }
      }
      makedigit();
    }
    //console.log(number);
  }
}

function submitguess()
{
  //set variables
  duplication = [];
  duplicates = 0;
  emojiinstance = [0, 0, 0];
  theoutput = [];
  var j;
  var k;
  guesscount++;
  arrayguess = document.getElementById("guess").value;
  stringguess = arrayguess;
  arrayguess = arrayguess.split("");
  //check for duplicates
  arrayguess.forEach(function(thing)
  {
    if (duplication[thing])
    {
      duplicates = 1;
    }
    else
    {
      duplication[thing] = 1;
    }
  });
  if (arrayguess.length != amountofdigits)
  {
    document.getElementById("usecorrectdigits").innerHTML = "Please use " + amountofdigits + " digits; that's what you chose";
    document.getElementById("usecorrectdigits").style.display = "block";
  }
  else if (isNaN(stringguess))
  {
    document.getElementById("userealnumber2").style.display = "block";
  }
  else if (duplicates == 1)
  {
    document.getElementById("usenonduplicateddigits").style.display = "block";
  }
  else
  {
    document.getElementById("usenonduplicateddigits").style.display = "none";
    document.getElementById("usecorrectdigits").style.display = "none";
    for (i = 0; i < amountofdigits; i++)
    {
      if (arrayguess[i] == number[i])
      {
        emojiinstance[0]++;
      }
      else if (number.includes(parseInt(arrayguess[i])))
      {
        emojiinstance[1]++;
      }
      else
      {
        emojiinstance[2]++;
      }
    }
    for (i = 0; i < 3; i++)
    {
      for (j = 0; j < emojiinstance[i]; j++)
      {
        if (i == 0)
        {
          theoutput.push("✅");
        }
        else if (i == 1)
        {
          theoutput.push("⛔");
        }
        else if (i == 2)
        {
          theoutput.push("❌");
        }
      }
    }
    //console.log(theoutput);
    therows[guesscount - 1] = thetable.insertRow(-1);
    theelements[guesscount - 1] = [];
    theelements[guesscount - 1][0] = therows[guesscount - 1].insertCell(0);
    theelements[guesscount - 1][1] = therows[guesscount - 1].insertCell(1);
    theelements[guesscount - 1][0].innerHTML = stringguess;
    theelements[guesscount - 1][1].innerHTML = theoutput;  
    theelements[guesscount - 1][0].className = "thetablecell";
    theelements[guesscount - 1][1].className = "thetablecell";  
  }
}
