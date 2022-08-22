import React, { useEffect } from 'react';
import './index.css';
import Header from '../Component/Header';



const Theme = () => {

    // 渲染
    const background_liner = 'linear-gradient(180deg, rgba(22, 22, 22, 0) 30.58%, rgba(22, 22, 22, 0.98) 100%), url(';
    const TMDB_img_url = "https://image.tmdb.org/t/p/original//";
    const themeImg = ["/3WjbxaqYB4vAbdUfdr5vbglD2JZ.jpg", "/cSqUkhWH5seTIwtqUUAEBFjiLyh.jpg", "/xh4SKML3kQPnJfEcgML2pFpalQe.jpg", "/qtWjZgCmslPwjP4DFUcLBUj13GV.jpg", "/yY76zq9XSuJ4nWyPDuwkdV7Wt0c.jpg","/hqyjzDRCs1N5gEsh2gklzPdsEFD.jpg","/mMtUybQ6hL24FXo0F3Z4j2KG7kZ.jpg", "/48RFr2WhpVgLSQGS3ugaXlX2Ykx.jpg","/kSaZZO9LIHNhpGvHmmbI6D6RZw5.jpg"]
    const themeTitle = ["浪漫愛情", "熱門韓劇", "喜劇之王", "驚悚恐怖", "燒腦懸疑", "動作冒險", "動漫動畫", "殭屍、病毒", "其他"]
    let themeArray = '';
    let showTheme = () => {
        let themeBody = document.querySelector('.themeBody');
        for ( let i = 0; i < 9; i++){
            if (i == 8) {
                themeArray += `
                <li id="` + themeTitle[i] + `" class='theme-card mb-100' style="background-image: ` + background_liner + TMDB_img_url + themeImg[i] +`);">
                    <h5>` + themeTitle[i] +`</h5>
                </li>
                `
            }
            else {
                themeArray += `
                <li id="` + themeTitle[i] + `" class='theme-card' style="background-image: ` + background_liner + TMDB_img_url + themeImg[i] +`);">
                    <h5>` + themeTitle[i] +`</h5>
                </li>
                `
            }
        }
        themeBody.innerHTML = themeArray;
        for (let i = 0; i < themeImg.length; i++) {
            document.querySelectorAll('.theme-card')[i].addEventListener('click', themeChose);
        }
    }

    // 選擇主題 + 取得主題影集
    let themeTag = "";
    const ApiKey = "b1d762f529f273ebf5a8b40f118aa75b";
    let themeChose = async (event) => {
        
        themeTag = event.target.id;
        let themeMovieUrl = '';
        let themeTvUrl = '';

        if (themeTag == '浪漫愛情'){
            themeMovieUrl = "https://api.themoviedb.org/3/discover/movie?api_key=" + ApiKey + "&language=zh-TW&include_adult=false&sort_by=popularity.desc&primary_release_year=2022&vote_average.gte=5&with_genres=10749";
        }
        else if (themeTag == "熱門韓劇"){
            themeTvUrl = "https://api.themoviedb.org/3/discover/tv?api_key=" + ApiKey + "&language=zh-TW&include_adult=false&sort_by=popularity.desc&vote_average.gte=0&with_genres=18&with_original_language=ko";
        }
        else if (themeTag == "喜劇之王"){
            themeMovieUrl = "https://api.themoviedb.org/3/discover/movie?api_key=" + ApiKey + "&language=zh-TW&include_adult=false&sort_by=popularity.desc&vote_average.gte=5&with_genres=35";
        }
        else if (themeTag == "驚悚恐怖"){
            themeMovieUrl = "https://api.themoviedb.org/3/discover/movie?api_key=" + ApiKey + "&language=zh-TW&include_adult=false&sort_by=popularity.desc&vote_average.gte=5&with_genres=27";
        }
        else if (themeTag == "燒腦懸疑"){
            themeMovieUrl = "https://api.themoviedb.org/3/discover/movie?api_key=" + ApiKey + "&language=zh-TW&include_adult=false&sort_by=popularity.desc&vote_average.gte=5&with_genres=9648";
        }
        else if (themeTag == "動作冒險"){
            themeMovieUrl = "https://api.themoviedb.org/3/discover/movie?api_key=" + ApiKey + "&language=zh-TW&include_adult=false&sort_by=popularity.desc&vote_average.gte=5&with_genres=28";
        }
        else if (themeTag == "動漫動畫"){
            themeTvUrl = "https://api.themoviedb.org/3/discover/tv?api_key=" + ApiKey + "&language=zh-TW&include_adult=false&sort_by=popularity.desc&vote_average.gte=5&with_genres=16&with_original_language=ja";
        }
        else if (themeTag == "殭屍、病毒"){
            themeMovieUrl = "https://api.themoviedb.org/3/discover/movie?api_key=" + ApiKey + "&language=zh-TW&include_adult=false&sort_by=popularity.desc&vote_average.gte=5&with_genres=27&with_keywords=殭屍";
        }

        let themeContent;
        let themeStr = "";
        let themeList = [];
        let isMovie = true;

        if (!themeMovieUrl && !themeTvUrl){
            alert("敬請期待");
        }
        else {
            document.querySelector('.themeBody').classList.add('d-n');
            document.querySelector('.themeList').classList.remove('d-n')
            if (themeMovieUrl) {
                let themeData = await fetch(themeMovieUrl);
                themeContent = await themeData.json();
            }
            else if (themeTvUrl) {
                let themeData = await fetch(themeTvUrl);
                themeContent = await themeData.json();
                isMovie = false;
            }
            let total_result = themeContent.total_results;
            if (total_result >= 20) {
                total_result = 20;
            }
            // console.log(themeContent)
            if (isMovie){
                for (let i = 0; i < total_result; i++) {
                    let id = themeContent.results[i].id;
                    let title = themeContent.results[i].title;
                    let backdrop = themeContent.results[i].poster_path;
                    let vote = themeContent.results[i].vote_average;
    
                    themeList.push({
                        id: id,
                        title: title,
                        vote: vote,
                        backdrop: backdrop
                    })
                }
            }
            else {
                for (let i = 0; i < total_result; i++) {
                    let id = themeContent.results[i].id;
                    let title = themeContent.results[i].name;
                    let backdrop = themeContent.results[i].poster_path;
                    let vote = themeContent.results[i].vote_average;
    
                    themeList.push({
                        id: id,
                        title: title,
                        vote: vote,
                        backdrop: backdrop
                    })
                }
            }

            // 更新到畫面上
            for (let i = 0; i < total_result; i++){
                themeStr += `
                <li>
                    <a class='allMovie-info' id="` + themeList[i].id + "&" + themeList[i].title + `" href='#'>
                    <div class='movie-img' style="background-image: ` + background_liner + TMDB_img_url + themeList[i].backdrop +`);"><p class='movie-rate'>` + (themeList[i].vote).toFixed(1) + `</p></div>
                    <h5 class='movie-title'>` + themeList[i].title + `</h5>
                    </a>
                </li>
                `;
            }
            document.querySelector('.all-theme-list').innerHTML = themeStr;
            document.querySelector('.theme-tag').innerHTML = themeTag;
            for (let i = 0; i < total_result; i++){
                document.querySelectorAll('.allMovie-info')[i].addEventListener('click', moreInfo);
            }
            // 更新標題
            
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

    // 返回功能
    let backToTheme = () => {
        document.querySelector('.themeBody').classList.remove("d-n");
        document.querySelector('.themeList').classList.add('d-n');
    }
    
    
    useEffect(()=>{
        showTheme();
        // alert("主題館尚未開放，敬請期待");
    },[])


    return (
        <React.Fragment>
            <Header />
            <ul className='themeBody'>
                {/* <li className='theme-card'><h5>浪漫愛情</h5></li>
                <li className='theme-card'><h5>熱門韓劇</h5></li>
                <li className='theme-card'><h5>喜劇之王</h5></li>
                <li className='theme-card'><h5>驚悚恐怖</h5></li>
                <li className='theme-card'><h5>燒腦懸疑</h5></li>
                <li className='theme-card'><h5>動作冒險</h5></li>
                <li className='theme-card'><h5>動漫動畫</h5></li>
                <li className='theme-card'><h5>殭屍、病毒</h5></li>
                <li className='theme-card'><h5>其他</h5></li> */}
            </ul>
            <div className='themeList d-n'>
                <h3 className='theme-tag'>標題</h3>
                <ul className='all-theme-list'>
                    {/* <li>
                        <a href='#3'>
                            <div className='movie-img'><p className='movie-rate'>8.3</p></div>
                            <h5 className='movie-title'>冰原歷險記:巴克大冒險哈哈哈哈</h5>
                        </a>
                    </li> */}
                </ul>
                <button onClick={backToTheme} className='backtheme'>返回</button>
            </div>
        </React.Fragment>
    );
}


export default Theme;