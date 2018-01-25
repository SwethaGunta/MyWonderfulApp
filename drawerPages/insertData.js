import React, {Component} from 'react';
import {View, Text, Picker, Dimensions, Switch, Alert} from 'react-native';
import {Container, Button, Content, Spinner, Thumbnail, Form, Item, Input, CheckBox, Header, Left, Body,Title, Label} from 'native-base';
import { displayTables, getData } from '../connectServerPages/myAPI';

export default class InsertData extends Component{
    static navigationOptions={
        title: 'Insert Data'
    }
    constructor(){
        super();
       this.state={
           isLoggedIn: true,
           fontsAreLoaded: false,
           isLoading: true,
           pickerlabel: '',
           table_names: [],
           cols_of_sel_tab: []
       }
    }
       async componentWillMount(){
        this.setState({...this.state, fontsAreLoaded: true})
       }
       async componentDidMount(){
        let resp = await displayTables();
        if(resp.status !== 200){
            if (resp.status === 504) {
              Alert.alert("Network Error", "Check your internet connection" )
            } else {
              Alert.alert("Error", "Login as admin")      
            }
          } else {
            this.setState({...this.state,isLoading:false});
            console.log("Response is: " + resp._bodyText);
            let parsedData = JSON.parse(resp._bodyText);
            this.setState({...this.state,table_names:parsedData})
          }
    }
handlePress = async ()=>{
    this.setState({...this.state,isLoading:true});
    let resp = await getData(this.state.pickerlabel);
    if(resp.status !== 200){
        if (resp.status === 504) {
          Alert.alert("Network Error", "Check your internet connection" )
        } else {
          Alert.alert("Error", "Data not available")      
        }
      } else {
        this.setState({...this.state,isLoading:false});
        console.log("Response is: " + resp._bodyText);
 
        let parsedData = JSON.parse(resp._bodyText);
        console.log("Parsed Output: "+ parsedData);
        this.setState({...this.state,cols_of_sel_tab:parsedData})
        
      }
}
    // populateTables = async()=>{
    //     let resp = await displayTables();

    //     if(resp.status !== 200){
    //         if (resp.status === 504) {
    //           Alert.alert("Network Error", "Check your internet connection" )
    //         } else {
    //           Alert.alert("Error", "Login as admin")      
    //         }
    //       } else {
    //         this.setState({isDataPresent:true});
    //         console.log("Data present: " + this.state.isDataPresent);
    //         console.log("Response is: " + resp._bodyText);
    //         let parsedData = JSON.parse(resp._bodyText);
    //         this.setState({...this.state,table_names:parsedData})
    //       }
    // }
    render(){

        if(this.state.isLoading === true)
        {
            return(<View style={{flex: 1, paddingTop: 20}}>
            <Spinner color='blue'/>
            </View>)
        }
        if(this.state.fontsAreLoaded === true){
            if(this.state.isLoggedIn === true){
        return(
            <Container>
            <Header>
                <Left>
                <Button transparent onPress={this.handlePress}>
                <Thumbnail size={16} source={{uri:'https://i.pinimg.com/736x/7c/09/06/7c090686c035c36a78f17d6955ae6980--film-avatar-movie-photo.jpg'}}/>
                </Button>
                </Left>
                <Body>
                    <Title> Welcome Name </Title>
                    </Body>
                </Header>
                <Content>
                <Picker
                    selectedValue={this.state.pickerlabel}
                    onValueChange={(itemValue, itemIndex) => this.setState({pickerlabel: itemValue})}>
                    
                    {   this.state.table_names.map((table, key)=>(
                            <Picker.Item label={table.table_name} value={table.table_name} key={key}/>)
                        )
                    }
                </Picker>
                <Button onPress={this.handlePress}><Text>
                  Select</Text></Button>
                  <Text style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignContent: 'center'
                  }}>{this.state.pickerlabel}</Text>
                  
                  { 
                      this.state.cols_of_sel_tab.map((col, key)=>(
                          <Item key={key}>
                          { 
                              //assign col.table_cols to state
                              <Label >{col.table_cols}</Label>
                              
                            }
                            </Item>
                      ))
                  } 
                </Content>
            </Container>
        );
    }
}
    }
} 


{/* col.table_cols.col_1
                              col.table_cols.col_2 
                              have to iterate over table_cols*/}