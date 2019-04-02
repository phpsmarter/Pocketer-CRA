'use strict'
//TODO  Runkit服务器配置
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
//const MongoClient = require('mongodb').MongoClient;
const express= require( 'express');
//const cors =require( 'cors');
const R =require('ramda');
const {request}=require( 'graphql-request');
const chalk = require('chalk');
const log = console.log;
const { ApolloServer, gql } = require('apollo-server-express');
require('./config');
const { newsModel } = require('./model');
  const typeDefs = gql`
    type News {
        id: ID!
        title: String,
        source: String,
        time: String, 
        url:  String ,
        excerpt: String,
        saveCount:String,
        iamgeUrl:String,
    }

    type Query {
        getAllNews: [News]
    }
    type Mutation {
        addOneNews(
            
            titie: String, 
            source: String,
            time:String,
            url: String,
            excerpt: String,
            saveCount:String,
            imageUrl:String,
        ): News
    }
`;
//!STUB 
// NOTE  Graphql服务器地址, 获取 dom 信息
const gDomApi = 'http://gdom.graphene-python.org/graphql';

const pocket_keywords=["javsacript","react","react-native","redux","styled-components","mongoose"];
//NOTE  graphql的查询字符串
const getList = `query getList($url:String!){
    page(url: $url) {
        List: 
           query(selector: "#best_of_list ul li .item_article") {
           title: text(selector: ".title a")
           source: text(selector: "cite a")
           time: text(selector: "cite span")
           url: attr(selector: ".title a", name: "href")
           excerpt: text(selector: ".excerpt")
           saveCount:text(selector:".save_count")
           imageUrl:attr(selector:".item_image ",name:"data-thumburl")
        }
    }
}`;

const resolvers = {
    Query: {
        getAllNews: async () => await News.find({}).exec()
    },
    Mutation: {
        addOneNews: async (_, args) => {
            try {
                let response = await News.create(args);
                return response;
            } catch(e) {
                return e.message;
            }
        }
    }
};

//SECTION 主文件
 const getPocket=async (searchkeywords=pocket_keywords) => {
  try {
    
    const server = new ApolloServer({ typeDefs, resolvers });
    const app = express();
    server.applyMiddleware({ app });

    app.listen({ port: 4001 }, () =>
      console.log(`🚀 Server ready at http://localhost:4001${server.graphqlPath}`)
    );

    const start = Date.now()
    
    const dbForData= async (args)=>{
           newsModel.create(args); //插入数据
           log(chalk.green('insert %s'),args.title);
    };
    const getData=async (str)=>{
           const Array= await getPagesArray(str);
           //const db= await dbForData(_) ;
           const cate=str;
           //遍历对象添加查询字符串作为分类标记
           const addCate=  (obj)=>{
                return Object.assign({}, obj, {
                    cate: cate,
                })
            }
         
    
           const ArrayaddCate=  Array.map(addCate);
           //console.log(ArrayaddCate[0]);

           //return;
           await  R.map(dbForData,ArrayaddCate);
           log(chalk.blue('%s Completed!'), str);
           
    };

     const  insertData= async (items)=> {
        
        const promises = items.map((item) => getData(item));
        await Promise.all(promises);
        log(chalk.yellow('Total Done !'));     
    }

    await  insertData(searchkeywords);
    
    
    // NOTE  使用 map遍历获取的数据,插入到数据库
    //await  R.map(dbForData,PocketArray);
    const end = Date.now()
    const elpase = end - start
    const times= await MillisecondToDate(elpase)
    log(chalk.red('共计耗时:%s !'),times);  
    //server.close();
  
  } catch (e) {
    log(chalk.red('%s '),e);   
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


// 时间转换


const MillisecondToDate= async (msd)=> {
  var time = parseFloat(msd) / 1000;
  if (null != time && "" != time) {
      if (time > 60 && time < 60 * 60) {
          time = parseInt(time / 60.0) + "分钟" + parseInt((parseFloat(time / 60.0) -
              parseInt(time / 60.0)) * 60) + "秒";
      }
      else if (time >= 60 * 60 && time < 60 * 60 * 24) {
          time = parseInt(time / 3600.0) + "小时" + parseInt((parseFloat(time / 3600.0) -
              parseInt(time / 3600.0)) * 60) + "分钟" +
              parseInt((parseFloat((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) -
              parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60)) * 60) + "秒";
      }
      else {
          time = parseInt(time) + "秒";
      }
  }
  return time;
}
//!SECTION 

//module.exports = getPocket;

getPocket();