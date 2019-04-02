import React from "react";
import styled from 'styled-components'
import {Button} from 'reactstrap';
import Todo from "../views/Todo";
const  timechange=(timestamp)=>{
    let newDate = new Date();
    return (newDate.toLocaleDateString(timestamp))
}
const TodoItem=({todo,index,completeTodo})=>{
    
   return( <StyledItem>
    <div style={{textDecoration:(todo.isCompleted)?"line-through":""}}>{todo.text}</div>
    <div>{timechange(todo.id)}</div>
    <div style={{marginLeft:'auto'}}>
     <Button color={todo.isCompleted?"danger":"success"} onClick={()=>completeTodo(index)} style={{padding:'1px 5px 1px 5px'}}>{todo.isCompleted?"✅":"❎"}</Button>
    </div>
    
    </StyledItem>
   )}

const StyledItem=styled.div`
  background: rgba(105, 226, 199, 0.2);
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.15);
  padding: 3px 10px;
  margin-bottom: 6px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content:start;
  
  margin:10px auto;
  font-size:18px;
}
`
export default TodoItem;