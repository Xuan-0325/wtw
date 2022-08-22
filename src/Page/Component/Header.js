import './Header.css';
import logoLeft from './Components/Vector.png';
import logoCenter from './Components/VectorCenter.png';
import logoRight from './Components/VectorRight.png';
import Logo from './Components/Logo.png';
import searchImg from './Components/Combined-Shape.png';
import { Helmet } from 'react-helmet';
import FilmMobileIcon from './Components/FilmMobileIcon.png';
import VideoMobileIcon from './Components/TV.png';
import CollectIcon from './Components/collection_off.png';
import FavoriteIcon from './Components/favorite_off.png';
import NotLogMobile from './Components/NotLogMobile.png';
import NotLog from './Components/NotLog.png';
import Search from '../Search';
import Detail from '../Detail';
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import { createContext } from 'react';

// 搜尋內容初始值
// let searchContent = "44";
// export const searchData = createContext(searchContent);
const Header = () => {

    // 滾輪效果
    window.onscroll = () => {
        var ScrollH = 0;
        if (window.pageYOffset != "undefined") {
            ScrollH = window.pageYOffset;
        }
        else if (document.compatMode != "undefined" && document.compatMode != "BackCompat"){
            ScrollH = document.body.scrollTop;
        }
    
        var containerOpcity = document.querySelector('.container');
        if (ScrollH > 50){
            containerOpcity.style.opacity = 1;
            containerOpcity.style.background = 'rgba(27, 30, 37, 1)';
        }
        else {
            containerOpcity.style.opacity = 0.68;
            containerOpcity.style.background = 'rgba(27, 30, 37, 0.68)';
        }
    }
    // 搜尋功能
    const [searchData, setSearchData] = useState("");
    let displaySearch = () => {
        let nowPage = window.location.href;
        if (nowPage.includes('search')){
            document.querySelector('.searchContainer').className = "d-b";
        }
        else {
            document.querySelector('.searchContainer').className = "d-n";
        }
    }

    let clickTime = 0;
    let searchFunc = () => {
        if (clickTime == 0){
            let inputFunc = document.querySelector('.inputFunc');
            // document.querySelector('.searchPage').click();
            inputFunc.addEventListener("keypress", (event)=>{
                if (event.key == "Enter"){
                    event.preventDefault();
                    let searchBarValue = document.querySelector('.inputFunc').value;
                    if (searchBarValue){
                        sessionStorage.setItem("search", searchBarValue);
                        setSearchData(searchBarValue)
                        document.querySelector('.searchPage').click();
                    }
                    // let searchNowPage = window.location.href;
                    // console.log(searchNowPage);
                }
            })
        }
        clickTime++;
    }

    // 清除所有localStorage的資料
    let cleanAllLocalStorage = (event) => {
        event.preventDefault()
        console.log(localStorage.length);
        localStorage.clear();
        console.log(localStorage.length)
    }

    let other_page_click = (event) =>{
        let page;
        if (document.querySelector('.chose-header')){
            page = document.querySelector('.chose-header');
            page.classList.remove("chose-header");
        }
        event.target.className = "chose-header";
    }



    useEffect(()=>{
        displaySearch();
    },[])

    return (
        <React.Fragment>
            <Helmet>
                <title>What to watch 挖影</title>
                <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1'></meta>
                <meta charSet='utf-8'></meta>
            </Helmet>
            {/* <body> */}
                <div className='container df ai-c'>
                    <Link className='logo df' to='/wtw'>
                        <div className='df ai-c'>
                            <img className='logo-left' src={logoLeft}></img>
                            <img className='logo-center' src={logoCenter}></img>
                            <img className='logo-right' src={logoRight}></img>
                        </div>
                        {/* <img src={Logo}></img> */}
                        <h1 className='df ai-c pageTitle'>挖！影</h1>
                    </Link>
                    <form className='searchBar df ai-c'>
                        <img src={searchImg}></img>
                        <input className='inputFunc' type='text' placeholder='搜尋劇名/演員' onClick={searchFunc}></input>
                        {/* placeholder='搜尋劇名/演員' value={searchContent} onChange={contentChange}*/}
                    </form>
                    <Link className='searchPage' to="/wtw/search"></Link>
                    <Link className='detailPage' to="/wtw/detail"></Link>
                    <ul className='df ml-a jc-sb mr-40 HeaderList'>
                        <li className='header-list'><Link className='header-list-a' to='/wtw/movie'>電影</Link></li>
                        <li className='header-list'><Link className='header-list-a' to='/wtw/drama'>影集</Link></li>
                        <li className='header-list'><Link className='header-list-a' to='/wtw/theme'>主題館</Link></li>
                        <li className='header-list'><Link className='header-list-a' to='/wtw/myfilm'>我的片單</Link></li>
                        <li className='LogIcon' onClick={cleanAllLocalStorage}><a href='#'><img src={NotLog}></img></a></li>
                    </ul>
                </div>
                <div className='searchContainer d-n'>
                    <Search searchData={searchData}/>
                </div>
                <ul className='HeaderList-mobile'>
                    <li className='header-list-mobile'>
                        <Link to='/wtw/movie'>
                            <img src={FilmMobileIcon}></img>
                            <h3>電影</h3>
                        </Link>
                    </li>
                    <li className='header-list-mobile'>
                        <Link to='/wtw/drama'>
                            <img src={VideoMobileIcon}></img>
                            <h3>影集</h3>
                        </Link>
                    </li>
                    <li className='header-list-mobile'>
                        <Link to='/wtw/theme'>
                            <img src={CollectIcon}></img>
                            <h3>主題館</h3>
                        </Link>
                    </li>
                    <li className='header-list-mobile'>
                        <Link to='/wtw/myfilm'>
                            <img src={FavoriteIcon}></img>
                            <h3>我的片單</h3>
                        </Link>
                    </li>
                    <li className='header-list-mobile'>
                        <a>
                            <img src={NotLogMobile}></img>
                        </a>
                    </li>
                </ul>
                
            {/* </body> */}
        </React.Fragment>
    );
    // <img src={PCNotLog}></img>
    //                     <div className='NotLog-img'>
    //                         <img className='NotLog-left' src={PCNotLogLeft}></img>
    //                         <img className='NotLog-center' src={PCNotLogCenter}></img>
    //                         <img className='NotLog-right' src={PCNotLogRight}></img>
    //                     </div>
}



export default Header;