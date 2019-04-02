import React,{useState} from 'react';
import {Input} from 'reactstrap';

        const TodoForm=({addTodo})=>{
        const [value,setValue]=useState("") 
        const handleSubmit=e=>{
            e.preventDefault();
            if(!value) return;
            console.log(value);
            addTodo(value);
            setValue("");
        }

        return (
            <form onSubmit={handleSubmit}>
            <Input
               placeholder="Add some todo"
               value={value}
              onChange={e => setValue(e.target.value)}
            />
          </form>   
        );


}

export default TodoForm;