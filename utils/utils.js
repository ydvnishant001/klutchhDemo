export function dateUtil (addDays) { // function to return future month and date
    var newDate = new Date();
    newDate.setDate(newDate.getDate()+addDays);
    if(newDate.getMonth()+1 === 1){
      return {month: 'January', date: newDate.getDate()}
    }
    if(newDate.getMonth()+1 === 2){
      return {month: 'February', date: newDate.getDate()}
    }
    if(newDate.getMonth()+1 === 3){
      return {month: 'March', date: newDate.getDate()}
    }
    if(newDate.getMonth()+1 === 4){
      return {month: 'April', date: newDate.getDate()}
    }
    if(newDate.getMonth()+1 === 5){
      return {month: 'May', date: newDate.getDate()}
    }
    if(newDate.getMonth()+1 === 6){
      return {month: 'June', date: newDate.getDate()}
    }
    if(newDate.getMonth()+1 === 7){
      return {month: 'July', date: newDate.getDate()}
    }
    if(newDate.getMonth()+1 === 8){
      return {month: 'August', date: newDate.getDate()}
    }
    if(newDate.getMonth()+1 === 9){
      return {month: 'September', date: newDate.getDate()}
    }
    if(newDate.getMonth()+1 === 10){
      return {month: 'October', date: newDate.getDate()}
    }
    if(newDate.getMonth()+1 === 1){
      return {month: 'November', date: newDate.getDate()}
    }
    if(newDate.getMonth()+1 === 1){
      return {month: 'December', date: newDate.getDate()}
    }
  }

export function assortList (list, from, addDays, activeTab){// method to filter the shifts for all days of the week
  function dayUtil(addDays){
    var today = new Date().getDay()
    if(!addDays){
      return today
    }
    else{ 
    if(today + addDays > 7){
      return (today + addDays - 7)
    }
    else{
      return today + addDays
    }
  }
  }

  if(from === 'myShifts'){
      return list.filter(item => item.day === dayUtil(addDays))
  }
  else if(activeTab === 1){
      return list.filter(item => item.day === dayUtil(addDays) && item.area === 'Helsinki')
  }
  else if(activeTab === 2){
      return list.filter(item => item.day === dayUtil(addDays) && item.area === 'Tampere')
  }
  else{
      return list.filter(item => item.day === dayUtil(addDays) && item.area === 'Turku')
  }
}

export function dateHeader (addDays){
  if(!addDays){
      return 'Today'
  }
  else if(addDays === 1){
      return 'Tomorrow'
  }
  else{
      return dateUtil(addDays).month + " " + dateUtil(addDays).date
  }
}

export function shiftHeader(list){
  var hours = 0
  list.forEach((item) => {
      hours = hours + (item.endTime.hour - item.startTime.hour)
  })
  return hours
}