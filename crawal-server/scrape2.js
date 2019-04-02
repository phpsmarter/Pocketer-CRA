

'use strict'
//TODO  Runkit的服务器配置
 //NOTE   文件头
/**
 * Filename: /Users/apple/Public/Git_Bank/graphql-mongodb-example/src/jb51scraper1.js
 * Path: /Users/apple/Public/Git_Bank/graphql-mongodb-example
 * Created Date: Wednesday,  24th December 2018, 6:32:08 pm
 * Author: apple
 * item1 ：抓取pocket网站内容
 * item 2：函数式重构获取方法
 * item 3: 使用函数式编程方法构建了从graphql服务获取数据的方法流,柯理化方法首先传入服务器地址和查询shema,等待url 变量
 * item 4: 构建了在mlab数据库插入数据的方法流, 首先是构建单个对象插入数据库的方法,
 * item 5：准备moongodb配置准备插入数据库--完成
 * Copyright (c) 2018 Your Company
 */

//STUB mlab-Mongodb-express配置的模板方法
const MongoClient = require('mongodb').MongoClient;
const express= require( 'express');
const cors =require( 'cors');
const R =require('ramda');
const {request}=require( 'graphql-request');


// NOTE  Graphql服务器地址, 获取 dom 信息
const gDomApi = 'http://gdom.graphene-python.org/graphql';
//本地服务器地址
const URL = 'http://localhost'
const PORT = 3001
//mongodb的配置信息
const   MONGO_URL='mongodb://user:user1234@ds048368.mlab.com:48368/pocket-excerpt';
//const MONGO_URL ='mongodb://php-smarter:phpsmarter@ds239097.mlab.com:39097/recompose';
//TODO 抓取其他文章,修改javascript字符位置,这里是配置死的,可以通过字符串拼接再传入数据,需要JSON化,在工具有函数
//STUB const  contacturl=(str="javscript")=>`{"url":"https://getpocket.com/explore/${str}?src=search"}`;
//const pocket_reactnative_url={"url":"https://getpocket.com/explore/javascript?src=search"};
const pocket_search_string="ReasonML";
//NOTE  graphql的查询字符串
const getList = `query getList($url:String!){
    page(url: $url) {
        List: 
           query(selector: "#best_of_list ul li .item_content") {
           title: text(selector: ".title a")
           source: text(selector: "cite a")
           time: text(selector: "cite span")
           url: attr(selector: ".title a", name: "href")
           excerpt: text(selector: ".excerpt")
        }
    }
}`;

//SECTION 主文件
const start = async () => {
  try {
    
    const app = express()
    app.use(cors())
    app.use(express.static(__dirname))
    await app.listen(PORT, () => {
      console.log(`Visit ${URL}:${PORT}`)
    })

    const start = Date.now()
    //mongodb 实例化时比之前有改变
    const db = await MongoClient.connect(MONGO_URL,{ useNewUrlParser: true })
    //NOTE  添加了这一步,再次实例化数据库
    const mydb = db.db('pocket-excerpt');
    //const res=await pageFactory(pocket_reactnative_url);
    const PocketArray= await getPagesArray(pocket_search_string);
    //console.log(PocketArray);return;
    //这里是collection
    const dbForData= async (collection)=>(data)=>{mydb.collection(collection).insertOne(data)};
    // NOTE  使用 map遍历获取的数据,插入到数据库
    await  R.map(dbForData,PocketArray);
    const end = Date.now()
    const elpase = end - start
    console.log('操作花费时间:', elpase)
  
  } catch (e) {
    console.log(e)
  };
}
//!SECTION 

//NOTE  获取数据的方法,request 是异步方法,返回promise对象,函数经过柯理化
const handleGrqphcoolDataTemplate = R.curry(
    (api, template, variables) => (
        request(api, template, variables).then(data => {
          return data;
        })
    )
)
//SECTION Utils 函数区
//NOTE  柯理化的函数先传递 graphql服务器的地址和schema,等待 url 变量
const queryData = handleGrqphcoolDataTemplate(gDomApi,getList);

//NOTE 异步compose方法, compose中每个函数都是异步的,也可以是同步函数,reduce函数,上一步的resolve,作为下一步的输入
const asyncompose = (...functions) => input =>  ( 
   functions.reduceRight((chain, func) => chain.then(func),   Promise.resolve(input))
)
//1,拼接链接
//const getUrlStringOfJb51 = (num=1) => (`{"url":"http://www.jb51.net/list/list_243_${num}.htm"}`) 
//并行的第一步, pocket 拼接的是搜索的字符串
const  getUrlStringOfpocket=(str="javscript")=>`{"url":"https://getpocket.com/explore/${str}?src=search"}`; 
const JsonFormat = (UrlString) => JSON.parse(UrlString)  // 2 格式化模板json化
const queryPages = (queryStr) => queryData(queryStr)  //3  查询数据
//4 数据脱括号的方法,去掉前面的几层花括号的层级 
const getArray =async (obj) => obj.page.List;
//NOTE 在JB51实例中,传入页数就可以了, 总页数可以通过分页的LastPage来获取,从右向左,流程就是先拼接链接字符串,接着把拼接字符串转为 json对象, 然后传入等待链接的graphql查询函数,使用异步compose
const getPagesArray = asyncompose(getArray,queryPages,JsonFormat,getUrlStringOfpocket); 
//!SECTION 
start();