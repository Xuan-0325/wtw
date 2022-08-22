import logo from './logo.svg';
import './App.css';
import Home from './Page/Home';
import Detail from './Page/Detail';
import Movie from './Page/Movie';
import Drama from './Page/Drama';
import Theme from './Page/Theme';
import Search from './Page/Search';
import MyFilm from './Page/MyFilm';
import Header from './Page/Component/Header';
import { BrowserRouter, Routes, Route, HashRouter } from 'react-router-dom';

function App() {

  // 搜尋功能
  return (
    // <BrowserRouter>
    <HashRouter basename="/wtw">
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/movie' element={<Movie />}></Route>
        <Route path='/drama' element={<Drama />}></Route>
        <Route path='/theme' element={<Theme />}></Route>
        <Route path='/search' element={<Header />}></Route>
        <Route path='/myfilm' element={<MyFilm />}></Route>
        <Route path='/detail' element={<Detail />}></Route>
      </Routes>
    </HashRouter>
    // </BrowserRouter>
    // <Home />
    // <Detail />
    // <Movie />
  );
}

export default App;
