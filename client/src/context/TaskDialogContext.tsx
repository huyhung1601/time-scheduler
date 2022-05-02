import  React, {useState,createContext, useContext} from "react"

export interface ITask {
    id?: string
    name: string 
    start: string 
    end: string 
    categoryId: string
}
export interface ITaskDialogContext{
    task: ITask
    openDialog: boolean
    handleOpen?: () => void
    handleClose?: () => void 
    handleTaskChange?: (name: string, value: string)=> void
    editTask?: (task: ITask) =>void
}

const initialValue ={
    task: {
        name: "",
        start: "",
        end: "",
        categoryId: '1',
    },
    openDialog: false
}

export const TaskDialogContext = createContext<ITaskDialogContext>(initialValue)

export const TaskDialogContextProvider: React.FC<React.ReactNode> = ({children}) =>{
    const [taskDialog,setTaskDialog] = useState(initialValue)
    const handleOpen = () =>{
        setTaskDialog({...taskDialog, openDialog: true})
    }
    const handleClose = () =>{
        setTaskDialog(initialValue)
    }
    const handleTaskChange = (name:string, value: string) =>{
        setTaskDialog({...taskDialog, task : {...taskDialog.task, [name]:value}})
    }
    const editTask = (task: ITask) =>{
        setTaskDialog({openDialog: true, task: task})
    }
    //convertFormat
    
    return(
        <TaskDialogContext.Provider value={{
            task: taskDialog.task,
            openDialog: taskDialog.openDialog,
            handleOpen,
            handleClose,
            handleTaskChange,
            editTask,
        }}>
        {children}
        </TaskDialogContext.Provider>
    )
}

export const useTaskDialogContext = () => useContext(TaskDialogContext)