
function reverseStr(str) {
  var listofchars = str.split("");
  var reverselistofchars = listofchars.reverse("");
  var joinreverselistofchars = reverselistofchars.join("");

  return joinreverselistofchars;

  // optimised code// return str.split('').reverse('').join('');
}

function isPalindrome(str) {
  var reverse = reverseStr(str);
  return str === reverse;
}

function convertDatetoStr(date) {
  var dateStr = {
    day: "",
    month: "",
    year: ""
  };

  if (date.day < 10) {
    dateStr.day = "0" + date.day;
    //when we are appending a str it automatically converts to string
  } else {
    dateStr.day = date.day.toString();
  }

  if (date.month < 10) {
    dateStr.month = "0" + date.month;
  } else {
    dateStr.month = date.month.toString();
  }
  dateStr.year = date.year.toString();
  return dateStr;
}

function convertDatetodateFormats(date) {
  var dateStr = convertDatetoStr(date);

  var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
  var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  var mmddyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromefordateFormats(date) {
  var formatList = convertDatetodateFormats(date);
  var flag = false;

  for (var i = 0; i < formatList.length; i++) {
    if (isPalindrome(formatList[i])) {
      flag = true;
      break;
    }
  }
  return flag;
}

function isLeap(year) {
  if ((year % 400 === 0 || year % 4 === 0) && year % 100 !== 0) {
    return true;
  } else {
    return false;
  }
}

function getnextDate(date) {
  var day = date.day + 1; //15+1=16
  var month = date.month; //08
  var year = date.year; //2021

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  //0-11 indexes

  //check for february
  if (month === 2) {
    if (isLeap(year)) {
      if (day > 29) {
        day = 1;
        month++;
      }
    }
  }

  //check if the day exceeds the max day in month
  else {
    if (day > daysInMonth[month - 1]) {
      //16 >[8-1]31 = false
      day = 1;
      month++;
    }
  }

  //check if month is greater than 12 than increment year
  if (month > 12) {
    //8 > 12 =false
    month = 1;
    year++;
  }

  return {
    day: day,
    month: month,
    year: year
  };
}

function getnextPalindromeDate(date) {
  var counter = 0;
  var nextDate = getnextDate(date);

  while (1) {
    counter++;
    var isPalindrome = checkPalindromefordateFormats(nextDate);
    if (isPalindrome) {
      break;
    }

    nextDate = getnextDate(nextDate);
  }
  return [counter , nextDate ];
}



//15 aug 2021 ,28 feb 2020, 31 dec 2020
// console.log(getnextPalindromeDate(date));


const DateInput = document.querySelector('#dateinput');
const btn       = document.querySelector('#checkPalindrome');
const Output = document.querySelector('#output');


function clickHandler(event)
{
    var bdayStr = DateInput.value;//2021-11-12 example input format we get from user as html input
    if(bdayStr !== '')
    {
        var DateList = bdayStr.split('-');
        var date = {

            day: Number(DateList[2]),
            month: Number(DateList[1]),
            year: Number(DateList[0])

        };
        
        var isPalindrome = checkPalindromefordateFormats(date);
        if(isPalindrome)
        {
            Output.innerText = "Yay your Birthday is a Palindrome😄";
        }
        else{

            var [counter , nextDate] = getnextPalindromeDate(date);
            //  Output.innerText = "The Next Palindrome date is:  " + nextDate.day   + nextDate.month  + nextDate.year + ",you missed it by " + counter + " days!" 
            // console.log(nextDate.day,nextDate.month,nextDate.year);
            Output.innerText = `The Next Palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year} , you missed it by ${counter} days!😞`
        }
       
    } 
    
}

btn.addEventListener('click', clickHandler);