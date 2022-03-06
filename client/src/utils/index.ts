import  {v4} from 'uuid'
export const fakeData = [
  { id:v4(), task: "task 1", start: new Date("03/07/2022 6:31"), end: new Date("03/07/2022 10:15") },
  { id:v4(), task: "task 2", start: new Date("03/07/2022 6:35"), end: new Date("03/07/2022 10:15") },
  { id:v4(), task: "task 3", start: new Date("03/08/2022 7:15"), end: new Date("03/08/2022 14:15") },
  { id:v4(), task: "task 4", start: new Date("03/09/2022 9:15"), end: new Date("03/09/2022 14:15") },
  { id:v4(), task: "task 5", start: new Date("03/06/2022 10:35"), end: new Date("03/06/2022 10:15") },
  { id:v4(), task: "task 6", start: new Date("03/06/2022 7:15"), end: new Date("03/06/2022 11:15") },
  { id:v4(), task: "task 7", start: new Date("03/06/2022 8:15"), end: new Date("03/06/2022 15:15") },
];

export const getDay = (d: any) => {
    return new Date(d).getDay();
  };
  
export const getTime = (t: any) => {
    return (new Date(t).getHours() * 2) + Math.ceil((new Date(t).getMinutes() / 30)) -1;
  };

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