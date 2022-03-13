
export const getDay = (d: any) => {
    return new Date(d).getDay();
  };
  
export const getTime = (t: any) => {
    return (new Date(t).getHours() * 2) + Math.ceil((new Date(t).getMinutes() / 30)) -1;
  };

export const getDate = (d: any)=>{
  return new Date(d).getDate();
}

export const updateDateTime = (d:any,newD: any, newT?: any) =>{
  const newDate = new Date(d)
  const updateDate = newDate.setDate(newD)
  const updateDateAndTime= newT && new Date(updateDate).setHours(0,newT)
  return newT !== null ? new Date(updateDateAndTime).toISOString() : new Date(updateDate).toISOString()
}

export const converToNum = (id: string) =>{
    let indexs: Array<number> =[]
    id.split(":").forEach((x: string)=>{
      indexs.push(Number(x))
    })
    return indexs
  }

export const daysPreviousMonth = (month:any, year:any) =>{
    return new Date(year, month , 0).getDate();
  }

export const daysCurrentMonth = (month:any, year:any) =>{
  return new Date(year, month + 1, 0).getDate();
}

export const daysCurrentMonth1 = (d: any) =>{
  const y = d.getFullYear()
  const m = d.getMonth()
  return new Date(y, m + 1, 0).getDate();
}

export const firstDayOfMonth = (d: any)=>{
  const y = d.getFullYear()
  const m = d.getMonth()
  const firstDay = new Date(y,m,1).getDay()
  return firstDay
}

export const calcMinutes = (half: number, minutes:number) =>{
  return half * 30 + minutes
}

export const timeMarks = (x:number)=>{
  let timeMarks =[]
  for(let i =0;i < x; i++){
    timeMarks.push(i)
  }
  return timeMarks
}