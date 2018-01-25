import React, {Component} from 'react';
import {View,Text} from 'react-native';
import {Button, Header, Title, Container, Content} from 'native-base';

export default class DeleteTable extends Component{
render(){
    return(
        <Container>
            <Header>
                <Title>
                    Welcome Name!
                    </Title>
                </Header>
                <Content>
                    <Text>
                        Deleting a Table.
                    </Text>

                </Content>
            </Container>
    );
}
}