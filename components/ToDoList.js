import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    TextInput
} from 'react-native';

const {height, width} = Dimensions.get('window');

class TodoList extends Component {

    constructor(props){
        super(props);

        this.state = {
            isEditing: false,
            todoValue: props.textValue
        }
    }

    static propTypes = {
        textValue: PropTypes.string.isRequired,
        isCompleted: PropTypes.bool.isRequired
    };

    // state = {
    //     dataIsReady: false,
    //     isEditing: false,
    //     isCompleted: false,
    //     todoValue: ''
    // };

    toggleItem = () => {
        this.setState(prevState => {
            return {
                isCompleted: !prevState.isCompleted
            }
        });
    };

    startEditing = () => {
        // const {textValue} = this.props;
        this.setState({
            isEditing: true,
            // todoValue: textValue
        });
    };

    finishEditing = () => {
        this.setState({
            isEditing: false
        });
    };

    controlInput = textValue => {
        this.setState({
            todoValue: textValue
        });
    };

    render() {
        const {isEditing, isCompleted, todoValue} = this.state;

        return (

            <View style={styles.container}>
                <View style={styles.rowContainer}>
                    <TouchableOpacity onPress={this.toggleItem}>
                        <View
                            style={[
                                styles.circle,
                                isCompleted ? styles.completeCircle : styles.incompleteCircle
                            ]}
                        >

                        </View>
                    </TouchableOpacity>
                    {isEditing ? (
                        <TextInput
                            value={todoValue}
                            style={[
                                styles.text,
                                styles.input,
                                isCompleted ? styles.strikeText : styles.unStrikeText
                            ]}
                            multiline={true}
                            returnKeyType={'done'}
                            onBlur={this.finishEditing}
                            onChangeText={this.controlInput}
                        />
                    ) : (
                        <Text
                            style={[
                                styles.text,
                                isCompleted ? styles.strikeText : styles.unStrikeText
                            ]}
                        >
                            {todoValue}
                        </Text>
                    )}

                </View>
                {isEditing ? (
                    <View style={styles.buttons}>
                        <TouchableOpacity
                            onPressOut={
                                this.finishEditing
                            }
                        >
                            <View style={styles.buttonContainer}>
                                <Text style={styles.buttonText}>
                                    ✅
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.buttons}>
                        <TouchableOpacity
                            onPressOut={
                                this.startEditing
                            }
                        >
                            <View style={styles.buttonContainer}>
                                <Text style={styles.buttonText}>
                                    ✏
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.buttonContainer}>
                                <Text style={styles.buttonText}>
                                    ❌
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: width - 50,
        borderBottomColor: '#bbb',
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: 'row',
        alignItems: 'center'
    },
    rowContainer: {
        flexDirection: 'row',
        width: width / 2,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    buttons: {
        flexDirection: 'row'
    },
    buttonContainer: {
        marginVertical: 10,
        marginHorizontal: 10
    },
    text: {
        fontWeight: '500',
        fontSize: 18,
        marginVertical: 20
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 3,
        marginRight: 20
    },
    completeCircle: {
        borderColor: '#bbb'
    },
    incompleteCircle: {
        borderColor: '#DA4453'
    },
    strikeText: {
        color: '#bbb',
        textDecorationLine: 'line-through'
    },
    unStrikeText: {
        color: '#29323C'
    }
});

export default TodoList;