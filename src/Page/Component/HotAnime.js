import React, { useEffect } from 'react';
import './HotMovie.css';
import slidebtnleft from './Components/slidebtnleft.png';
import slidebtnright from './Components/slidebtnright.png';



const HotAnime = () => {

    let anime_drama = [];
    const ApiKey = "b1d762f529f273ebf5a8b40f118aa75b";
    let get_animeData = async () => {
        let animeUrl_page1 = "https://api.themoviedb.org/3/discover/tv?api_key=" + ApiKey + "&language=zh-TW&sort_by=popularity.desc&page=1&with_genres=16";
        let animeUrl_page2 = "https://api.themoviedb.org/3/discover/tv?api_key=" + ApiKey + "&language=zh-TW&sort_by=popularity.desc&page=2&with_genres=16";
        let resanime_page1 = await fetch(animeUrl_page1);
        let anime_data_page1 = await resanime_page1.json();
        // console.log(animedrama_data_page1);
        for (let i = 0; i < 20; i++){
            let id = anime_data_page1.results[i].id;
            let title = anime_data_page1.results[i].name;
            let backdrop = anime_data_page1.results[i].poster_path;
            let vote = anime_data_page1.results[i].vote_average;
    
            anime_drama.push({
                id: id,
                title: title,
                backdrop: backdrop,
                vote: vote
            })
        }
        
    
        let resanime_page2 = await fetch(animeUrl_page2);
        let anime_data_page2 = await resanime_page2.json();
        // console.log(animedrama_data_page2);
    
        for (let i = 0; i < 10; i++){
            let id = anime_data_page2.results[i].id;
            let title = anime_data_page2.results[i].name;
            let backdrop = anime_data_page2.results[i].poster_path;
            let vote = anime_data_page2.results[i].vote_average;
    
            anime_drama.push({
                id: id,
                title: title,
                backdrop: backdrop,
                vote: vote
            })
        }
        // console.log(anime_drama)
        
        // 將資料印在網頁上
        let anime_list = document.querySelector('.anime-list');
        let anime_list_array = '';
        const background_liner = 'linear-gradient(180deg, rgba(22, 22, 22, 0) 30.58%, rgba(22, 22, 22, 0.98) 100%), url(';
        const TMDB_img_url = "https://image.tmdb.org/t/p/original//";
        
        for (let i = 0; i < anime_drama.length; i++){
            anime_list_array += `
            <li>
                <a class='animeDrama-info' id="` + anime_drama[i].id + "&" + anime_drama[i].title + `" href='#'>
                <div class='movie-img' style="background-image: ` + background_liner + TMDB_img_url + anime_drama[i].backdrop +`);"><p class='movie-rate'>` + (anime_drama[i].vote).toFixed(1) + `</p></div>
                <h5 class='movie-title'>` + anime_drama[i].title + `</h5>
                </a>
            </li>
            `;
        }
        anime_list.innerHTML = anime_list_array;
        for (let i = 0; i < anime_drama.length; i++){
            document.querySelectorAll('.animeDrama-info')[i].addEventListener('click', moreInfo);
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
        get_animeData();
    }, [])




    return (
        <React.Fragment>
            <div className='Hot-movie'>
                <h3>熱門動畫</h3>
                <div>
                    <button onClick={anime_list_left_btn}><img src={slidebtnleft}></img></button>
                    <ul className='anime-list'>
                        {/* <li>
                            <a href='#3'>
                                <div className='movie-img'><p className='movie-rate'>8.3</p></div>
                                 style={{backgroundImage: 'linear-gradient(180deg, rgba(22, 22, 22, 0) 30.58%, rgba(22, 22, 22, 0.98) 100%), url(https://bit.ly/2OhbMHr);'}}
                                <h5 className='movie-title'>冰原歷險記:巴克大冒險哈哈哈哈</h5>
                            </a>
                        </li> */}
                    </ul>
                    <button onClick={anime_list_right_btn}><img src={slidebtnright}></img></button>
                </div>
            </div>
        </React.Fragment>
    );
}

let anime_list_right_btn = () => {
    document.querySelector('.anime-list').scrollLeft += 172;
}
let anime_list_left_btn = () => {
    document.querySelector('.anime-list').scrollLeft -= 172;
}




export default HotAnime;