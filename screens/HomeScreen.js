import * as React from 'react';
import { Text, View, StyleSheet, TextInput,TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import {Header} from 'react-native-elements';


export default class HomeScreen extends React.Component{
   constructor(){
        super();
            this.state={
                text:'',
                    isSerchPressed:'',
                         word:'',
                             lexicalCategory:'',
                                 examples:'',
                                       definition:''
            }
    }
    getWord=(word)=>{
        var searchKeyword=word.toLowerCase();
        var url="https://rupinwhitehatjr.github.io/dictionary/"+searchKeyword+".json"

            return fetch(url)
                .then((data)=>{
                    if(data.status){
                    return data.jason();
                    }
                    else{
                    return null
                    }
    })
     .then((response)=>{
            var responseObject=response
                if(responseObject){
                        var wordData=responseObject.definitions[0];
                        var definition = wordData.description
                        lexicalCategory=wordData.wordtype
                        this.setState({
                            "word":this.state.text,
                            "definition":definition,
                            "lexicalCategory":lexicalCategory
                        })

             }
                else{
                    this.setState({
                        "word":this.state.text,
                        "definition":"Not Found",
                    })

                 }
        })   
    }

  render(){
    return(
        <View>
         <TextInput 
            style={styles.inputBox}
                onChangeText={text=>{
                this.setState({
                    text:text,
                    isSerchPressed:false,
                    word:'Loding...',
                    lexicalCategory:'',
                    examples:[],
                    definition:""
                    });
                }}
                value={this.state.text}
        />

            <TouchableOpacity
                style={styles.buttonText}
                    onPress={()=>{
                        this.setState({isSerchPressed:true});
                        this.getWord(this.state.text);
                    }}
            >
                Search
            </TouchableOpacity>

                    <View>
                        <Text>
                            Word:{""}
                        </Text>
                            <Text style={{fontSize:18}}>
                                {this.state.word}
                            </Text>
                    </View>

                        <View>
                            <Text>
                                Type:{""}
                            </Text>
                                <Text style={{fontSize:18}}>
                                    {this.state.lexicalCategory}
                                </Text>
                        </View>

                        <View style={{flexDirectio:'row',flexWrap:'wrap'}}>
                            <Text>
                                Definition:{""}
                            </Text>
                                <Text>{this.state.definition}</Text>
                        </View>
             
        </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b8b8b8',
  },
    inputBox:{
        marginTop:200,
        width:'80%',
        alignSelf:'center',
        height:40,
        textAlign:'center',
        borderWidth:4,
        outline:'none',
    },

        goButton: { width: '50%', 
        height: 55,
        alignSelf: 'center',
        padding: 10,
        margin: 10, },

            buttonText: { textAlign: 'center',
            fontSize: 30,
            fontWeight: 'bold'}, 

                displayText: {
                textAlign: 'center',
                fontSize: 30}


});