import React from "react";
import { useEffect } from "react";
import Header from "../Component/Header";
import "./index.css";


const MyFilm = () => {
    
    // API資料
    const ApiKey = "b1d762f529f273ebf5a8b40f118aa75b";
    const background_liner = 'linear-gradient(180deg, rgba(22, 22, 22, 0) 30.58%, rgba(22, 22, 22, 0.98) 100%), url(';
    const TMDB_img_url = "https://image.tmdb.org/t/p/original//";

    // 取得片單資料
    let myFilmData = []
    let myFilmStr = '';
    let showMyFilm = () => {
        for (let i = 0; i < localStorage.length; i++){
            let myTitle = localStorage.getItem(localStorage.key(i)).split('&');
            // console.log(myTitle);
            myFilmData.push({
                title: myTitle[0],
                vote: myTitle[1],
                backdrop: myTitle[2],
                id: myTitle[3]
            })
        }
        for (let i = 0; i < myFilmData.length; i++){
            myFilmStr += `
            <li>
                <a class='myFilm-info' id="` + myFilmData[i].id + "&" + myFilmData[i].title + `" href='#'>
                <div class='movie-img' style="background-image: ` + background_liner + TMDB_img_url + myFilmData[i].backdrop +`);"><p class='movie-rate'>` + (Number(myFilmData[i].vote)).toFixed(1) + `</p></div>
                <h5 class='movie-title'>` + myFilmData[i].title + `</h5>
                </a>
            </li>
            `;
        }
        document.querySelector('.myfilm-list').innerHTML = myFilmStr;
        for (let i = 0; i < myFilmData.length; i++){
            document.querySelectorAll('.myFilm-info')[i].addEventListener('click', moreInfo);
        }
    }

    let choseType = () => {
        alert("功能尚未開放");
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

    useEffect(()=>{
        showMyFilm();
    },[])


    return (
        <React.Fragment>
            <Header />
            <ul className='search-type'>
                <li><button onClick={choseType} className='search-title'>全部</button></li>
                <li><button onClick={choseType} className="search-actor">電影</button></li>
                <li><button onClick={choseType} className="search-actor">影集</button></li>
            </ul>
            <ul className='myfilm-list'>
                {/* <li>
                    <a href='#3'>
                        <div className='movie-img'><p className='movie-rate'>8.3</p></div>
                        <h5 className='movie-title'>冰原歷險記:巴克大冒險哈哈哈哈</h5>
                    </a>
                </li> */}
            </ul>
            {/* <p className='error-search d-n'>找不到符合的結果。</p> */}
        </React.Fragment>
    );
}


export default MyFilm;