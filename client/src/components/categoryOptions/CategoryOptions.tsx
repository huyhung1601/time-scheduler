import React,{useState} from 'react'
import Autocomplete from "@material-ui/lab/Autocomplete";
import CategoryLogo from "../categoryLogo/CategoryLogo";
import {TextField,InputAdornment, Button, Select} from "@material-ui/core";
import useStyles from './styles'
interface IProps {
    categories: any[]
}

const initialValue = {
  addNew: false,
  newCategory:{
    title: '',
    logo: ''
  }
}
const CategoryOptions: React.FC<IProps> = ({categories}) => {
  const [addCategory,setAddCategory] = useState(initialValue)
    const classes = useStyles()
  return (
      <div className={classes.categoryOptions}>
        {!addCategory.addNew &&
        <>
       <Autocomplete
       className='autocomplete'
            freeSolo
            options={categories}
            getOptionLabel={(option) => option.title  }
            renderOption={(option: any) => (
              <div className={classes.categoryOption}>
                {<CategoryLogo logo={option.type} />}
                <p>{option.title}</p>
              </div>
            )}
            renderInput={(params) => (             
                <TextField
                {...params}          
                InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <>
                        <InputAdornment position="start">
                        </InputAdornment>
                        {params.InputProps.startAdornment}
                      </>
                    )
                  }}     
                label="Category"
                margin="normal"
              />
            )}
          />
        <Button onClick={()=>setAddCategory({...addCategory, addNew: true })} className='addNewBtn'>Add New {`>>`}</Button>  
        </>}
        {addCategory.addNew && <>
          <Button onClick={()=>setAddCategory({...addCategory, addNew: false})}>{`<< Back`}</Button>
          <Select>
            <div style={{display: 'flex'}}>
              <CategoryLogo logo='education' />
              <option value="education">education</option>
            </div>
          </Select>
          <TextField label='Category' defaultValue='' value={addCategory.newCategory.title}/>
          <Button>Add +</Button>
        </>}
      </div>
   
  )
}

export default CategoryOptions