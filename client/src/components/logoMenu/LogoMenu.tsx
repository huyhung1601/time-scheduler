import { ListItemIcon, Menu,MenuItem, MenuList,List, ListItem } from '@material-ui/core'
import React from 'react'
import CategoryLogo from '../categoryLogo/CategoryLogo'

const LogoMenu = () => {
    const logos = ['none','education','family','work','project']
  return (
      <>
      <List>
        <ListItem button
          aria-haspopup="true"
          aria-controls="lock-menu"
          aria-label="when device is locked">
            hhh
        </ListItem>
      </List>
    <Menu keepMounted open={true}>
        {logos.map((logo: string)=>{
            <MenuItem key={logo}>
                <ListItemIcon>
                    <CategoryLogo logo={logo}/>
                    
                </ListItemIcon>
                haha
            </MenuItem>
        })}
        
    </Menu>
    </>
  )
}

export default LogoMenu