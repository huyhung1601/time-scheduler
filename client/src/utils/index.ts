import  {v4} from 'uuid'
import moment from 'moment'

export const fakeData = [
  { id:v4(), task: "task 1", start: "2022-03-07T06:20", end: "2022-03-07T19:20" },
  { id:v4(), task: "task 2", start: "2022-03-07T07:20", end: "2022-03-07T19:20" },
  { id:v4(), task: "task 3", start: "2022-03-08T06:40", end: "2022-03-08T19:20" },
  { id:v4(), task: "task 4", start: "2022-03-08T10:20", end: "2022-03-08T19:20" },
  { id:v4(), task: "task 5", start: "2022-03-09T09:20", end: "2022-03-09T19:20" },
  { id:v4(), task: "task 6", start: "2022-03-09T09:25", end: "2022-03-09T19:20" },
  { id:v4(), task: "task 7", start: "2022-03-09T10:20", end: "2022-03-09T19:20" },
];

export const selectedTasks = async (dates :any) =>{
  let selected: Array<any> = []
  await fakeData.forEach((x:any)=>{
    dates.forEach((d:any)=>{
      moment(d,"DDMMYYYY").isSame(x,"day") && selected.push(x)
    })
  })
  console.log(selected[0])
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