import React from 'react';
import ReactDOM from 'react-dom';
import {StatusBar, StyleSheet, Text, View, TextInput, Dimensions, Platform, ScrollView} from 'react-native';
import {LinearGradient, AppLoading} from 'expo';
import TodoList from './components/ToDoList';
import uuidv1 from 'uuid/v1';

export default class App extends React.Component {

    state = {
        newToDoItem: '',
        dataIsReady: false,
        todos: {}
    };

    newToDoItemController = textValue => {
        this.setState({
            newToDoItem: textValue
        });
    };

    componentDidMount = () => {
        this.loadTodos();
    };

    loadTodos = () => {
        this.setState({
            dataIsReady: true
        })
    };

    addTodo = () => {
        const {newTodoItem} = this.state;

        if (newTodoItem !== '') {
            this.setState(prevState => {
                const ID = uuidv1();
                const newTodoObject = {
                    [ID]: {
                        id: ID,
                        isCompleted: false,
                        textValue: newTodoItem,
                        createdAt: Date.now()
                    }
                };

                const newState = {
                    ...prevState,
                    newTodoItem: '',
                    todos: {
                        ...prevState.todos,
                        ...newTodoObject
                    }
                };

                return {...newState};
            });
        }
    };

    render() {

        const {newTodoItem, dataIsReady, todos} = this.state;

        if(!dataIsReady){
            return <AppLoading/>;
        } else {
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

                                {Object.values(todos).map(todo =>
                                    <TodoList
                                        key = {todo.id} {...todo}
                                    />
                                )}
                            </ScrollView>
                        </View>
                    </LinearGradient>
                </View>
            );
        }
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
