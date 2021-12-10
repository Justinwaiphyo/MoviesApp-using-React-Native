import React, { Fragment, useEffect, useState, } from 'react';
import {ActivityIndicator, View, StyleSheet, Dimensions, ScrollView} from 'react-native';
import { getPopularMovies, getUpcomingMovies, getFamilyMovie, getDrama } from '../services/services';
import { SliderBox } from "react-native-image-slider-box";
import { react } from '@babel/types';
import List from '../components/List';
import Error from '../components/Error';

const dimension = Dimensions.get('screen');

const Home = ({navigation}) => {
  const [moviesImages, setmoviesImages] = useState();
  const [popularMovies, setPopularMovies] = useState();
  const [familyMovie, setfamilyMovie] = useState();
  const [drama, setDrama] = useState();
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState();
  const getData = () =>{
      return Promise.all([
        getUpcomingMovies(),
        getPopularMovies(),
        getFamilyMovie(),
        getDrama(),
      ]);
  };
  useEffect(()=>{
  
    getData().then(
        ([
        upcomingMoviesData,
        popularMoviesData,
        familyMovieData,
        dramaData,
    ])=>{
        const moviesImagesArray = [];
        upcomingMoviesData.forEach(movie => {
                moviesImagesArray.push('https://image.tmdb.org/t/p/w500' + movie.poster_path);
            });
            setmoviesImages(moviesImagesArray);
            setPopularMovies(popularMoviesData);
            setfamilyMovie(familyMovieData);
            setDrama(dramaData);
            setLoaded(true);
    },
    ).catch(()=>{
        setError(true)
    });
    }, []);
    return (
        <Fragment>
            {loaded && !error && (<ScrollView>
            {moviesImages && (
                <View style={styles.sliderContainer}>
                <SliderBox 
                images={moviesImages}
                dotStyle = {styles.sliderStyle}
                autoplay={true} 
                circleLoop={true}
                sliderBoxHeight={dimension.height/ 1.5}
                />
            </View>
            )}
        {popularMovies && (
            <View style={styles.list}>
            <List navigation={navigation} title="Popular Movies"  content={popularMovies} />
        </View>
        )}
        {familyMovie && (
            <View style={styles.list}>
            <List navigation={navigation} title="Family Movies" content={familyMovie} />
        </View>
        )}
        {drama && (
            <View style={styles.list}>
            <List navigation={navigation} title="Drama" content={drama} />
        </View>
        )}
        
        </ScrollView>)}
        {!loaded && (<ActivityIndicator size='large'/>)}
        {error && <Error />}
        </Fragment>
    );
}

const styles = StyleSheet.create({
    sliderContainer: {
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        marginBottom:25
    },
    sliderStyle: {
        height:0
    },
    carousel:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
    },
    list:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
    }
  });
export default Home;