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
    <HashRouter>
      <Routes>
        <Route path='/wtw' element={<Home />}></Route>
        <Route path='/wtw/movie' element={<Movie />}></Route>
        <Route path='/wtw/drama' element={<Drama />}></Route>
        <Route path='/wtw/theme' element={<Theme />}></Route>
        <Route path='/wtw/search' element={<Header />}></Route>
        <Route path='/wtw/myfilm' element={<MyFilm />}></Route>
        <Route path='/wtw/detail' element={<Detail />}></Route>
      </Routes>
    </HashRouter>
    // </BrowserRouter>
    // <Home />
    // <Detail />
    // <Movie />
  );
}

export default App;
