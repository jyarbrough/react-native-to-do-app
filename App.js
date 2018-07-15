import React from 'react';
import ReactDOM from 'react-dom';
import {StatusBar, StyleSheet, Text, View, TextInput, Dimensions, Platform, ScrollView} from 'react-native';
import {LinearGradient} from 'expo';
import ToDoList from './components/ToDoList';

export default class App extends React.Component {

    state = {
        newToDoItem: ''
    };

    newToDoItemController = textValue => {
        this.setState({
            newToDoItem: textValue
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <LinearGradient
                    colors={['#DA4453', '#89216B']}
                    style={styles.container}
                >
                    <StatusBar barStyle="light-content"/>
                    <Text style={styles.appTitle}>Minimalist Todo App</Text>
                    <View style={styles.card}>
                        <TextInput
                            style={styles.input}
                            placeholder={"Add an item!"}
                            value={this.newToDoItem}
                            onChangeText={this.newToDoItemController}
                            placeholderTextColor={'#999'}
                            returnKeyType={'done'}
                            autoCorrect={false}
                        />
                        <ScrollView contentContainerStyle={styles.listContainer}>
                            <ToDoList/>
                        </ScrollView>
                    </View>
                </LinearGradient>
            </View>
        );
    }
}


const {height, width} = Dimensions.get('window');


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        width: '100%'
    },
    listContainer: {
        alignItems: 'center'
    },
    appTitle: {
        color: '#fff',
        fontSize: 36,
        marginTop: 60,
        marginBottom: 30,
        fontWeight: '300'
    },
    card: {
        backgroundColor: '#fff',
        flex: 1,
        width: width - 25,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        ...Platform.select({
            ios: {
                shadowColor: 'rgb(50,50,50)',
                shadowOpacity: 0.5,
                shadowRadius: 5,
                shadowOffset: {
                    height: -1,
                    width: 0
                }
            },
            android: {
                elevation: 5
            }
        })
    },
    input: {
        padding: 20,
        borderBottomColor: '#bbb',
        borderBottomWidth: 1,
        fontSize: 24
    }
});
