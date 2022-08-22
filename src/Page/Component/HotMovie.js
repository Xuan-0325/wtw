import React, { useEffect } from 'react';
import './HotMovie.css';
import slidebtnleft from './Components/slidebtnleft.png';
import slidebtnright from './Components/slidebtnright.png';



const HotMovie = () => {

    let Hot_movie = [];
    const ApiKey = "b1d762f529f273ebf5a8b40f118aa75b";
    let get_HotMovieData = async () => {
        let HotMovieUrl_page1 = "https://api.themoviedb.org/3/movie/popular?api_key=" + ApiKey + "&language=zh-TW&page=1";
        let HotMovieUrl_page2 = "https://api.themoviedb.org/3/movie/popular?api_key=" + ApiKey + "&language=zh-TW&page=2";
        let resHotMovie_page1 = await fetch(HotMovieUrl_page1);
        let HotMovie_data_page1 = await resHotMovie_page1.json();
        // console.log(HotMovie_data_page1);
        for (let i = 0; i < 20; i++){
            let id = HotMovie_data_page1.results[i].id;
            let title = HotMovie_data_page1.results[i].title;
            let backdrop = HotMovie_data_page1.results[i].poster_path;
            let vote = HotMovie_data_page1.results[i].vote_average;
    
            Hot_movie.push({
                id: id,
                title: title,
                backdrop: backdrop,
                vote: vote
            })
        }
        
    
        let resHotMovie_page2 = await fetch(HotMovieUrl_page2);
        let HotMovie_data_page2 = await resHotMovie_page2.json();
        // console.log(HotMovie_data_page2);
    
        for (let i = 0; i < 10; i++){
            let id = HotMovie_data_page2.results[i].id;
            let title = HotMovie_data_page2.results[i].title;
            let backdrop = HotMovie_data_page2.results[i].poster_path;
            let vote = HotMovie_data_page2.results[i].vote_average;
    
            Hot_movie.push({
                id: id,
                title: title,
                backdrop: backdrop,
                vote: vote
            })
        }
        // console.log(Hot_movie)
        
        // 將資料印在網頁上
        let movie_list = document.querySelector('.movie-list');
        let movie_list_array = '';
        const background_liner = 'linear-gradient(180deg, rgba(22, 22, 22, 0) 30.58%, rgba(22, 22, 22, 0.98) 100%), url(';
        const TMDB_img_url = "https://image.tmdb.org/t/p/original//";
        // linear-gradient(180deg, rgba(22, 22, 22, 0) 30.58%, rgba(22, 22, 22, 0.98) 100%), url(https://image.tmdb.org/t/p/original///wcKFYIiVDvRURrzglV9kGu7fpfY.jpg
        for (let i = 0; i < Hot_movie.length; i++){
            movie_list_array += `
            <li>
                <a class='movie-info' id="` + Hot_movie[i].id + "&" + Hot_movie[i].title + `" href="#">
                <div class='movie-img' style="background-image: ` + background_liner + TMDB_img_url + Hot_movie[i].backdrop +`);"><p class='movie-rate'>` + (Hot_movie[i].vote).toFixed(1) + `</p></div>
                <h5 class='movie-title' >` + Hot_movie[i].title + `</h5>
                </a>
            </li>
            `;
        }
        movie_list.innerHTML = movie_list_array;
        for (let i = 0; i < Hot_movie.length; i++){
            document.querySelectorAll('.movie-info')[i].addEventListener('click', moreInfo);
        }
        // 更換背景圖片
        // for (let i = 0; i < Hot_movie.length; i++){
        //     let num = '1-' + i;
        //     let movie_img = document.getElementById(num);
        //     // const background_liner = 'linear-gradient(180deg, rgba(22, 22, 22, 0) 30.58%, rgba(22, 22, 22, 0.98) 100%), url(';
        //     // const TMDB_img_url = "https://image.tmdb.org/t/p/original//";
        //     movie_img.style.backgroundImage = background_liner + TMDB_img_url + Hot_movie[i].backdrop;
        // }
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
        get_HotMovieData();
    },[])




    return (
        <React.Fragment>
            <div className='Hot-movie'>
                <h3>熱門電影</h3>
                <div>
                    <button onClick={movie_list_left_btn}><img src={slidebtnleft}></img></button>
                    <ul className='movie-list'>
                        {/* <li>
                            <a href='#3'>
                                <div className='movie-img'><p className='movie-rate'>8.3</p></div>
                                 style={{backgroundImage: 'linear-gradient(180deg, rgba(22, 22, 22, 0) 30.58%, rgba(22, 22, 22, 0.98) 100%), url(https://bit.ly/2OhbMHr);'}}
                                <h5 className='movie-title'>冰原歷險記:巴克大冒險哈哈哈哈</h5>
                            </a>
                        </li> */}
                    </ul>
                    <button onClick={movie_list_right_btn}><img src={slidebtnright}></img></button>
                </div>
            </div>
        </React.Fragment>
    );
    
}
let movie_list_right_btn = () => {
    document.querySelector('.movie-list').scrollLeft += 172;
}
let movie_list_left_btn = () => {
    document.querySelector('.movie-list').scrollLeft -= 172;
}


// 取得30個熱門電影

// setInterval(get_HotMovieData, 100)


export default HotMovie;