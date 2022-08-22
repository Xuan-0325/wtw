import React, { useEffect } from 'react';
import './HotMovie.css';
import slidebtnleft from './Components/slidebtnleft.png';
import slidebtnright from './Components/slidebtnright.png';


const HotLocalDrama = () => {


    let local_drama = [];
    const ApiKey = "b1d762f529f273ebf5a8b40f118aa75b";
    let get_localdramaData = async () => {
        let localdramaUrl_page1 = "https://api.themoviedb.org/3/discover/tv?api_key=" + ApiKey + "&language=zh-TW&sort_by=popularity.desc&page=1&with_original_language=zh";
        let localdramaUrl_page2 = "https://api.themoviedb.org/3/discover/tv?api_key=" + ApiKey + "&language=zh-TW&sort_by=popularity.desc&page=2&with_original_language=zh";
        let reslocaldrama_page1 = await fetch(localdramaUrl_page1);
        let localdrama_data_page1 = await reslocaldrama_page1.json();
        // console.log(koreadrama_data_page1);
        for (let i = 0; i < 20; i++){
            let id = localdrama_data_page1.results[i].id;
            let title = localdrama_data_page1.results[i].name;
            let backdrop = localdrama_data_page1.results[i].poster_path;
            let vote = localdrama_data_page1.results[i].vote_average;
    
            local_drama.push({
                id: id,
                title: title,
                backdrop: backdrop,
                vote: vote
            })
        }
        
    
        let reslocaldrama_page2 = await fetch(localdramaUrl_page2);
        let localdrama_data_page2 = await reslocaldrama_page2.json();
        // console.log(koreadrama_data_page2);
    
        for (let i = 0; i < 10; i++){
            let id = localdrama_data_page2.results[i].id;
            let title = localdrama_data_page2.results[i].name;
            let backdrop = localdrama_data_page2.results[i].poster_path;
            let vote = localdrama_data_page2.results[i].vote_average;
    
            local_drama.push({
                id: id,
                title: title,
                backdrop: backdrop,
                vote: vote
            })
        }
        // console.log(local_drama)
        
        // 將資料印在網頁上
        let localdrama_list = document.querySelector('.localdrama-list');
        let localdrama_list_array = '';
        const background_liner = 'linear-gradient(180deg, rgba(22, 22, 22, 0) 30.58%, rgba(22, 22, 22, 0.98) 100%), url(';
        const TMDB_img_url = "https://image.tmdb.org/t/p/original//";
        
        for (let i = 0; i < local_drama.length; i++){
            localdrama_list_array += `
            <li>
                <a class='localDrama-info' id="` + local_drama[i].id + "&" + local_drama[i].title + `" href='#'>
                <div class='movie-img' style="background-image: ` + background_liner + TMDB_img_url + local_drama[i].backdrop +`);"><p class='movie-rate'>` + (local_drama[i].vote).toFixed(1) + `</p></div>
                <h5 class='movie-title'>` + local_drama[i].title + `</h5>
                </a>
            </li>
            `;
        }
        localdrama_list.innerHTML = localdrama_list_array;
        for (let i = 0; i < local_drama.length; i++){
            document.querySelectorAll('.localDrama-info')[i].addEventListener('click', moreInfo);
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
        get_localdramaData();
    }, [])



    return (
        <React.Fragment>
            <div className='Hot-movie'>
                <h3>熱門陸劇、台劇</h3>
                <div>
                    <button onClick={localdrama_list_left_btn}><img src={slidebtnleft}></img></button>
                    <ul className='localdrama-list'>
                        {/* <li>
                            <a href='#3'>
                                <div className='movie-img'><p className='movie-rate'>8.3</p></div>
                                 style={{backgroundImage: 'linear-gradient(180deg, rgba(22, 22, 22, 0) 30.58%, rgba(22, 22, 22, 0.98) 100%), url(https://bit.ly/2OhbMHr);'}}
                                <h5 className='movie-title'>冰原歷險記:巴克大冒險哈哈哈哈</h5>
                            </a>
                        </li> */}
                    </ul>
                    <button onClick={localdrama_list_right_btn}><img src={slidebtnright}></img></button>
                </div>
            </div>
        </React.Fragment>
    );
}


let localdrama_list_right_btn = () => {
    document.querySelector('.localdrama-list').scrollLeft += 172;
}
let localdrama_list_left_btn = () => {
    document.querySelector('.localdrama-list').scrollLeft -= 172;
}



export default HotLocalDrama;