import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import instance from "../api/axios";
import PlayButton from "./PlayButton";
import AddWatchListButton from "./AddWatchListButton";

export const BASE_URL = "https://image.tmdb.org/t/p/original/";

const Banner = ({ fetchUrl }) => {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await instance.get(fetchUrl);
        // console.log("배너",response)
        setMovie(response.data.results[Math.floor(Math.random() * response.data.results.length)]);
      } catch (error) {
        console.error("데이터를 불러오는 데 실패했습니다: ", error);
      }
    }
    fetchData();
  }, []);
  



  return (
    <View style={styles.bannerContainer}>
      <Image
        source={{
          uri: `${BASE_URL}${movie?.poster_path || movie?.backdrop_path}`,
        }}
        style={{
          width: "100%",
          height: 450,
          marginHorizontal: 10,
          borderRadius: 15,
          borderColor: "#3f3f45",
          objectFit: "cover",
        }}
      />
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <PlayButton/>
        </View>
        <View style={styles.button}>
          <AddWatchListButton/>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    marginTop: 15,
    position: "relative",
    width: "100%",
    height: 450,
    padding:15,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer:{
    flexDirection:"row",
    position: 'absolute',
    padding: 5,
    bottom:0
  },
  button:{
    flex:1,
    margin:5
  }
});

export default Banner;
