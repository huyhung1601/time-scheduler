import  {v4} from 'uuid'

export const fakeData = [
  { id:v4(), task: "task 1", start: "2022-03-07T06:20", end: "2022-03-07T19:20" },
  { id:v4(), task: "task 2", start: "2022-03-07T07:20", end: "2022-03-07T19:20" },
  { id:v4(), task: "task 3", start: "2022-03-08T06:40", end: "2022-03-08T19:20" },
  { id:v4(), task: "task 4", start: "2022-03-08T10:20", end: "2022-03-08T19:20" },
  { id:v4(), task: "task 5", start: "2022-03-09T09:20", end: "2022-03-09T19:20" },
  { id:v4(), task: "task 6", start: "2022-03-09T09:25", end: "2022-03-09T19:20" },
  { id:v4(), task: "task 7", start: "2022-03-09T10:20", end: "2022-03-09T19:20" },
  { id:v4(), task: "task 8", start: "2022-03-12T09:20", end: "2022-03-12T19:20" },
  { id:v4(), task: "task 9", start: "2022-03-13T07:20", end: "2022-03-13T19:20" },
  { id:v4(), task: "task 10", start: "2022-03-13T07:40", end: "2022-03-13T19:20" },
  { id:v4(), task: "task 11", start: "2022-03-14T9:20", end: "2022-03-14T19:20" },
  { id:v4(), task: "task 12", start: "2022-03-15T09:20", end: "2022-03-15T19:20" },
  { id:v4(), task: "task 13", start: "2022-03-15T09:25", end: "2022-03-15T19:20" },
  { id:v4(), task: "task 14", start: "2022-03-16T6:20", end: "2022-03-15T19:20" },
];

export const selectedTasks = async (dates :any) =>{
  let selected: Array<any> = []
  await fakeData.forEach((x:any)=>{
    dates.forEach((d:any)=>{
      d=== new Date(x.start).toLocaleDateString('en-gb') && selected.push(x)
    })
  })
  return selected
}

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