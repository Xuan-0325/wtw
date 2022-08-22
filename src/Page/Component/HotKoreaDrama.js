import React, { useEffect } from 'react';
import './HotMovie.css';
import slidebtnleft from './Components/slidebtnleft.png';
import slidebtnright from './Components/slidebtnright.png';


const HotKoreaDrama = () => {

    let korea_drama = [];
    const ApiKey = "b1d762f529f273ebf5a8b40f118aa75b";
    let get_koreadramaData = async () => {
        let koreadramaUrl_page1 = "https://api.themoviedb.org/3/discover/tv?api_key=" + ApiKey + "&language=zh-TW&sort_by=popularity.desc&page=1&with_original_language=ko";
        let koreadramaUrl_page2 = "https://api.themoviedb.org/3/discover/tv?api_key=" + ApiKey + "&language=zh-TW&sort_by=popularity.desc&page=2&with_original_language=ko";
        let reskoreadrama_page1 = await fetch(koreadramaUrl_page1);
        let koreadrama_data_page1 = await reskoreadrama_page1.json();
        // console.log(koreadrama_data_page1);
        for (let i = 0; i < 20; i++){
            let id = koreadrama_data_page1.results[i].id;
            let title = koreadrama_data_page1.results[i].name;
            let backdrop = koreadrama_data_page1.results[i].poster_path;
            let vote = koreadrama_data_page1.results[i].vote_average;
    
            korea_drama.push({
                id: id,
                title: title,
                backdrop: backdrop,
                vote: vote
            })
        }
        
    
        let reskoreadrama_page2 = await fetch(koreadramaUrl_page2);
        let koreadrama_data_page2 = await reskoreadrama_page2.json();
        // console.log(koreadrama_data_page2);
    
        for (let i = 0; i < 10; i++){
            let id = koreadrama_data_page2.results[i].id;
            let title = koreadrama_data_page2.results[i].name;
            let backdrop =koreadrama_data_page2.results[i].poster_path;
            let vote = koreadrama_data_page2.results[i].vote_average;
    
            korea_drama.push({
                id: id,
                title: title,
                backdrop: backdrop,
                vote: vote
            })
        }
        // console.log(korea_drama)
        
        // 將資料印在網頁上
        let koreadrama_list = document.querySelector('.koreadrama-list');
        let koreadrama_list_array = '';
        const background_liner = 'linear-gradient(180deg, rgba(22, 22, 22, 0) 30.58%, rgba(22, 22, 22, 0.98) 100%), url(';
        const TMDB_img_url = "https://image.tmdb.org/t/p/original//";
        
        for (let i = 0; i < korea_drama.length; i++){
            koreadrama_list_array += `
            <li>
                <a class='koreaDrama-info' id="` + korea_drama[i].id + "&" + korea_drama[i].title + `" href='#'>
                <div class='movie-img' style="background-image: ` + background_liner + TMDB_img_url +korea_drama[i].backdrop +`);"><p class='movie-rate'>` + (korea_drama[i].vote).toFixed(1) + `</p></div>
                <h5 class='movie-title'>` + korea_drama[i].title + `</h5>
                </a>
            </li>
            `;
        }
        koreadrama_list.innerHTML = koreadrama_list_array;
        for (let i = 0; i < korea_drama.length; i++){
            document.querySelectorAll('.koreaDrama-info')[i].addEventListener('click', moreInfo);
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

    useEffect(()=>{
        get_koreadramaData();
    }, [])


    return (
        <React.Fragment>
            <div className='Hot-movie bg-gray'>
                <h3>熱門韓劇</h3>
                <div>
                    <button onClick={koreadrama_list_left_btn}><img src={slidebtnleft}></img></button>
                    <ul className='koreadrama-list'>
                        {/* <li>
                            <a href='#3'>
                                <div className='movie-img'><p className='movie-rate'>8.3</p></div>
                                 style={{backgroundImage: 'linear-gradient(180deg, rgba(22, 22, 22, 0) 30.58%, rgba(22, 22, 22, 0.98) 100%), url(https://bit.ly/2OhbMHr);'}}
                                <h5 className='movie-title'>冰原歷險記:巴克大冒險哈哈哈哈</h5>
                            </a>
                        </li> */}
                    </ul>
                    <button onClick={koreadrama_list_right_btn}><img src={slidebtnright}></img></button>
                </div>
            </div>
        </React.Fragment>
    );
}

let koreadrama_list_right_btn = () => {
    document.querySelector('.koreadrama-list').scrollLeft += 172;
}
let koreadrama_list_left_btn = () => {
    document.querySelector('.koreadrama-list').scrollLeft -= 172;
}

export default HotKoreaDrama;