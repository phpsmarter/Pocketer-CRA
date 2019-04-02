# Pocketer-CRA
> 本项目有三个部分:
> 1.  爬虫获取资源,在使用mongoose在mlab数据库存储数据
> 2.  使用mlab的数据构建 graphql-server
> 3.  CRA客户端使用 Apollo-client从graphql-server获取数据


## 爬虫部分

### graphen-python.org 工具
使用[`gdom`](http://gdom.graphene-python.org/graphql?query=%7B%0A%20%20page(url%3A%22http%3A%2F%2Fwww.jb51.net%2Flist%2Flist_3_2.htm%22)%20%7B%0A%20%20%20%20items%3A%20query(selector%3A%22div.artlist%20dt%20%22)%20%7B%20%0A%20%20%20%20%20%20%20title%3Atext(selector%3A%22a%22)%0A%20%20%20%20%20%20%20%20url%3A%20attr(selector%3A%22a%22%2C%20name%3A%22href%22)%0A%20%20%20%20%20%20%20%20time%3A%20text(selector%3A%22span%22)%0A%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%7D%0A%20%20%20%20%20%20%0A%20%20%7D%0A%20%20%0A%7D) 获取dom数据.


###  从grphql-server请求数据的方法

```bash
const {request}=require( 'graphql-request');
```
使用request方法,传入三个参数,`url`地址,查询`schema`,查询字符串 `string`.  
通过`Ramda`的工具函数构建流程

### 构建数据写入流程
利用ramda库将流程函数式化.
写入路程中在对多个查询参数的数组处理中使用了`promise.all`的方法, 非阻塞并行处理多个数据抓取以及写入数据的流程.

```javascript
const  insertData= async (items)=> {
        const promises = items.map((item) => getData(item)); //从目标网站获取数据的函数
        await Promise.all(promises);
        log(chalk.yellow('Total Done !'));  //最终完成的提示    
}
```

### 写入mlab数据库

利用mongoose构建数据库模型.

##  graphql-server部分.

### 原理
graphql-server本质是位于数据库之前的一个数据层, 为数据定义和查询提供强类型定义, 可以一次查询返回多个api的数据,减少请求次数.
### 使用工具
本例使用Apollo-server构建, 定义type类型和增删改查的resolver函数.   
底层从mlab数据库获取数据. 之前也构建了Prisma的graphql 服务器,底层是mysql数据库, 底层的实现细节几乎不可看. 这里的服务器需要自己构建从解析函数到数据库的流程.

## CRA 客户端

### 入口文件导入Apollo Provider
客户端结合create-react-app和Apollo-client的 React-hooks版本 .

由于是数据层, 不会影响路由,所以在最顶层进行包装

```javascript
mport ApolloClient from "apollo-boost";
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
```


###  页面组件中的查询操作

1.引入工具
2.定义查询schema
3.编写组件

由于apollo-client已经封装了请求数据的状态,可以根据查询的状态返回不同的组件


```javascript
//导入查询工具
import { gql } from "apollo-boost";
import {  useQuery } from "react-apollo-hooks";


//定义查询 schema

const GET_NEWS = gql`
  {
    getAllNews {
      id
      title
      cate  
      url
      excerpt
      imageUrl
      saveCount
    }
  }
`;


const News = () => {
  
  const { data, error } = useQuery(GET_NEWS);
  const AllNews=data.getAllNews;
  return (
    <View style={styles.container}>
      <NavBar />
      {error ? (
        <Error />
      ) : (
        

        <div style={{alignItems:'center',justifyContent:'space-around',marginLeft:"150px"}}>
                {  AllNews.map((news,index)=>(
                    <Card body outline color="success" style={{height:'350px', overflow:'hidden',float:"left",width:"300px",boxShadow:"1px 1px 2px gray",margin:'10px'}}>
                    <a href={`${news.url}`} style={{textDecoration:'none',}}
                    key={index}
                    >
                      
                     <CardImg top width="100%" src={`${news.imageUrl}`} alt="Card image cap" />
                     </a> 
                     <CardHeader>{news.cate?news.cate:'Header'}</CardHeader>
                     <CardBody>
                     <CardTitle className="text-center">{news.title?news.title:'title'}</CardTitle>
                     <CardText className="text-center"> {news.excerpt?news.excerpt:"excerpt"}</CardText>
                     </CardBody>
                     <CardFooter>
                       <span>{news.time}</span>
                       <span>{news.saveCount}</span>
 
                     </CardFooter>
                 </Card>
                    
                ))}
        </div>
       
        // <NewsList
        //   data={data.getAllNews}
          
        //   renderRow={(data,type) => (
              
        //       <NewsCard {...data} title={data}/>
              
        
        //   )}
        // />
         
      )}
    </View>
  );
};
```
