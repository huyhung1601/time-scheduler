export const getDay = (d: any) => {
    return new Date(d).getDay();
  };
  
export const getTime = (t: any) => {
    return (new Date(t).getHours() * 2) + Math.ceil((new Date(t).getMinutes() / 30)) -1;
  };

export const converToNum = (id: string) =>{
    let indexs: Array<number> =[]
    id.split("").forEach((x: string)=>{
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

