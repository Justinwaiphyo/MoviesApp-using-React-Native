import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const propsType = {
    errorText1 : PropTypes.string,
    errorText2 : PropTypes.string,
};

const defaultProps = {
    errorText1 : 'Oops something was wrong.',
    errorText2 : 'Make sure you are online and restart application'
};

class Error extends React.PureComponent {
    render() {
        const {errorText1, errorText2} = this.props;
        return (
            <View style={style.container}>
                <Text style={style.text}>{errorText1}</Text>
                <Text style={style.text}>{errorText2}</Text>
            </View>
        );
    }
}

const style = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    text:{
        fontWeight:'bold'
    }
})
Error.propType = PropTypes;

Error.defaultProps = defaultProps;

export default Error;
