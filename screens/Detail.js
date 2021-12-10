import React, {useEffect, useState}from 'react'
import { ScrollView, StyleSheet, Image, Dimensions, Text, View, Modal, Pressable} from 'react-native';
import {getMovie} from '../services/services';
import StarRating from 'react-native-star-rating';
import dateFormat from 'dateformat';
import PlayButton from '../components/PlayButton';
import VideoPlayer from 'react-native-video-controls';
import Video from '../components/Video';
    const placeholderImage = require('../assets/images/placeholder.png')
    const height = Dimensions.get('screen').height;

    const Detail = ({route,     igation}) => {
    const movieId = route.params.movieId;
    const [movieDetail, setMovieDetail] = useState();
    const [loaded, setLoaded] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(()=>{
        getMovie(movieId).then(movieData =>{
            setMovieDetail(movieData);
            setLoaded(true);
        })
    }, [])

    const videoShown = () => {
        setModalVisible(!modalVisible)
    }
    return (
        <React.Fragment>
            {loaded && (<ScrollView>
                <Image 
                style={styles.image}
                source={
                    movieDetail.poster_path 
                    ? {uri : 'https://image.tmdb.org/t/p/w500' + movieDetail.poster_path}
                    : placeholderImage
                    }/>
                    <View style={styles.container}>
                        <View style={styles.playButton}>
                            <PlayButton handlePress={videoShown}/>
                        </View>
                        <Text style={styles.text}>{movieDetail.title}</Text>
                        {movieDetail.genres &&(
                            <View style={styles.genreContainer}>
                                {movieDetail.genres.map(genre =>{
                                    return <Text style={styles.genre} key={genre.id}>{genre.name}</Text>
                                })}
                            </View> 
                        )}
                         <StarRating 
                        fullStarColor={'gold'}
                        starSize={30}
                        disabled={true}
                        maxStars={5}
                        rating={movieDetail.vote_average / 2}
                        ></StarRating>
                        <Text style={styles.overview}>Overview : {movieDetail.overview}</Text>
                        <Text style={styles.release}>{'Release Data : ' + dateFormat(movieDetail.release_date,'mmmm dS, yyy')}</Text>
                    </View>
            </ScrollView>)}
            <Modal supportedOrientations = {['portrait','landscape']} animationType="slide" visible={modalVisible}>
                <View style={styles.modalView}>
                    <Video  onClose={videoShown}/>
                </View>
            </Modal>
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center', 
    },
    image:{
        height:height / 2,
    },
    text:{
        fontSize:18,
        fontWeight:'bold',
        marginTop:10
    },
    genreContainer:{
        flexDirection:'row',
        marginTop:20,
        marginBottom:20
    },
    genre:{
        marginRight:10,
        fontWeight:'bold',
    },
    overview:{
        padding:15
    },
    release:{
        fontWeight:'bold'
    },
    playButton:{
        position: 'absolute',
        top: -25,
        right : 20,
    },
    modalView:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})
export default Detail;