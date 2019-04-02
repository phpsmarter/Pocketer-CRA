import React ,{useState,useEffect}from 'react';
import useLocalStorage from "react-use-localstorage";
import TodoItem from '../components/TodoItem';
import TodoForm from '../components/TodoForm';
import {Badge} from 'reactstrap'
const  intialtodos=[
    {id:1,text:"Buy milk", isCompleted:false},
    {id:2,text:"Eat lunch",isCompleted:false},
    {id:3,text:"Make Todo  APP",isCompleted:true},
    {id:3,text:"Make Todo  APP",isCompleted:false},
]

const nulltodos=[];





const PersistantTodo=()=>{

  const  [todos,setTodos]=useState(intialtodos)
useEffect(() => {
    window.localStorage.setItem("todos",[todos])
    setTodos(todos);
  });
  //const AllNews=todos.AllNews;

  const addTodo=text=>{
     const newTodos=[...todos,{text,isCompleted:false,id:Date.now()}];
     setTodos(newTodos);
     window.localStorage.setItem("todos",newTodos);
     
     
   }


   const  completeTodo=index=>{
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    
    setTodos(newTodos);
    window.localStorage.setItem("todos",newTodos);
    
   }

   
   return (
        <div style={{background:'#e8e8e8',borderRadius:'5px',width:'400px',padding:'5px',marginLeft:'auto',marginRight:'auto'}}>
          <div style={{textAlign:'center'}}> Todo List</div>
          <div style={{margin:'0px auto'}}>
          {todos.length>0?
             todos.map((todo,index)=>(
                <TodoItem index={index} todo={todo} completeTodo={completeTodo} />
            )):

            <img  style={{height:'100px',overflow:'hidden',borderRadius:'4px'}}src="https://tse3.mm.bing.net/th?id=OIP.Ng4gox0qdbLVYw5o6JxLcwHaE8&pid=Api&w=1000&h=667&rs=1&p=0" alt="opps!"/>

           }
          
          

          </div>
          <div>
              <TodoForm addTodo={addTodo}/>
           <div>
            <Badge color="primary" pill >
            {  (()=>{
               const num=todos.filter((todo)=>(todo.isCompleted===true))
                console.log(num)
               return(num.length)
            })()
            }
            </Badge>
            <Badge color="info" pill >
            {  (()=>{
               const num=todos.filter((todo)=>(todo.isCompleted===false))
                console.log(num)
               return(num.length)
            })()
            }
            </Badge>
          </div>
          </div>
        </div>
      );

}

export default PersistantTodo;