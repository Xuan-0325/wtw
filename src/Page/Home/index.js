import './index.css';
import Header from '../Component/Header';
import React, { useEffect } from 'react';
import HotMovie from '../Component/HotMovie';
import HotKoreaDrama from '../Component/HotKoreaDrama';
import HotLocalDrama from '../Component/HotLocalDrama';
import HotUsDrama from '../Component/HotUsDrama';
import HotAnime from '../Component/HotAnime';
import { useState } from 'react';


const Home = () => {
    const ApiKey = "b1d762f529f273ebf5a8b40f118aa75b";

    // var slideShowFunc
    let Hot_slideshow = [];
    let getSlideShowData = async () => {
        let moviePopularUrl = "https://api.themoviedb.org/3/movie/popular?api_key=" + ApiKey + "&language=zh-TW&page=1";
        let tvPopularUrl = "https://api.themoviedb.org/3/discover/tv?api_key=" + ApiKey + "&language=zh-TW&page=1&sort_by=popularity.desc&vote_average.gte=8";
        const resMovie = await fetch(moviePopularUrl);
        const popularMovie = await resMovie.json();
    
        const resTv = await fetch(tvPopularUrl);
        const popularTv = await resTv.json();
        
        // 蒐集熱門電影
        for (let i = 0; i < 5; i++){
            let title = popularMovie.results[i].title;
            let vote = popularMovie.results[i].vote_average;
            let description = popularMovie.results[i].overview;
            let backdrop = popularMovie.results[i].backdrop_path;
            let poster = popularMovie.results[i].poster_path;
            let id = popularMovie.results[i].id;
            Hot_slideshow.push({
                title: title,
                vote: vote,
                description: description,
                backdrop: backdrop,
                poster: poster,
                id: id
            }) 
        }
        // 蒐集熱門戲劇
        for (let i = 0; i < 5; i++){
            let title = popularTv.results[i].name;
            let vote = popularTv.results[i].vote_average;
            let description = popularTv.results[i].overview;
            let backdrop = popularTv.results[i].backdrop_path;
            let poster = popularTv.results[i].poster_path;
            let id = popularTv.results[i].id;
            Hot_slideshow.push({
                title: title,
                vote: vote,
                description: description,
                backdrop: backdrop,
                poster: poster,
                id: id
            }) 
        }

        
        let vote = document.querySelector('.Hot-rate');
        let title = document.querySelector('.Hot-title');
        let description = document.querySelector('.Hot-description');
        let backdrop = document.querySelector('.Hot-slideshow');
        const background_liner = "linear-gradient(360deg, #1B1E25 0%, rgba(27, 30, 37, 0) 29.22%), radial-gradient(72.5% 427.7% at 96.33% 50%, rgba(27, 30, 37, 0) 39.58%, rgba(27, 30, 37, 0.93) 94.79%), url(";
        const TMDB_img_url = "https://image.tmdb.org/t/p/original//";
        vote.innerHTML = (Hot_slideshow[0].vote).toFixed(1);
        title.innerHTML = Hot_slideshow[0].title;
        description.innerHTML = Hot_slideshow[0].description;
        backdrop.style.backgroundImage = background_liner + TMDB_img_url + Hot_slideshow[0].backdrop ;
        for (let i = 0; i < localStorage.length; i++){
            if (localStorage.getItem(Hot_slideshow[i].title)){
                document.querySelector('.Hot-add').innerHTML = "移出片單";
                document.querySelector('.Hot-add').classList.remove('add-style');
                document.querySelector('.Hot-add').classList.add('remove-style');
            }
            else if (localStorage.getItem(Hot_slideshow[i].title == null)){
                document.querySelector('.Hot-add').innerHTML = "加入片單";
                document.querySelector('.Hot-add').classList.add('add-style');
                document.querySelector('.Hot-add').classList.remove('remove-style');
            }
            // console.log(localStorage.getItem(Hot_slideshow[i].title))
        }
        


        // 輪播圖
        // let SlideShowsSatus = 1;
        // let SlideShowsBtnSatus = 1
        
        
        // slideShowFunc = setInterval(() => {
            
        //     let vote = document.querySelector('.Hot-rate');
        //     let title = document.querySelector('.Hot-title');
        //     let description = document.querySelector('.Hot-description');
        //     let backdrop = document.querySelector('.Hot-slideshow');
        //     const background_liner = "linear-gradient(360deg, #1B1E25 0%, rgba(27, 30, 37, 0) 29.22%), radial-gradient(72.5% 427.7% at 96.33% 50%, rgba(27, 30, 37, 0) 39.58%, rgba(27, 30, 37, 0.93) 94.79%), url(";
        //     const TMDB_img_url = "https://image.tmdb.org/t/p/original//";
        
        //     vote.innerHTML = (Hot_slideshow[SlideShowsSatus].vote).toFixed(1);
        //     title.innerHTML = Hot_slideshow[SlideShowsSatus].title;
        //     description.innerHTML = Hot_slideshow[SlideShowsSatus].description;
        //     backdrop.style.backgroundImage = background_liner + TMDB_img_url + Hot_slideshow[SlideShowsSatus].backdrop ;
        //     if (SlideShowsSatus == 9){
        //         SlideShowsSatus = 0;
        //     }
        //     else{
        //         SlideShowsSatus++;
        //     }
        
        //     // 輪播圖進度條
            
        //     let SlideShowsSatus_actbtn = (SlideShowsBtnSatus).toString();
        //     let SlideShowBtn_act = document.getElementById(SlideShowsSatus_actbtn);
        //     if (SlideShowsBtnSatus == 0){
        //         let SlideShowBtn_notact = document.getElementById('9');
        //         SlideShowBtn_act.className = "Hot-slideshow-btn-active";
        //         SlideShowBtn_notact.className = "Hot-slideshow-btn-notactive";
        //     }
        //     else{
        //         let SlideShowsSatus_notactbtn = (SlideShowsBtnSatus - 1).toString()
        //         let SlideShowBtn_notact = document.getElementById(SlideShowsSatus_notactbtn);
        //         SlideShowBtn_act.className = "Hot-slideshow-btn-active";
        //         SlideShowBtn_notact.className = "Hot-slideshow-btn-notactive";
        //     }
        //     if (SlideShowsBtnSatus == 9){
        //         SlideShowsBtnSatus = 0;
        //     }
        //     else {
        //         SlideShowsBtnSatus++;
        //     }
            
        // }, 10000);
        // if (slideShowFunc) {
        //     clearInterval(slideShowFunc);
        // }
    }
    

        // 輪播圖
        let SlideShowsSatus = 1;
        let SlideShowsBtnSatus = 1;
        let slideShowRunTime = 0;
        let slideShowFunc
        
        let slideShow = () => {
            slideShowFunc = setInterval(() => {
                let vote = document.querySelector('.Hot-rate');
                let title = document.querySelector('.Hot-title');
                let description = document.querySelector('.Hot-description');
                let backdrop = document.querySelector('.Hot-slideshow');
                const background_liner = "linear-gradient(360deg, #1B1E25 0%, rgba(27, 30, 37, 0) 29.22%), radial-gradient(72.5% 427.7% at 96.33% 50%, rgba(27, 30, 37, 0) 39.58%, rgba(27, 30, 37, 0.93) 94.79%), url(";
                const TMDB_img_url = "https://image.tmdb.org/t/p/original//";
            
                vote.innerHTML = (Hot_slideshow[SlideShowsSatus].vote).toFixed(1);
                title.innerHTML = Hot_slideshow[SlideShowsSatus].title;
                description.innerHTML = Hot_slideshow[SlideShowsSatus].description;
                backdrop.style.backgroundImage = background_liner + TMDB_img_url + Hot_slideshow[SlideShowsSatus].backdrop ;
                if (SlideShowsSatus == 9){
                    SlideShowsSatus = 0;
                }
                else{
                    SlideShowsSatus++;
                }
            
                // 輪播圖進度條
                
                let SlideShowsSatus_actbtn = (SlideShowsBtnSatus).toString();
                let SlideShowBtn_act = document.getElementById(SlideShowsSatus_actbtn);
                if (SlideShowsBtnSatus == 0){
                    let SlideShowBtn_notact = document.getElementById('9');
                    SlideShowBtn_act.className = "Hot-slideshow-btn-active";
                    SlideShowBtn_notact.className = "Hot-slideshow-btn-notactive";
                }
                else{
                    let SlideShowsSatus_notactbtn = (SlideShowsBtnSatus - 1).toString()
                    let SlideShowBtn_notact = document.getElementById(SlideShowsSatus_notactbtn);
                    SlideShowBtn_act.className = "Hot-slideshow-btn-active";
                    SlideShowBtn_notact.className = "Hot-slideshow-btn-notactive";
                }
                if (SlideShowsBtnSatus == 9){
                    SlideShowsBtnSatus = 0;
                }
                else {
                    SlideShowsBtnSatus++;
                }
                // 新增移除按鈕更新
                for (let i = 0; i < localStorage.length; i++){
                    if (SlideShowsSatus == 0) {
                        if (localStorage.getItem(Hot_slideshow[9].title)){
                            document.querySelector('.Hot-add').innerHTML = "移出片單";
                        }
                        else {
                            document.querySelector('.Hot-add').innerHTML = "加入片單";
                        }
                    }
                    else{
                        if (localStorage.getItem(Hot_slideshow[SlideShowsSatus-1].title)){
                            document.querySelector('.Hot-add').innerHTML = "移出片單";
                            document.querySelector('.Hot-add').classList.remove('add-style');
                            document.querySelector('.Hot-add').classList.add('remove-style');
                        }
                        else {
                            document.querySelector('.Hot-add').innerHTML = "加入片單";
                            document.querySelector('.Hot-add').classList.add('add-style');
                            document.querySelector('.Hot-add').classList.remove('remove-style');
                        }
                    }
                }
            }, 10000);
        }

    // 新增至我的片單
    let addMyFilm = () => {
        if (document.querySelector('.Hot-add').innerHTML == "加入片單"){
            for (let i = 0; i < Hot_slideshow.length; i++){
                if (document.querySelector('.Hot-title').innerHTML == Hot_slideshow[i].title){
                    localStorage.setItem(Hot_slideshow[i].title, Hot_slideshow[i].title + "&" + Hot_slideshow[i].vote + "&" + Hot_slideshow[i].poster + "&" + Hot_slideshow[i].id)
                    alert("已將 "+Hot_slideshow[i].title+" 加入到我的片單")
                }
            }
            document.querySelector('.Hot-add').innerHTML = "移出片單";
            document.querySelector('.Hot-add').classList.remove('add-style');
            document.querySelector('.Hot-add').classList.add('remove-style');
        }
        else if (document.querySelector('.Hot-add').innerHTML == "移出片單"){
            for (let i = 0; i < Hot_slideshow.length; i++){
                if (document.querySelector('.Hot-title').innerHTML == Hot_slideshow[i].title){
                    localStorage.removeItem(Hot_slideshow[i].title)
                    alert("已將 "+Hot_slideshow[i].title+" 從我的片單移出")
                }
            }
            document.querySelector('.Hot-add').innerHTML = "加入片單";
            document.querySelector('.Hot-add').classList.add('add-style');
            document.querySelector('.Hot-add').classList.remove('remove-style');
        }
    }

    // 更多資訊
    let Hot_moreInfo = (event) => {
        event.preventDefault();
        sessionStorage.clear();
        for (let i = 0; i < Hot_slideshow.length; i++){
            if (document.querySelector('.Hot-title').innerHTML == Hot_slideshow[i].title){
                sessionStorage.setItem("detailID", Hot_slideshow[i].id + "&" + Hot_slideshow[i].title)
            }
        }
        document.querySelector('.detailPage').click();
        console.log(sessionStorage.getItem("detailID"))
    }
    
    
    useEffect(()=>{
        slideShow();
        for (let i = 1; i < slideShowFunc; i++){
            clearInterval(i)
        }
        getSlideShowData();
    }, [])

    return (
        <React.Fragment>
            <Header />
            <div className='Hot-slideshow notSearch'>
                <ul className='Hot-info'>
                    <li className='Hot-rate'>0.0</li>
                    <li className='Hot-title'></li>
                    <li className='Hot-description'></li>
                    <li className='Hot-more'><a href='#' onClick={Hot_moreInfo}>更多資訊</a><button className='Hot-add add-style' onClick={addMyFilm}>加入片單</button></li>
                </ul>
                <div className='Hot-slideshow-btn'>
                    <button className='Hot-slideshow-btn-tag Hot-slideshow-btn-active' id='0'></button>
                    <button className='Hot-slideshow-btn-tag Hot-slideshow-btn-notactive' id='1'></button>
                    <button className='Hot-slideshow-btn-tag Hot-slideshow-btn-notactive' id='2'></button>
                    <button className='Hot-slideshow-btn-tag Hot-slideshow-btn-notactive' id='3'></button>
                    <button className='Hot-slideshow-btn-tag Hot-slideshow-btn-notactive' id='4'></button>
                    <button className='Hot-slideshow-btn-tag Hot-slideshow-btn-notactive' id='5'></button>
                    <button className='Hot-slideshow-btn-tag Hot-slideshow-btn-notactive' id='6'></button>
                    <button className='Hot-slideshow-btn-tag Hot-slideshow-btn-notactive' id='7'></button>
                    <button className='Hot-slideshow-btn-tag Hot-slideshow-btn-notactive' id='8'></button>
                    <button className='Hot-slideshow-btn-tag Hot-slideshow-btn-notactive' id='9'></button>
                </div>
            </div>
            <HotMovie />
            <HotKoreaDrama />
            <HotLocalDrama />
            <HotUsDrama />
            <HotAnime />
            <p className='copyright'>挖影 © Code: Frank X.P  /  Design: K.T</p>
        </React.Fragment>
    );
}

export default Home;