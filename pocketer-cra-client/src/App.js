import React, { Component } from 'react';
import {Button} from 'reactstrap'
import Fetching from './components/Fetching'
import Error from './components/Error'
import NewsCard from './components/NewsCard'


class App extends Component {
  render() {
    return (
       <div style={{padding:'20px',width:'100%',height:'500px',flexDirection:'row', display:'flex'}}>
        <NewsCard style={{flex:1}}/>
        <NewsCard style={{flex:1}}/> 
        <NewsCard style={{flex:1}}/> 
        <NewsCard style={{flex:1}}/> 
    
       </div>
        
     
    );
  }
}

export default App;
