import { AccountTree, CastForEducation, SupervisorAccount, Work } from '@material-ui/icons'
import React from 'react'
 
interface IProps {
    logo: string
}
const CategoryLogo = (props:IProps) => {
    const {logo} = props
  return (
    <>
        {logo == 'work' && <Work/>}
        {logo == 'family' && <SupervisorAccount/>}
        {logo == 'education' && <CastForEducation/>}
        {logo == 'project' && <AccountTree/> }
    </>
  )
}

export default CategoryLogo