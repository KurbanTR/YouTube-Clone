import { Route, Routes } from 'react-router-dom';
import './App.css';
import MainPage from './pages/MainPage';
import Video from './pages/Video';
import ChannelsPage from './pages/ChannelsPage';
import Header from './widgets/Header';
import SearchPage from './pages/SearchPage';
import PlayList from './pages/PlayList';

const App = () => {
  return (
    <>
      <Header/>
      <div className='min-h-[11em] 1650res:min-h-[3.75em]'/>
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/result' element={<SearchPage/>}/>
        <Route path='/watch' element={<Video/>}/>
        <Route path='/playlist' element={<PlayList/>}/>
        <Route path='/channels/:id' element={<ChannelsPage/>}/>
      </Routes>
      <div className='min-h-[6vw]'/>
    </>
  )
}

export default App