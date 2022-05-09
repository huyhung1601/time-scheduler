export const getDay = (d: any) => {
  return new Date(d).getDay();
};

export const getTime = (t: any) => {
  return (
    new Date(t).getHours() * 2 + Math.ceil(new Date(t).getMinutes() / 30) - 1
  );
};

export const getDate = (d: any) => {
  return new Date(d).getDate();
};

export const updateDateTime = (
  duration: number,
  newT: any,
  newD: any,
  newM: any,
  newY: any
) => {
  const newDate = new Date(newY, newM - 1, newD).setHours(0, newT) + duration;
  const updatedDate = deductTimezoneOffset(new Date(newDate));
  return toISOStringNoZ(updatedDate);
};

export const converToNum = (id: string) => {
  let indexs: Array<number> = [];
  id.split(":").forEach((x: string) => {
    indexs.push(Number(x));
  });
  return indexs;
};

export const daysPreviousMonth = (month: any, year: any) => {
  return new Date(year, month, 0).getDate();
};

export const daysCurrentMonth = (d: any) => {
  const y = d.getFullYear();
  const m = d.getMonth();
  return new Date(y, m + 1, 0).getDate();
};

export const firstDayOfMonth = (d: any) => {
  const y = d.getFullYear();
  const m = d.getMonth();
  const firstDay = new Date(y, m, 1).getDay();
  return firstDay;
};

export const calcMinutes = (half: number, minutes: number) => {
  return half * 30 + minutes;
};

export const timeMarks = (x: number) => {
  let timeMarks = [];
  for (let i = 0; i < x; i++) {
    timeMarks.push(i);
  }
  return timeMarks;
};

export const toISOStringNoZ = (date: Date) => {
  return date.toISOString().split(":").slice(0, -1).join(":");
};

export const deductTimezoneOffset = (date: Date) => {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000);
};
