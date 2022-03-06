import React from 'react'
import {Table, TableBody, TableContainer, TableHead, TableRow } from "@material-ui/core";

const Timeline = () => {
    const timeline=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]
  return (
    < TableContainer>
        <Table aria-label="simple table">
            <TableHead >
                <TableRow>
                    Time/Day
                </TableRow>
            </TableHead>
            <TableBody>
                
                {timeline.map((x:number, i: number)=>{
                return(
                    <TableRow key={i} >
                        {`${x}:00`}
                    </TableRow>
                )
            })}
                
            
            </TableBody>
        </Table>
      
    </TableContainer>
  )
}

export default Timeline