import React,{Component} from 'react';
import {Text,View,StyleSheet,TextInput,TouchableOpacity} from 'react-native';
import { Header } from 'react-native-elements';
import dictionary from './database';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      text: '',
     isSearchPressed:false,
     isLoading:false,
     word : "Loading...",
     lexicalCategory:'',
     definition:"",
    };
  }

getWord=(text)=>{
  var text = text.toLowerCase()
  try{
    var word = dictionary[text]["word"]
    var lexicalCategory = dictionary[text]["lexicalCategory"]
    var definition = dictionary[text]["definition"]
    this.setState({
      "word":word,
      "lexicalCategory":lexicalCategory,
      "definition":definition,
    })
  }
catch(err){
  alert("Sorry this word is not available for now")
  this.setState({
    'text':'',
    'isSearchPressed':false
  })}}

render(){
  return(
    <View style={{flex:1,borderWidth:2,}}>
    <Header backgroundColor={'purple'}
    centerComponent={{
      text:'Pocket Dictionary',
      style:{color:'#fff',fontSize:20},
    }}
    />
    <View style={styles.inputBoxContainer}>
    <TextInput 
    style={styles.inputBox}
    onChangeText={text => {
      this.setState({
        text:text,
        isSearchPressed:false,
        word:"Loading...",
        lexicalCategory:'',
        examples:[],
        definition:'',
      })
    }}
    value={this.state.text}
     />

<TouchableOpacity
style={styles.searchButton}
onPress={()=>{
  this.setState({isSearchPressed:true});
  this.getWord(this.state.text)
}}>
<Text style={styles.searchText}>Search</Text>
</TouchableOpacity>
 </View>
 <View style={styles.outputContainer}>
 <Text style={{fontSize:20}}>{this.state.isSearchPressed && this.state.word === "Loading..."
 ?this.state.word:""
 }</Text>
 {
   this.state.word !== "Loading..."?
   (
     <View style={{justifyContent:"center",marginLeft:10}}>
     <View style={styles.detailsContainer}>
     <Text style={styles.detailsTitle}>
     Word:{""}
     </Text>
     <Text style={{fontSize:18}}>
     {this.state.word}
     </Text>
     </View>
     <View style={styles.detailsContainer}>
     <Text style={styles.detailsTitle}>
     Type:{""}
     </Text>
     <Text style={{fontSize:18}}>
     {this.state.lexicalCategory}
     </Text>
     </View>
     <View style={{flexDirection:'row',flexWrap:'wrap'}}>
     <Text style={styles.detailsTitle}>
     Definition:{""}
     </Text>
     <Text style={{fontSize:18}}>
     {this.state.definition}
     </Text>
     </View>
     </View>
   )
   :null
 }
 </View>
 </View>
  )}}

const styles = StyleSheet.create({

inputBoxContainer:{
 flex:0.3,
  alignSelf:'center',
  justifyContent:'center',
},
inputBox:{
alignSelf:'center',
textAlign:'center',
borderWidth:4,
height:40,
width:80,
},
searchButton:{
borderRadius:10,
backgroundColor:'gold',
marginTop:20,
marginLeft:20,
borderWidth:2,
height:40,
width:40,
justifyContent:'center',
alignItems:'center',
},
searchText:{
  fontSize:20,
  fontWeight:'bold',
},
outputContainer:{
  flex:0.7,
  alignItems:'center',
},
detailsContainer:{
 flexDirection:'row',
  alignItems:'center',
},
detailsTitle:{
   fontSize:20,
  fontWeight:'bold',
  color:'orange',
}
})