import React, { Suspense } from "react";
import { AppRegistry, View } from "react-native-web";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
//import App from './App';

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo-hooks";

import News from "./views/News";
import Newswithfilter from "./views/Newswithfilter";
import PersistantTodo from "./views/PersistantTodo";



import  Fetching  from "./components/Fetching";

import NavBar from './components/NavBar';

import Count from './views/Count';
import Todo from './views/Todo';
import TodoCalender  from './components/Calender'

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  
});



const App = () =>{
  
  return(
  <Suspense fallback={<Fetching />}>
    <ApolloProvider client={client}>
      
        <View>
        
        <Router>
        <View>
          <Switch>
            <Route path="/" exact component={News} />
            {/* <Route path="/likes" exact component={Likes} /> */}
            <Route path="/count" exact component={Count} />
            <Route path="/todo" exact component={Todo} />
            <Route path="/filter"  component={Newswithfilter} />
            <Route path="/persist"  component={PersistantTodo} />
            <Route path="/cal"  component={TodoCalender} />
          
          </Switch>
        </View>
      </Router>
            
          
        </View>
     
    </ApolloProvider>
  </Suspense>
  )};

AppRegistry.registerComponent("App", () => App);
AppRegistry.runApplication("App", { rootTag: document.getElementById("root") });
