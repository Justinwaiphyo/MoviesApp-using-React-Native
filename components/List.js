import React from 'react';
import { View, FlatList, Text, StyleSheet} from 'react-native';
import Card from './Card';
import PropTypes from 'prop-types';

const propTypes = {
    title : PropTypes.string,
    content : PropTypes.array,
}

class List extends React.PureComponent {
    render() {
        const {navigation, title, content } = this.props;
        return (
            <View style={styles.list}>
                <View>
                    <Text style={styles.text}>{title}</Text>
                </View>
                <View>
                    <FlatList
                        data={content}
                        horizontal= {true}
                        renderItem={({item})=><Card navigation={navigation} item={item} />}>
                    </FlatList>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    list:{
        marginTop:20,
    },

    text:{
        fontSize:20,
        fontWeight:'bold',
        paddingBottom:5,
    }
});

List.propTypes = propTypes;
export default List;