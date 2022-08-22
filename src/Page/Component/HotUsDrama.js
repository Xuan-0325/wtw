import React, { useEffect } from 'react';
import './HotMovie.css';
import slidebtnleft from './Components/slidebtnleft.png';
import slidebtnright from './Components/slidebtnright.png';


const HotUsDrama = () => {

    let us_drama = [];
    const ApiKey = "b1d762f529f273ebf5a8b40f118aa75b";
    let get_usdramaData = async () => {
        let usdramaUrl_page1 = "https://api.themoviedb.org/3/discover/tv?api_key=" + ApiKey + "&language=zh-TW&sort_by=popularity.desc&page=1&with_original_language=en";
        let usdramaUrl_page2 = "https://api.themoviedb.org/3/discover/tv?api_key=" + ApiKey + "&language=zh-TW&sort_by=popularity.desc&page=2&with_original_language=en";
        let resusdrama_page1 = await fetch(usdramaUrl_page1);
        let usdrama_data_page1 = await resusdrama_page1.json();
        // console.log(usdrama_data_page1);
        for (let i = 0; i < 20; i++){
            let id = usdrama_data_page1.results[i].id;
            let title = usdrama_data_page1.results[i].name;
            let backdrop = usdrama_data_page1.results[i].poster_path;
            let vote = usdrama_data_page1.results[i].vote_average;
    
            us_drama.push({
                id: id,
                title: title,
                backdrop: backdrop,
                vote: vote
            })
        }
        
    
        let resusdrama_page2 = await fetch(usdramaUrl_page2);
        let usdrama_data_page2 = await resusdrama_page2.json();
        // console.log(usdrama_data_page2);
    
        for (let i = 0; i < 10; i++){
            let id = usdrama_data_page2.results[i].id;
            let title = usdrama_data_page2.results[i].name;
            let backdrop =usdrama_data_page2.results[i].poster_path;
            let vote = usdrama_data_page2.results[i].vote_average;
    
            us_drama.push({
                id: id,
                title: title,
                backdrop: backdrop,
                vote: vote
            })
        }
        // console.log(us_drama)
        
        // 將資料印在網頁上
        let usdrama_list = document.querySelector('.usdrama-list');
        let usdrama_list_array = '';
        const background_liner = 'linear-gradient(180deg, rgba(22, 22, 22, 0) 30.58%, rgba(22, 22, 22, 0.98) 100%), url(';
        const TMDB_img_url = "https://image.tmdb.org/t/p/original//";
        
        for (let i = 0; i < us_drama.length; i++){
            usdrama_list_array += `
            <li>
                <a class='usDrama-info' id="` + us_drama[i].id + "&" + us_drama[i].title + `" href='#'>
                <div class='movie-img' style="background-image: ` + background_liner + TMDB_img_url +us_drama[i].backdrop +`);"><p class='movie-rate'>` + (us_drama[i].vote).toFixed(1) + `</p></div>
                <h5 class='movie-title'>` + us_drama[i].title + `</h5>
                </a>
            </li>
            `;
        }
        usdrama_list.innerHTML = usdrama_list_array;
        for (let i = 0; i < us_drama.length; i++){
            document.querySelectorAll('.usDrama-info')[i].addEventListener('click', moreInfo);
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
        get_usdramaData();
    }, [])



    return (
        <React.Fragment>
            <div className='Hot-movie bg-gray'>
                <h3>熱門美劇</h3>
                <div>
                    <button onClick={usdrama_list_left_btn}><img src={slidebtnleft}></img></button>
                    <ul className='usdrama-list'>
                        {/* <li>
                            <a href='#3'>
                                <div className='movie-img'><p className='movie-rate'>8.3</p></div>
                                 style={{backgroundImage: 'linear-gradient(180deg, rgba(22, 22, 22, 0) 30.58%, rgba(22, 22, 22, 0.98) 100%), url(https://bit.ly/2OhbMHr);'}}
                                <h5 className='movie-title'>冰原歷險記:巴克大冒險哈哈哈哈</h5>
                            </a>
                        </li> */}
                    </ul>
                    <button onClick={usdrama_list_right_btn}><img src={slidebtnright}></img></button>
                </div>
            </div>
        </React.Fragment>
    );
}

let usdrama_list_right_btn = () => {
    document.querySelector('.usdrama-list').scrollLeft += 172;
}
let usdrama_list_left_btn = () => {
    document.querySelector('.usdrama-list').scrollLeft -= 172;
}




export default HotUsDrama;