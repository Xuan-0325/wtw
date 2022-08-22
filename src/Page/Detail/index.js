import './index.css';
import Header from '../Component/Header';
import React from 'react';
import { useEffect } from 'react';



const Detail = () => {

    // 畫面更新
    const ApiKey = "b1d762f529f273ebf5a8b40f118aa75b";
    const background_liner = "linear-gradient(360deg, #1B1E25 0%, rgba(27, 30, 37, 0) 29.22%), radial-gradient(72.5% 427.7% at 96.33% 50%, rgba(27, 30, 37, 0) 39.58%, rgba(27, 30, 37, 0.93) 94.79%), url(";
    const TMDB_img_url = "https://image.tmdb.org/t/p/original//";
    let backgroundUrl = '';
    let detailContentId = '';
    let detailPage_render = async () => {
        // 撈資料
        let filmID = sessionStorage.getItem("detailID").split('&');
        detailContentId = filmID[0];
        let detailUrl = "https://api.themoviedb.org/3/movie/" + filmID[0] + "?api_key=" + ApiKey + "&language=zh-TW";
        let detailData = await fetch(detailUrl);
        let detailContent = await detailData.json();
        // console.log(detailContent.title)
        // console.log(filmID[1])
        if (detailContent.title != filmID[1]){
            detailUrl = "https://api.themoviedb.org/3/tv/" + filmID[0] + "?api_key=" + ApiKey + "&language=zh-TW";
            detailData = await fetch(detailUrl);
            detailContent = await detailData.json();
        }
        // console.log(detailContent);


        // 影集類別
        let genresStr = ''
        for (let i = 0; i < detailContent.genres.length; i++){
            genresStr += `<li>` + detailContent.genres[i].name + `</li>`
        }
        document.querySelector('.describe-type').innerHTML = genresStr;
        document.querySelector('.describe-type-mobile').innerHTML = genresStr;

        // 影集名稱+評價
        let detailTitleVoteStr = '';
        
        if (detailContent.title){
            detailTitleVoteStr += `<h3 class="describe-title">` + detailContent.title + `</h3><h5>` + (detailContent.vote_average).toFixed(1) + `</h5>`
            document.querySelector('.describe-title-mobile').innerHTML = detailContent.title;
        }
        else  {
            detailTitleVoteStr += `<h3 class="describe-title">` + detailContent.name + `</h3><h5>` + (detailContent.vote_average).toFixed(1) + `</h5>`
            document.querySelector('.describe-title-mobile').innerHTML = detailContent.name;
        }
        document.querySelector('.describe-title-vote').innerHTML = detailTitleVoteStr;
        document.querySelector('.describe-rate-mobile').innerHTML = (detailContent.vote_average).toFixed(1);
        

        // 上映日期 語言 時長
        let detailOtherStr = '';
        let detail_releaseDate = detailContent.release_date;
        if (!detail_releaseDate){
            detail_releaseDate = detailContent.first_air_date;
        }
        let detailLanguage = detailContent.original_language;
        // 判斷語系
        if (detailLanguage == "en"){
            detailLanguage = "英語";
        }
        else if (detailLanguage == "ja"){
            detailLanguage = "日語"
        }
        else if (detailLanguage == "fr"){
            detailLanguage = "法語"
        }
        else if (detailLanguage == "ja"){
            detailLanguage = "日語"
        }
        else if (detailLanguage == "zh" || detailLanguage == "cn"){
            detailLanguage = "國語"
        }
        else if (detailLanguage == "hi"){
            detailLanguage = "印地語"
        }
        else if (detailLanguage == "ko"){
            detailLanguage = "韓語"
        }
        else if (detailLanguage == "pt"){
            detailLanguage = "葡萄牙語"
        }
        let detailRunTime = detailContent.runtime;
        if (!detailRunTime){
            detailRunTime = detailContent.episode_run_time;
            detailOtherStr += `<span>` + detail_releaseDate + `</span><span>` + detailLanguage + `</span><span>` + detailRunTime + `分鐘/每集</span>`;
        }
        else {
            detailOtherStr += `<span>` + detail_releaseDate + `</span><span>` + detailLanguage + `</span><span>` + detailRunTime + `分鐘</span>`;
        }
        document.querySelector('.describe-other').innerHTML = detailOtherStr;
        document.querySelector('.describe-other-mobile').innerHTML = detailOtherStr;

        // 導演
        document.querySelector('.director-name').innerHTML = "暫無資訊";
        document.querySelector('.director-name-mobile').innerHTML = "暫無資訊";

        // 劇情介紹
        document.querySelector('.describe-intro').innerHTML = detailContent.overview;
        document.querySelector('.describe-intro-mobile').innerHTML = detailContent.overview;

        // 圖片
        document.querySelector('.detail-img').style.backgroundImage = "url(" + TMDB_img_url + detailContent.poster_path + ")";
        backgroundUrl = detailContent.poster_path;
        document.querySelector('.detail-main-mobile').style.backgroundImage = background_liner + TMDB_img_url + detailContent.backdrop_path;

        // 判斷是否有加入片單
        for (let i = 0; i < localStorage.length; i++){
            // console.log(localStorage.key(i))
            // console.log(document.querySelector('.describe-title').innerHTML)
            if (document.querySelector('.describe-title').innerHTML == localStorage.key(i)){
                document.querySelector('.add-myfilm').innerHTML = "移出片單";
                document.querySelector('.add-myfilm').classList.remove("add-btn");
                document.querySelector('.add-myfilm').classList.add('reomve-btn');
            }
            if (document.querySelector('.describe-title-mobile').innerHTML == localStorage.key(i)){
                document.querySelector('.Hot-add-mobile').innerHTML = "移出片單";
                document.querySelector('.Hot-add').classList.remove('add-style');
                document.querySelector('.Hot-add').classList.add('remove-style');
            }
        }
    }

    // 新增移除片單功能
    let addMyFilm = () => {
        let title = '';
        let vote = '';
        let poster_path = '';
        let id = '';
        if (document.querySelector('.describe.title')){
            title = document.querySelector('.describe.title').innerHTML;
            vote = document.querySelector('.describe-title-vote').innerHTML;
        }
        else {
            title = document.querySelector('.describe-title-mobile').innerHTML;
            vote = document.querySelector('.describe-rate-mobile').innerHTML
        }
        poster_path = backgroundUrl;
        id = detailContentId;
        (parseFloat(vote)).toFixed(1);
        if (document.querySelector('.add-myfilm').innerHTML == "加入片單" || document.querySelector('.Hot-add-mobile').innerHTML == "加入片單"){
            localStorage.setItem(title, title + "&" + vote + "&" + poster_path + "&" + id)
            document.querySelector('.add-myfilm').classList.remove("add-btn");
            document.querySelector('.add-myfilm').classList.add('reomve-btn');
            document.querySelector('.Hot-add').classList.remove('add-style');
            document.querySelector('.Hot-add').classList.add('remove-style');
            document.querySelector('.add-myfilm').innerHTML = "移出片單";
            document.querySelector('.Hot-add-mobile').innerHTML = "移出片單";
            alert("已將 "+title+" 加入到我的片單")
        }
        else {
            localStorage.removeItem(title);
            alert("已將 "+title+" 從我的片單移出")
            document.querySelector('.add-myfilm').classList.add("add-btn");
            document.querySelector('.add-myfilm').classList.remove('reomve-btn');
            document.querySelector('.Hot-add').classList.add('add-style');
            document.querySelector('.Hot-add').classList.remove('remove-style');
            document.querySelector('.add-myfilm').innerHTML = "加入片單";
            document.querySelector('.Hot-add-mobile').innerHTML = "加入片單";
        }
    }

    useEffect(()=>{
        detailPage_render();
    }, [])



    return (
        <React.Fragment>
            <Header />
            <div className='detail-main pc-tablet'>
                <div className='detail-img'></div>
                <div className='detail-describe'>
                    <ul className='describe-type'>
                       <li>劇情</li>
                       <li>科幻奇幻</li>
                    </ul>
                    <ul>
                        <li className='describe-title-vote'>
                            <h3 className='describe-title'></h3>
                            <h5></h5>
                        </li>
                        <li className='describe-other'>
                            <span></span>
                            <span></span>
                            <span></span>
                        </li>
                        <li className='describe-director'>
                            <span className='director-title'>導演</span>
                            <span className='director-name'></span>
                        </li>
                        <li className='describe-intro-title'>劇情介紹</li>
                        <li className='describe-intro'></li>
                        <li className='describe-platform'>播放平台</li>
                    </ul>
                    <button onClick={addMyFilm} className='add-btn add-myfilm'>加入片單</button>
                </div>
                <div></div>
            </div>
            <div className='detail-main-mobile'>
                <ul className='describe-info-mobile'>
                    <li className='describe-rate-mobile'></li>
                    <li className='describe-title-mobile'></li>
                    <li className='describe-btn-mobile'><button onClick={addMyFilm} className='add-style Hot-add Hot-add-mobile'>加入片單</button></li>
                </ul>
                <ul className='describe-type describe-type-mobile mt-150'>
                    <li>劇情</li>
                   <li>科幻奇幻</li>
                </ul>
                <ul className='ml-16 of-h'>
                    <li className='describe-other describe-other-mobile'>
                        <span></span>
                        <span></span>
                        <span></span>
                    </li>
                    <li className='describe-director'>
                        <span className='director-title'>導演</span>
                        <span className='director-name director-name-mobile'></span>
                    </li>
                    <li className='describe-intro-title'>劇情介紹</li>
                    <li className='describe-intro describe-intro-mobile'></li>
                    <li className='describe-platform'>播放平台</li>
                </ul>
            </div>

        </React.Fragment>
    );
}



export default Detail;