import { v4 } from "uuid";

export const fakeData = [
    {
      id: '1',
      name: "task 1",
      start: "2022-03-16T06:20",
      end: "2022-03-29T19:20",
      category: 'family',
      participants: []
    },
    {
      id: '2',
      name: "task 2",
      start: "2022-03-16T07:20",
      end: "2022-03-19T19:20",
      category: 'family',
      participants: []
    },
    {
      id: '3',
      name: "task 3",
      start: "2022-03-21T06:40",
      end: "2022-03-22T19:20",
      category: 'family',
      participants: []
    },
    {
      id: '4',
      name: "task 4",
      start: "2022-03-21T10:20",
      end: "2022-03-22T19:20",
      category: 'family',
      participants: []
    },
    {
      id: '5',
      name: "task 5",
      start: "2022-03-23T09:20",
      end: "2022-03-24T19:20",
      category: 'education',
      participants: []
    },
    {
      id: '6',
      name: "task 6",
      start: "2022-03-24T09:25",
      end: "2022-03-26T19:20",
      category: 'education',
      participants: []
    },
    {
      id: '7',
      name: "task 7",
      start: "2022-03-24T10:20",
      end: "2022-03-27T19:20",
      category: 'education',
      participants: []
    },
    {
      id: '8',
      name: "task 8",
      start: "2022-03-19T09:20",
      end: "2022-03-30T19:20",
      category: 'education',
      participants: []
    },
    {
      id: '9',
      name: "task 9",
      start: "2022-03-19T07:20",
      end: "2022-03-25T19:20",
      category: 'work',
      participants: []
    },
    {
      id: v4(),
      name: "task 10",
      start: "2022-03-18T07:40",
      end: "2022-03-23T19:20",
      category: 'work',
      participants: []
    },
    {
      id: v4(),
      name: "task 11",
      start: "2022-03-19T9:20",
      end: "2022-03-23T19:20",
      category: 'work',
      participants: []
    },
    {
      id: v4(),
      name: "task 12",
      start: "2022-03-20T09:20",
      end: "2022-03-24T19:20",
      category: 'none',
      participants: []
    },
    {
      id: v4(),
      name: "task 13",
      start: "2022-03-20T09:25",
      end: "2022-03-22T19:20",
      category: 'none',
      participants: []
    },
    {
      id: v4(),
      name: "task 14",
      start: "2022-03-23T6:20",
      end: "2022-03-24T19:20",
      category: 'none',
      participants: []
    },
    {
      id: v4(),
      name: "task 15",
      start: "2022-04-23T6:20",
      end: "2022-04-27T19:20",
      category: 'family',
      participants: []
    },
  ];

export const fakeCategories=[
  {id: v4(), title: 'project', type: 'project', tasks:['1','2','3']},
  {id: v4(), title: 'project', type: 'project', tasks:['1','2','3']},
  {id: v4(), title: 'work', type: 'work', tasks:['4','5','6']},
  {id: v4(), title: 'education', type: 'education', tasks:['7','8','9']},
]