import React from "react";
//import NewsCard from '../components/NewsCard';
//import NewsList from '../components/NewsList';
import { gql } from "apollo-boost";
import {  useQuery } from "react-apollo-hooks";
import Header from "../components/Header";
import {View,StyleSheet} from 'react-native-web';

import Fetecthing from "../components/Fetching";
import Error  from '../components/Error';

import { CardImg,Card,CardBody,CardTitle ,CardText,CardHeader,CardFooter} from 'reactstrap';
import NavBar from '../components/NavBar';
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
                {  AllNews.map((news)=>(
                    <Card body outline color="success" style={{height:'350px', overflow:'hidden',float:"left",width:"300px",boxShadow:"1px 1px 2px gray",margin:'10px'}}>
                    <a href={`${news.url}`} style={{textDecoration:'none',}}>
                      
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

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex:1,
    display:'column',  
  }
});

export default News;