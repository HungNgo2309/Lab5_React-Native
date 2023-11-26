import React, { useEffect, useState } from "react";
import { View,ImageBackground,TouchableOpacity, Image, Animated, ScrollView } from "react-native";
import { Text } from "react-native-paper";
const LineDriver=()=>{
    return(
        <View style={{width:1,paddingVertical:5}}>
                <View style={{flex:1,borderLeftColor:'gray', borderLeftWidth:1}}>
                </View>
        </View>
    )
}
const BookDetail =({route,navigation})=>{
    const[book,setBook]= useState(null);
    const[ScrollViewWholeHeight, setScrollViewWholeHeight]=useState(1);
    const[ScrollViewVisibleHeight, setScrollViewVisibleHeight]=useState(0);
    const indicator= new Animated.Value(0);
    useEffect(()=>{
        let{book}= route.params;;
        setBook(book);
    },[book])
    function renderBookInfoSection()
    {
        return(
            <View style={{flex:1}}>
                <ImageBackground source={{uri:book.bookCover}}
                resizeMode="cover"
                style={
                    {
                        position:'absolute',
                        top:0,
                        right:0,
                        left:0,
                        bottom:0,
                    }
                }/>
                <View style={
                    {
                        position:'absolute',
                        top:0,
                        right:0,
                        left:0,
                        bottom:0,
                        backgroundColor:'rgba(240,240,232,0.9)'
                    }
                }>
                </View>
                <View style={{flexDirection:'row',paddingHorizontal:3,height:80,alignItems:'flex-end'}}>
                    <TouchableOpacity style={{marginLeft:5}} onPress={()=>navigation.goBack()}>
                        <Text>Về nè </Text>
                        <Image
                            source={require('../img/back_arrow_icon.png')}
                            resizeMode="contain"
                            style={{
                                tintColor:'#000',
                                width:25,
                                height:25,
                            }}
                        />
                    </TouchableOpacity>
                    <View style={{flex:1,alignItems:"center",justifyContent:'center'}}>
                            <Text>Book Dateil</Text>
                    </View>
                    <TouchableOpacity>
                        <Image
                            source={require('../img/more_icon.png')}
                            resizeMode="contain"
                            style={{
                                width:30,
                                height:30,
                                alignSelf:'flex-end',
                            }}
                        />
                    </TouchableOpacity>
                </View>
                    
                <View style={{flex:5,paddingTop:10,alignItems:'center'}}>
                            <Image
                                source={{uri:book.bookCover}}
                                resizeMode="contain"
                                style={{
                                    flex:1,
                                    width:150,
                                    height:'auto'
                                }}
                                />
                </View>
                <View style={{flex:1.8,alignItems:'center',justifyContent:'center'}}>
                        <Text style={{fontWeight:"bold",fontSize:25,textAlign:'center'}}>{book.bookname}</Text>
                        <Text >{book.author}</Text>
                </View>
                <View style={{flexDirection:'row',paddingVertical:20,backgroundColor:'rgba(0,0,0,0.3)',marginBottom:10,
                        marginLeft:10,marginRight:10,borderRadius:20,marginTop:10}}>
                    <View style={{flex:1,alignItems:'center'}}>
                            <Text>{book.rating}</Text>
                            <Text>Rating</Text>
                    </View>  
                    <LineDriver/>
                    <View style={{flex:1,alignItems:'center',paddingHorizontal:5}}>
                            <Text>{book.pageNo}</Text>
                            <Text>Number of Page</Text>
                    </View>  
                    <LineDriver/>
                    <View style={{flex:1,alignItems:'center'}}>
                            <Text>{book.language}</Text>
                            <Text>Language</Text>
                    </View> 
                </View>
            </View>
        )
    }
    function renderBookDescription(){
        const indicatorSize=ScrollViewWholeHeight>ScrollViewVisibleHeight?ScrollViewVisibleHeight*ScrollViewVisibleHeight/ScrollViewWholeHeight:
                             ScrollViewVisibleHeight;
        const difference= ScrollViewVisibleHeight>indicatorSize?ScrollViewVisibleHeight-indicatorSize:1;
        return(
            <View style={{flex:1,flexDirection:'row',padding:5}}>
                    <View style={{width:4,height:'100%',backgroundColor:'gray'}}>
                        <Animated.View
                        style={{
                            width:4,
                            height:indicatorSize,
                            backgroundColor:"#7D7E84",
                            transform:[{
                                translateY:Animated.multiply(indicator,ScrollViewVisibleHeight/ScrollViewWholeHeight)
                                .interpolate({
                                    inputRange:[0,difference],
                                    outputRange:[0,difference],
                                    extrapolate:'clamp'
                                })
                            }]

                        }}
                        />
                    </View>
                    <ScrollView
                        contentContainerStyle={{paddingLeft:5}}
                        showsVerticalScrollIndicator={false}
                        scrollEventThrottle={16}
                        onContentSizeChange={(width,height)=>{
                            setScrollViewWholeHeight(height)
                        }}
                        onLayout={({nativeEvent:{layout:{x,y,width,height}}})=>{
                            setScrollViewVisibleHeight(height)
                        }}
                        onScroll={Animated.event(
                            [{nativeEvent:{contentOffset:{y:indicator}}}],
                            {useNativeDriver:false}
                        )}>
                            <Text style={{color:'white',textAlign:'center'}}>Description</Text>
                            <Text style={{color:'white'}}>{book.Description}</Text>
                    </ScrollView>
            </View>
        )
    }
    function renderBottoButton(){
        return (
            <View style={{flex:1,flexDirection:'row'}}>
                <TouchableOpacity style={{
                    width:60,
                    backgroundColor:'secondary',
                    marginLeft:10,
                    marginVertical:5,
                    borderRadius:12,
                    alignItems:'center',
                    justifyContent:'center'
                }}
                onPress={()=>console.log("Bookmark")}>
                        <Image
                            source={require('../img/bookmark_icon.png')}
                            resizeMode="contain"
                            style={{
                                width:25,
                                height:25,
                                tintColor:"#EFEFF0"
                            }}
                        />
                </TouchableOpacity>
                <TouchableOpacity
                 style={{
                    flex:1,
                    backgroundColor:'green',
                    marginHorizontal:10,
                    borderRadius:12,
                    alignItems:'center',
                    justifyContent:'center'
                 }}
                 onPress={()=>console.log("Start Reading")}>
                    <Text style={{color:'white'}}>Start Reading</Text>
                </TouchableOpacity>
            </View>
        )
    }
    if(book){
    return (
           <View style={{flex:1,backgroundColor:'black'}}>
                <View style={{flex:4}}>
                    {renderBookInfoSection()}
                </View>
                <View style={{flex:2}}>
                    {renderBookDescription()}
                </View>
                <View style={{height:70,marginBottom:30}}>
                    {renderBottoButton()}
                </View>
            </View> 
    )
    }else{
        return(<></>)
    }
}
export default BookDetail;