import React, { useEffect } from 'react';
import './index.css';
import Header from '../Component/Header';
import Type_Filter from './components/filter_off.png';



const Drama = () => {

    // API KEY
    const ApiKey = "b1d762f529f273ebf5a8b40f118aa75b";

    // API圖片
    const background_liner = 'linear-gradient(180deg, rgba(22, 22, 22, 0) 30.58%, rgba(22, 22, 22, 0.98) 100%), url(';
    const TMDB_img_url = "https://image.tmdb.org/t/p/original//";

    // 篩選按鈕
    let choseType = (event) => {
        let notChose_btn = document.querySelector('.chose-status');
        notChose_btn.classList.remove("chose-status");
        event.target.className = "chose-status";
    }
    let choseYear = (event) => {
        let notChose_btn = document.querySelector('.chose-status-year');
        notChose_btn.classList.remove("chose-status-year");
        event.target.className = "chose-status-year";
    }
    

    // 搜尋功能
    let All_movie = [];
    let AllMovieUrl_page1;
    let all_movie_list_array
    let loadPage;
    let total_page;
    let total_result;
    let get_AllMovieData = async () => {
        let all_movie_list = document.querySelector('.all-movie-list');
        all_movie_list_array = '';
        All_movie = [];
        loadPage = 1

        // 取得目前按鈕
        let Type = document.querySelector('.chose-status').innerHTML;
        let Year = document.querySelector('.chose-status-year').innerHTML;
        let Vote = document.querySelector('.type-vote').value;
        if (Vote >= 9){
            alert("評分是以平均值做篩選，投票人數少將會大幅影響評分，因此評分過高將有可能出現人氣度極低的影集")
        }

        // let AllMovieUrl_page1 = "https://api.themoviedb.org/3/movie/popular?api_key=" + ApiKey + "&language=zh-TW&page=1";
        
        // let AllMovieUrl_page2 = "https://api.themoviedb.org/3/movie/popular?api_key=" + ApiKey + "&language=zh-TW&page=2";

        // 類型篩選
        if (Type == "全部"){
            if (Year == "全部"){
                AllMovieUrl_page1 = "https://api.themoviedb.org/3/discover/tv?api_key=" + ApiKey + "&language=zh-TW&include_adult=false&sort_by=popularity.desc&vote_average.gte="+ Vote;
            }
            else{
                AllMovieUrl_page1 = "https://api.themoviedb.org/3/discover/tv?api_key=" + ApiKey + "&language=zh-TW&include_adult=false&sort_by=popularity.desc&first_air_date_year="+ Year +"&vote_average.gte="+ Vote;
            }
        }
        else if (Type == "科幻奇幻"){
            if (Year == "全部"){
                AllMovieUrl_page1 = "https://api.themoviedb.org/3/discover/tv?api_key=" + ApiKey + "&language=zh-TW&include_adult=false&sort_by=popularity.desc&vote_average.gte="+ Vote +"&with_genres=10765";
            }
            else{
                AllMovieUrl_page1 = "https://api.themoviedb.org/3/discover/tv?api_key=" + ApiKey + "&language=zh-TW&include_adult=false&sort_by=popularity.desc&first_air_date_year="+ Year +"&vote_average.gte="+ Vote +"&with_genres=10765";
            }
        }
        else if (Type == "戰爭"){
            if (Year == "全部"){
                AllMovieUrl_page1 = "https://api.themoviedb.org/3/discover/tv?api_key=" + ApiKey + "&language=zh-TW&include_adult=false&sort_by=popularity.desc&vote_average.gte="+ Vote +"&with_genres=10768";
            }
            else{
                AllMovieUrl_page1 = "https://api.themoviedb.org/3/discover/tv?api_key=" + ApiKey + "&language=zh-TW&include_adult=false&sort_by=popularity.desc&first_air_date_year="+ Year +"&vote_average.gte="+ Vote +"&with_genres=10768";
            }
        }
        else if (Type == "兒童"){
            if (Year == "全部"){
                AllMovieUrl_page1 = "https://api.themoviedb.org/3/discover/tv?api_key=" + ApiKey + "&language=zh-TW&include_adult=false&sort_by=popularity.desc&vote_average.gte="+ Vote +"&with_genres=10762";
            }
            else{
                AllMovieUrl_page1 = "https://api.themoviedb.org/3/discover/tv?api_key=" + ApiKey + "&language=zh-TW&include_adult=false&sort_by=popularity.desc&first_air_date_year="+ Year +"&vote_average.gte="+ Vote +"&with_genres=10762";
            }
        }
        else if (Type == "劇情"){
            if (Year == "全部"){
                AllMovieUrl_page1 = "https://api.themoviedb.org/3/discover/tv?api_key=" + ApiKey + "&language=zh-TW&include_adult=false&sort_by=popularity.desc&vote_average.gte="+ Vote +"&with_genres=18";
            }
            else{
                AllMovieUrl_page1 = "https://api.themoviedb.org/3/discover/tv?api_key=" + ApiKey + "&language=zh-TW&include_adult=false&sort_by=popularity.desc&first_air_date_year="+ Year +"&vote_average.gte="+ Vote +"&with_genres=18";
            }
        }
        else if (Type == "動作"){
            if (Year == "全部"){
                AllMovieUrl_page1 = "https://api.themoviedb.org/3/discover/tv?api_key=" + ApiKey + "&language=zh-TW&include_adult=false&sort_by=popularity.desc&vote_average.gte="+ Vote +"&with_genres=10759";
            }
            else{
                AllMovieUrl_page1 = "https://api.themoviedb.org/3/discover/tv?api_key=" + ApiKey + "&language=zh-TW&include_adult=false&sort_by=popularity.desc&first_air_date_year="+ Year +"&vote_average.gte="+ Vote +"&with_genres=10759";
            }
        }
        else if (Type == "動畫"){
            if (Year == "全部"){
                AllMovieUrl_page1 = "https://api.themoviedb.org/3/discover/tv?api_key=" + ApiKey + "&language=zh-TW&include_adult=false&sort_by=popularity.desc&vote_average.gte="+ Vote +"&with_genres=16";
            }
            else{
                AllMovieUrl_page1 = "https://api.themoviedb.org/3/discover/tv?api_key=" + ApiKey + "&language=zh-TW&include_adult=false&sort_by=popularity.desc&first_air_date_year="+ Year +"&vote_average.gte="+ Vote +"&with_genres=16";
            }
        }
        else if (Type == "喜劇"){
            if (Year == "全部"){
                AllMovieUrl_page1 = "https://api.themoviedb.org/3/discover/tv?api_key=" + ApiKey + "&language=zh-TW&include_adult=false&sort_by=popularity.desc&vote_average.gte="+ Vote +"&with_genres=35";
            }
            else{
                AllMovieUrl_page1 = "https://api.themoviedb.org/3/discover/tv?api_key=" + ApiKey + "&language=zh-TW&include_adult=false&sort_by=popularity.desc&first_air_date_year="+ Year +"&vote_average.gte="+ Vote +"&with_genres=35";
            }
        }
        else if (Type == "家庭"){
            if (Year == "全部"){
                AllMovieUrl_page1 = "https://api.themoviedb.org/3/discover/tv?api_key=" + ApiKey + "&language=zh-TW&include_adult=false&sort_by=popularity.desc&vote_average.gte="+ Vote +"&with_genres=10751";
            }
            else{
                AllMovieUrl_page1 = "https://api.themoviedb.org/3/discover/tv?api_key=" + ApiKey + "&language=zh-TW&include_adult=false&sort_by=popularity.desc&first_air_date_year="+ Year +"&vote_average.gte="+ Vote +"&with_genres=10751";
            }
        }
        else if (Type == "懸疑"){
            if (Year == "全部"){
                AllMovieUrl_page1 = "https://api.themoviedb.org/3/discover/tv?api_key=" + ApiKey + "&language=zh-TW&include_adult=false&sort_by=popularity.desc&vote_average.gte="+ Vote +"&with_genres=9648";
            }
            else{
                AllMovieUrl_page1 = "https://api.themoviedb.org/3/discover/tv?api_key=" + ApiKey + "&language=zh-TW&include_adult=false&sort_by=popularity.desc&first_air_date_year="+ Year +"&vote_average.gte="+ Vote +"&with_genres=9648";
            }
        }
        else if (Type == "新聞"){
            if (Year == "全部"){
                AllMovieUrl_page1 = "https://api.themoviedb.org/3/discover/tv?api_key=" + ApiKey + "&language=zh-TW&include_adult=false&sort_by=popularity.desc&vote_average.gte="+ Vote +"&with_genres=10763";
            }
            else{
                AllMovieUrl_page1 = "https://api.themoviedb.org/3/discover/tv?api_key=" + ApiKey + "&language=zh-TW&include_adult=false&sort_by=popularity.desc&first_air_date_year="+ Year +"&vote_average.gte="+ Vote +"&with_genres=10763";
            }
        }
        else if (Type == "犯罪"){
            if (Year == "全部"){
                AllMovieUrl_page1 = "https://api.themoviedb.org/3/discover/tv?api_key=" + ApiKey + "&language=zh-TW&include_adult=false&sort_by=popularity.desc&vote_average.gte="+ Vote +"&with_genres=80";
            }
            else{
                AllMovieUrl_page1 = "https://api.themoviedb.org/3/discover/tv?api_key=" + ApiKey + "&language=zh-TW&include_adult=false&sort_by=popularity.desc&first_air_date_year="+ Year +"&vote_average.gte="+ Vote +"&with_genres=80";
            }
        }
        else if (Type == "真人秀"){
            if (Year == "全部"){
                AllMovieUrl_page1 = "https://api.themoviedb.org/3/discover/tv?api_key=" + ApiKey + "&language=zh-TW&include_adult=false&sort_by=popularity.desc&vote_average.gte="+ Vote +"&with_genres=10764";
            }
            else{
                AllMovieUrl_page1 = "https://api.themoviedb.org/3/discover/tv?api_key=" + ApiKey + "&language=zh-TW&include_adult=false&sort_by=popularity.desc&first_air_date_year="+ Year +"&vote_average.gte="+ Vote +"&with_genres=10764";
            }
        }
        else if (Type == "紀錄"){
            if (Year == "全部"){
                AllMovieUrl_page1 = "https://api.themoviedb.org/3/discover/tv?api_key=" + ApiKey + "&language=zh-TW&include_adult=false&sort_by=popularity.desc&vote_average.gte="+ Vote +"&with_genres=99";
            }
            else{
                AllMovieUrl_page1 = "https://api.themoviedb.org/3/discover/tv?api_key=" + ApiKey + "&language=zh-TW&include_adult=false&sort_by=popularity.desc&first_air_date_year="+ Year +"&vote_average.gte="+ Vote +"&with_genres=99";
            }
        }
        else if (Type == "肥皂劇"){
            if (Year == "全部"){
                AllMovieUrl_page1 = "https://api.themoviedb.org/3/discover/tv?api_key=" + ApiKey + "&language=zh-TW&include_adult=false&sort_by=popularity.desc&vote_average.gte="+ Vote +"&with_genres=10766";
            }
            else{
                AllMovieUrl_page1 = "https://api.themoviedb.org/3/discover/tv?api_key=" + ApiKey + "&language=zh-TW&include_adult=false&sort_by=popularity.desc&first_air_date_year="+ Year +"&vote_average.gte="+ Vote +"&with_genres=10766";
            }
        }
        else if (Type == "脫口秀"){
            if (Year == "全部"){
                AllMovieUrl_page1 = "https://api.themoviedb.org/3/discover/tv?api_key=" + ApiKey + "&language=zh-TW&include_adult=false&sort_by=popularity.desc&vote_average.gte="+ Vote +"&with_genres=10767";
            }
            else{
                AllMovieUrl_page1 = "https://api.themoviedb.org/3/discover/tv?api_key=" + ApiKey + "&language=zh-TW&include_adult=false&sort_by=popularity.desc&first_air_date_year="+ Year +"&vote_average.gte="+ Vote +"&with_genres=10767";
            }
        }
        else if (Type == "西部"){
            if (Year == "全部"){
                AllMovieUrl_page1 = "https://api.themoviedb.org/3/discover/tv?api_key=" + ApiKey + "&language=zh-TW&include_adult=false&sort_by=popularity.desc&vote_average.gte="+ Vote +"&with_genres=37";
            }
            else{
                AllMovieUrl_page1 = "https://api.themoviedb.org/3/discover/tv?api_key=" + ApiKey + "&language=zh-TW&include_adult=false&sort_by=popularity.desc&first_air_date_year="+ Year +"&vote_average.gte="+ Vote +"&with_genres=37";
            }
        }
        let AllMovieUrl = AllMovieUrl_page1 + "&page=1";
        let resAllMovie_page1 = await fetch(AllMovieUrl);
        let AllMovie_data_page1 = await resAllMovie_page1.json();
        total_page = AllMovie_data_page1.total_pages;
        total_result = AllMovie_data_page1.total_results;

        // 判斷是否有更多影集可以載入
        if (loadPage == total_page){
            let loadMore_btn = document.querySelector('.loadmore');
            loadMore_btn.style.display = "none";
        }
        else {
            let loadMore_btn = document.querySelector('.loadmore');
            loadMore_btn.style.display = "block";
        }
        for (let i = 0; i < AllMovie_data_page1.results.length; i++){
            let id = AllMovie_data_page1.results[i].id;
            let title = AllMovie_data_page1.results[i].name;
            let backdrop = AllMovie_data_page1.results[i].poster_path;
            let vote = AllMovie_data_page1.results[i].vote_average;
            let popularity = AllMovie_data_page1.results[i].popularity;
            let date = AllMovie_data_page1.results[i].release_date;

            All_movie.push({
                id: id,
                title: title,
                backdrop: backdrop,
                vote: vote,
                popularity: popularity,
                date: date
            })
        }
        // console.log(AllMovie_data_page1)
        
        // 將資料印在網頁上
        // linear-gradient(180deg, rgba(22, 22, 22, 0) 30.58%, rgba(22, 22, 22, 0.98) 100%), url(https://image.tmdb.org/t/p/original///wcKFYIiVDvRURrzglV9kGu7fpfY.jpg
        for (let i = 0; i < All_movie.length; i++){
            all_movie_list_array += `
            <li>
                <a class='allDrama-info' id="` + All_movie[i].id + "&" + All_movie[i].title + `" href='#'>
                <div class='movie-img' style="background-image: ` + background_liner + TMDB_img_url + All_movie[i].backdrop +`);"><p class='movie-rate'>` + (All_movie[i].vote).toFixed(1) + `</p></div>
                <h5 class='movie-title'>` + All_movie[i].title + `</h5>
                </a>
            </li>
            `;
        }
        all_movie_list.innerHTML = all_movie_list_array;
        for (let i = 0; i < All_movie.length; i++){
            document.querySelectorAll('.allDrama-info')[i].addEventListener('click', moreInfo);
        }

        // 如果是手機板將會關閉modal容器
        if (document.body.clientWidth < 768){
            document.querySelector('.movie-chose-bar').style.display = "none";
        }
    }

    // 篩選順序
    let choseOrder = async (event) => {
        let notChose_btn = document.querySelector('.chose-status-order');
        notChose_btn.classList.remove("chose-status-order");
        event.target.className = "chose-status-order";
    }

    

    // 載入更多功能
    loadPage = 1;
    let loadMore = async () => {
        let all_movie_list = document.querySelector('.all-movie-list');
        if (loadPage <= total_page){
            loadPage += 1;
        }
        if (loadPage == total_page){
            let loadMore_btn = document.querySelector('.loadmore');
            loadMore_btn.style.display = "none";
        }
        else {
            let loadMore_btn = document.querySelector('.loadmore');
            loadMore_btn.style.display = "block";
        }
        let AllMovieUrl = AllMovieUrl_page1 + "&page=" + loadPage.toString();
        let resAllMovie_page1 = await fetch(AllMovieUrl);
        let AllMovie_data_page1 = await resAllMovie_page1.json();
        console.log(AllMovie_data_page1);
        for (let i = 0; i < AllMovie_data_page1.results.length; i++){
            let id = AllMovie_data_page1.results[i].id;
            let title = AllMovie_data_page1.results[i].name;
            let backdrop = AllMovie_data_page1.results[i].poster_path;
            let vote = AllMovie_data_page1.results[i].vote_average;
            let popularity = AllMovie_data_page1.results[i].popularity;
            let date = AllMovie_data_page1.results[i].release_date;

            All_movie.push({
                id: id,
                title: title,
                backdrop: backdrop,
                vote: vote,
                popularity: popularity,
                date: date
            })
        }
        for (let i = (loadPage - 1) * 20; i < All_movie.length; i++){
            all_movie_list_array += `
            <li>
                <a class='allDrama-info' id="` + All_movie[i].id + "&" + All_movie[i].title + `" href='#'>
                <div class='movie-img' style="background-image: ` + background_liner + TMDB_img_url + All_movie[i].backdrop +`);"><p class='movie-rate'>` + (All_movie[i].vote).toFixed(1) + `</p></div>
                <h5 class='movie-title'>` + All_movie[i].title + `</h5>
                </a>
            </li>
            `;
        }
        all_movie_list.innerHTML = all_movie_list_array;
        for (let i = 0; i < All_movie.length; i++){
            document.querySelectorAll('.allDrama-info')[i].addEventListener('click', moreInfo);
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
    // 手機板電影篩選按鈕
    let filterModal = () => {
        document.querySelector('.movie-chose-bar').style.display = "block";
    }

    // 判斷解析度
    let clientWidthNow = () => {
        if (document.body.clientWidth < 768){
            document.querySelector('.movie-chose-bar').style.display = "none";
        }
        else {
            document.querySelector('.movie-chose-bar').style.display = "block";
        }
    }
    window.addEventListener('resize', clientWidthNow)


    useEffect(()=>{
        get_AllMovieData();
    }, [])


    return (
        <React.Fragment>
            <Header />
            <div className='movie-chose-bar'>
                <h5 className='movie-type-title'>類型</h5>
                <ul className='movie-type'>
                    <li><button onClick={choseType} className='chose-status'>全部</button></li>
                    <li><button onClick={choseType}>科幻奇幻</button></li>
                    <li><button onClick={choseType}>戰爭</button></li>
                    <li><button onClick={choseType}>兒童</button></li>
                    <li><button onClick={choseType}>劇情</button></li>
                    <li><button onClick={choseType}>動作</button></li>
                    <li><button onClick={choseType}>動畫</button></li>
                    <li><button onClick={choseType}>喜劇</button></li>
                    <li><button onClick={choseType}>家庭</button></li>
                    <li><button onClick={choseType}>懸疑</button></li>
                    <li><button onClick={choseType}>新聞</button></li>
                    <li><button onClick={choseType}>犯罪</button></li>
                    <li><button onClick={choseType}>真人秀</button></li>
                    <li><button onClick={choseType}>紀錄</button></li>
                    <li><button onClick={choseType}>肥皂劇</button></li>
                    <li><button onClick={choseType}>脫口秀</button></li>
                    <li><button onClick={choseType}>西部</button></li>
                </ul>
                <h5 className='movie-type-title mt-28'>年份</h5>
                <ul className='movie-type'>
                    <li><button onClick={choseYear} className='chose-status-year'>全部</button></li>
                    <li><button onClick={choseYear}>2022</button></li>
                    <li><button onClick={choseYear}>2021</button></li>
                    <li><button onClick={choseYear}>2020</button></li>
                    <li><button onClick={choseYear}>2019</button></li>
                    <li><button onClick={choseYear}>2018</button></li>
                    <li><button onClick={choseYear}>2017</button></li>
                    <li><button onClick={choseYear}>2016</button></li>
                    <li><button onClick={choseYear}>2015</button></li>
                    <li><button onClick={choseYear}>2014</button></li>
                    <li><button onClick={choseYear}>2013</button></li>
                    <li><button onClick={choseYear}>2012</button></li>
                    <li><button onClick={choseYear}>2011</button></li>
                </ul>
                <form className='mt-28'>
                    <label className='movie-type-title mt-10'>評分</label>
                    <span className='ml-28'>0</span>
                    <input className='type-vote' type='range' min='0' max='10' defaultValue='0'></input>
                    <span className=''>10</span>
                    <input onClick={get_AllMovieData} className='search-btn ' type='button' value='搜尋'></input>
                </form>
            </div>
            <ul className='movie-class-bar'>
                <li className='ml-104'><button onClick={choseOrder} className='chose-status-order'>人氣</button></li>
                <li><button onClick={choseOrder}>評分</button></li>
                <li><button onClick={choseOrder}>上映日</button></li>
                <li><button disabled="disable" onClick={choseOrder}>片名</button></li>
                <li><img onClick={filterModal} className='type-filter' src={Type_Filter}></img></li>
            </ul>
            <ul className='all-movie-list'>
                {/* <li>
                    <a href='#3'>
                        <div className='movie-img'><p className='movie-rate'>8.3</p></div>
                        <h5 className='movie-title'>冰原歷險記:巴克大冒險哈哈哈哈</h5>
                    </a>
                </li> */}
            </ul>
            <button onClick={loadMore} className='loadmore'>載入更多</button>
        </React.Fragment>
    );

}


export default Drama;