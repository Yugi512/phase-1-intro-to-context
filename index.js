function createEmployeeRecord(employee){
   
    let recordObj = {
    firstName: employee[0],
    familyName: employee[1],
    title: employee[2],
    payPerHour: employee[3],
    timeInEvents: [],
    timeOutEvents: []
   }; 
   return recordObj
}

// converst the datat given into usable data 
function createEmployeeRecords(array){
  return array.map((element) => {
    return createEmployeeRecord(element)
  })
  
}
//returns array of objects 

function createTimeInEvent(employeeRecord,dateStamp){
    let date = dateStamp.split(' ')
    let ymd = date[0];
    let time = date[1];
    employeeRecord.timeInEvents.push({ type: "TimeIn", hour: parseInt(time)  , date: ymd});
    return employeeRecord

}
// manages the employee record 
// use the opened google tab to find a way to add seperate the hour and date and type in a object andthen add that to the key timeInEvents
//https://stackoverflow.com/questions/96428/how-do-i-split-a-string-breaking-at-a-particular-character
//https://stackoverflow.com/questions/18473326/javascript-break-sentence-by-words

function createTimeOutEvent(employeeRecord,dateStamp){
    let date = dateStamp.split(' ')
    let ymd = date[0];
    let time = date[1];
    employeeRecord.timeOutEvents.push({ type: "TimeOut", hour: parseInt(time)  , date: ymd});
    return employeeRecord
}
//manages the employee record 

function hoursWorkedOnDate(employeeRecord,dateStamp){
  for(let i = 0; i < employeeRecord.timeInEvents.length; i++ ){
   if( employeeRecord.timeOutEvents[i].date === dateStamp){
     let lastHour = employeeRecord.timeOutEvents[i].hour;
     let firstHour = employeeRecord.timeInEvents[i].hour
    return (lastHour - firstHour)/100
    }
  } 
}
// hours worked 

function wagesEarnedOnDate(employeeRecord,dateStamp){
  let hoursWrked = hoursWorkedOnDate(employeeRecord,dateStamp)
  let pay = employeeRecord.payPerHour;
  return pay * hoursWrked
}
//pay owed to the worker

function allWagesFor(employeeRecord){
  let accumulatedPay = 0; 
  for(let i = 0; i < employeeRecord.timeInEvents.length; i++ ){
    let firstDate = employeeRecord.timeInEvents[i].date;
    let pays = wagesEarnedOnDate(employeeRecord,firstDate)
    accumulatedPay = pays + accumulatedPay;
  } 
  console.log('this is the final pay',accumulatedPay)
  return accumulatedPay
}
//the pay for the dates 


function calculatePayroll(employeeRecords){
//   let totAccPay = 0; 
//   for(let i = 0; i < employeeRecord.length; i++ ){
//     let employee = employeeRecord[i];
//    for(let j = 0; j < employeeRecord; j++){
//     let empWrkDay = employeeRecord.timeInEvents[j].date
//     let indEmpPay = wagesEarnedOnDate(employeeRecord,empWrkDay)
//     totAccPay = totAccPay + indEmpPay;
//     return totAccPay
//   } 
//  }
  return employeeRecords.reduce((prev,next) => {
    return prev + allWagesFor(next);
  },0)
}
//the total sum of the pay owed to all employees for all the dates 


//solutions:


//pseudocode: 