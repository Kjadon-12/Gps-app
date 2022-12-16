
import React from 'react'

function Pagination(props) {
    //const[a,setA]  = useState(props.currentPage);
    

    
   
           
  return (
    <>
    
    <button onClick={props.previousHandler}  className='leftbtn'>❮</button> <button onClick={props.nextHandler} className='rightbtn'>❯</button> 
    <h4 className='pagen'> {props.currentPage} of {props.totalPages} </h4>
    
    
    
    </>
  )

}

export default Pagination