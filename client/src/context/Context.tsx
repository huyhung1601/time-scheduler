import  React, {useState,createContext} from "react"

export interface ToggleContext{
    openDialog: boolean;
    handleOpen?: () => void;
    handleClose?: () => void ;
}

const initialValue ={
    openDialog: false
}

export const ToggleContext = createContext<ToggleContext>(initialValue)

export const ToggleContextProvider: React.FC<React.ReactNode> = ({children}) =>{
    const [toggle,setToggle] = useState(initialValue.openDialog)
    const handleOpen = () =>{
        setToggle(true)
    }
    const handleCLose = () =>{
        setToggle(false)
    }
    return(
        <ToggleContext.Provider value={{
            openDialog: toggle,
            handleOpen: handleOpen,
            handleClose: handleCLose,
        }}>
        {children}
        </ToggleContext.Provider>
    )
}