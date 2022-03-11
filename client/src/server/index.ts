import  {v4} from 'uuid'

export const fakeData = [
  { id:v4(), task: "task 1", start: "2022-03-10T06:20", end: "2022-03-07T19:20" },
  { id:v4(), task: "task 2", start: "2022-03-11T07:20", end: "2022-03-07T19:20" },
  { id:v4(), task: "task 3", start: "2022-03-12T06:40", end: "2022-03-08T19:20" },
  { id:v4(), task: "task 4", start: "2022-03-12T10:20", end: "2022-03-08T19:20" },
  { id:v4(), task: "task 5", start: "2022-03-13T09:20", end: "2022-03-09T19:20" },
  { id:v4(), task: "task 6", start: "2022-03-14T09:25", end: "2022-03-09T19:20" },
  { id:v4(), task: "task 7", start: "2022-03-15T10:20", end: "2022-03-09T19:20" },
  { id:v4(), task: "task 8", start: "2022-03-16T09:20", end: "2022-03-12T19:20" },
  { id:v4(), task: "task 9", start: "2022-03-17T07:20", end: "2022-03-13T19:20" },
  { id:v4(), task: "task 10", start: "2022-03-18T07:40", end: "2022-03-13T19:20" },
  { id:v4(), task: "task 11", start: "2022-03-19T9:20", end: "2022-03-14T19:20" },
  { id:v4(), task: "task 12", start: "2022-03-20T09:20", end: "2022-03-15T19:20" },
  { id:v4(), task: "task 13", start: "2022-03-20T09:25", end: "2022-03-15T19:20" },
  { id:v4(), task: "task 14", start: "2022-03-21T6:20", end: "2022-03-15T19:20" },
];

export const addNewTask = async (task: any) =>{
  const newTask={id:v4(),...task}
  await fakeData.push(newTask)
  return newTask
}

export const selectedTasks = async ({selectedDate,type}:any) =>{
  console.log(selectedDate,type)
  let selected: Array<any> = []
  // await fakeData.forEach((x:any)=>{
  //   dates.forEach((d:any)=>{
  //     d=== new Date(x.start).toLocaleDateString('en-gb') && selected.push(x)
  //   })
  // })
  return selected
}

export const serverUpdateTask = async (task: any) =>{
  const index = await fakeData.findIndex(x=> x.id === task.id)
  fakeData[index] = task
  console.log(fakeData)
  return task
}