import { v4 } from "uuid";
import { fakeCategories, fakeData } from "./data";


export const addNewTask = async (task: any) => {
  const newTask = await { id: v4(), ...task };
  fakeData.push(newTask);
  return newTask;
};

export const selectedTasks = async ({ selectedDate, type }: any) => {
  // get day,date,month, year of query
  const day = new Date(selectedDate).getDay();
  const date = new Date(selectedDate).getDate();
  const month = new Date(selectedDate).getMonth();
  const year = new Date(selectedDate).getFullYear();

  // tasks year of 
  const tasksOfYear = await fakeData.filter(t=>new Date(t.start).getFullYear() === year)
  let selected: Array<any> = [];
  let dates: Array<any> = [];

  if (type === "week") {
    for (let d = 0; d < 7; d++) {
      dates[d] = new Date(year, month, date - (day - d)).toLocaleDateString(
        "en-gb"
      );
    }
    dates.forEach(d=>{
      tasksOfYear.forEach(t=>{
        d=== new Date(t.start).toLocaleDateString('en-gb') && selected.push(t)
      })
    })

  } else {    
      tasksOfYear.forEach((t: any) =>{
        new Date(t.start).getMonth() == month && selected.push(t)
      })
  }    
  return selected;
};

export const serverUpdateTask = async (task: any) => {
  const index = await fakeData.findIndex((x) => x.id === task.id);
  fakeData[index] = task;
  return task;
};

export const serverGetCategories = async () =>{
  return fakeCategories
}

export const serverCreateCategory = async (category: any) =>{
  const newCategory = await {id: v4(), ...category}
  fakeCategories.push(newCategory)
  return newCategory
}

