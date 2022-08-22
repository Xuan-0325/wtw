import './index.css';
// import { searchData } from '../Component/Header';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';


const Search = ({ searchData }) => {
    

    // const getSearch = useContext(searchData);

    let choseType = () => {
        alert("功能尚未開放");
    }
    // console.log(searchData)
    
    // 搜尋結果資料
    const ApiKey = "b1d762f529f273ebf5a8b40f118aa75b";
    const background_liner = 'linear-gradient(180deg, rgba(22, 22, 22, 0) 30.58%, rgba(22, 22, 22, 0.98) 100%), url(';
    const TMDB_img_url = "https://image.tmdb.org/t/p/original//";
    let showSearch = async () => {
        if (searchData){
            let searchMovieUrl = "https://api.themoviedb.org/3/search/movie?api_key=" + ApiKey + "&query=" + searchData + "&language=zh-TW&include_adult=false&page=1";
            let searchTvUrl = "https://api.themoviedb.org/3/search/tv?api_key=" + ApiKey + "&query=" + searchData + "&language=zh-TW&include_adult=false&page=1";
            let getSearchMovieContent = await fetch(searchMovieUrl);
            let searchMovieContent = await getSearchMovieContent.json();
            let searchMovieTotal = searchMovieContent.total_results;
            let searchList = [];
            if (searchMovieTotal > 0){
                if (searchMovieTotal >= 20){
                    for (let i = 0; i < 20; i++) {
                        let id = searchMovieContent.results[i].id;
                        let title = searchMovieContent.results[i].title;
                        let backdrop = searchMovieContent.results[i].poster_path;
                        let vote = searchMovieContent.results[i].vote_average;
                        searchList.push({
                            id: id,
                            title: title,
                            backdrop: backdrop,
                            vote: vote
                        })
                    }
                }else {
                    for (let i = 0; i < searchMovieTotal; i++) {
                        let id = searchMovieContent.results[i].id;
                        let title = searchMovieContent.results[i].title;
                        let backdrop = searchMovieContent.results[i].poster_path;
                        let vote = searchMovieContent.results[i].vote_average;
                        searchList.push({
                            id: id,
                            title: title,
                            backdrop: backdrop,
                            vote: vote
                        })
                    }
                }
            }
            
            let getSearchTvContent = await fetch(searchTvUrl);
            let searchTvContent = await getSearchTvContent.json();
            let searchTvTotal = searchTvContent.total_results;
            if (searchTvTotal > 0){
                if (searchTvTotal >= 20) {
                    for (let i = 0; i < 20; i++){
                        let id = searchTvContent.results[i].id;
                        let title = searchTvContent.results[i].name;
                        let backdrop = searchTvContent.results[i].poster_path;
                        let vote = searchTvContent.results[i].vote_average;
                        searchList.push({
                            id: id,
                            title: title,
                            backdrop: backdrop,
                            vote: vote
                        })
                    }
                }
                else {
                    for (let i = 0; i < searchTvTotal; i++){
                        let id = searchTvContent.results[i].id;
                        let title = searchTvContent.results[i].name;
                        let backdrop = searchTvContent.results[i].poster_path;
                        let vote = searchTvContent.results[i].vote_average;
                        searchList.push({
                            id: id,
                            title: title,
                            backdrop: backdrop,
                            vote: vote
                        })
                    }
                }
            }
            // document.querySelector('.searchPage').click();
            let searchArray = "";
            for (let i = 0; i < searchList.length; i++){
                searchArray += `
                <li>
                    <a class='search-info' id="` + searchList[i].id + "&" + searchList[i].title + `" href='#'>
                    <div class='movie-img' style="background-image: ` + background_liner + TMDB_img_url + searchList[i].backdrop +`);"><p class='movie-rate'>` + (searchList[i].vote).toFixed(1) + `</p></div>
                    <h5 class='movie-title'>` + searchList[i].title + `</h5>
                    </a>
                </li>
                `;
            }
            let all_search_list = document.querySelector('.search-list');
            all_search_list.innerHTML = searchArray;
            for (let i = 0; i < searchList.length; i++){
                document.querySelectorAll('.search-info')[i].addEventListener('click', moreInfo);
            }
            if (searchList.length == 0){
                document.querySelector(".error-search").classList.remove('d-n')
            }
            else{
                document.querySelector('.error-search').classList.add('d-n')
            }
        }
        // 第一次進來用session的方式
        else{
            let searchMovieUrl = "https://api.themoviedb.org/3/search/movie?api_key=" + ApiKey + "&query=" + sessionStorage.getItem('search') + "&language=zh-TW&include_adult=false&page=1";
            let searchTvUrl = "https://api.themoviedb.org/3/search/tv?api_key=" + ApiKey + "&query=" + sessionStorage.getItem('search') + "&language=zh-TW&include_adult=false&page=1";
            let getSearchMovieContent = await fetch(searchMovieUrl);
            let searchMovieContent = await getSearchMovieContent.json();
            let searchMovieTotal = searchMovieContent.total_results;
            let searchList = [];
            if (searchMovieTotal > 0){
                if (searchMovieTotal >= 20){
                    for (let i = 0; i < 20; i++) {
                        let id = searchMovieContent.results[i].id;
                        let title = searchMovieContent.results[i].title;
                        let backdrop = searchMovieContent.results[i].poster_path;
                        let vote = searchMovieContent.results[i].vote_average;
                        searchList.push({
                            id: id,
                            title: title,
                            backdrop: backdrop,
                            vote: vote
                        })
                    }
                }else {
                    for (let i = 0; i < searchMovieTotal; i++) {
                        let id = searchMovieContent.results[i].id;
                        let title = searchMovieContent.results[i].title;
                        let backdrop = searchMovieContent.results[i].poster_path;
                        let vote = searchMovieContent.results[i].vote_average;
                        searchList.push({
                            id: id,
                            title: title,
                            backdrop: backdrop,
                            vote: vote
                        })
                    }
                }
            }
            
            let getSearchTvContent = await fetch(searchTvUrl);
            let searchTvContent = await getSearchTvContent.json();
            let searchTvTotal = searchTvContent.total_results;
            if (searchTvTotal > 0){
                if (searchTvTotal >= 20) {
                    for (let i = 0; i < 20; i++){
                        let id = searchTvContent.results[i].id;
                        let title = searchTvContent.results[i].name;
                        let backdrop = searchTvContent.results[i].poster_path;
                        let vote = searchTvContent.results[i].vote_average;
                        searchList.push({
                            id: id,
                            title: title,
                            backdrop: backdrop,
                            vote: vote
                        })
                    }
                }
                else {
                    for (let i = 0; i < searchTvTotal; i++){
                        let id = searchTvContent.results[i].id;
                        let title = searchTvContent.results[i].name;
                        let backdrop = searchTvContent.results[i].poster_path;
                        let vote = searchTvContent.results[i].vote_average;
                        searchList.push({
                            id: id,
                            title: title,
                            backdrop: backdrop,
                            vote: vote
                        })
                    }
                }
            }
            // document.querySelector('.searchPage').click();
            let searchArray = "";
            for (let i = 0; i < searchList.length; i++){
                searchArray += `
                <li>
                    <a class='search-info' id="` + searchList[i].id + "&" + searchList[i].title + `" href='#'>
                    <div class='movie-img' style="background-image: ` + background_liner + TMDB_img_url + searchList[i].backdrop +`);"><p class='movie-rate'>` + (searchList[i].vote).toFixed(1) + `</p></div>
                    <h5 class='movie-title'>` + searchList[i].title + `</h5>
                    </a>
                </li>
                `;
            }
            let all_search_list = document.querySelector('.search-list');
            all_search_list.innerHTML = searchArray;
            for (let i = 0; i < searchList.length; i++){
                document.querySelectorAll('.search-info')[i].addEventListener('click', moreInfo);
            }
            if (searchList.length == 0){
                document.querySelector(".error-search").classList.remove('d-n')
            }
            else{
                document.querySelector('.error-search').classList.add('d-n')
            }
        }
    }

    // 點集後顯示更多資訊
    let moreInfo = (event) => {
        event.preventDefault();
        let targetClass = event.target.parentNode.id;
        if (event.target.className == "movie-rate"){
            targetClass = event.target.parentNode.parentNode.id;
        }
        sessionStorage.setItem("detailID", targetClass);
        document.querySelector('.detailPage').click();
        // console.log(targetClass);
    }

    useEffect(()=> {
        showSearch()
    }, [searchData])

    return (
        <div>
            <ul className='search-type'>
                <li><button onClick={choseType} className='search-title'>片名</button></li>
                <li><button onClick={choseType} className="search-actor">演員</button></li>
            </ul>
            <ul className='search-list'>
                {/* <li>
                    <a href='#3'>
                        <div className='movie-img'><p className='movie-rate'>8.3</p></div>
                        <h5 className='movie-title'>冰原歷險記:巴克大冒險哈哈哈哈</h5>
                    </a>
                </li> */}
            </ul>
            <p className='error-search d-n'>找不到符合的結果。</p>
        </div>
    );
}


export default Search;