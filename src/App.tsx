import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import MainPage from './pages/MainPage';
import Video from './pages/Video';
import ChannelsPage from './pages/ChannelsPage';
import Header from './widgets/Header';
import SearchPage from './pages/SearchPage';
import PlayList from './pages/PlayList';
import { GenresContext } from './context/context';
import { useState } from 'react';

const App = () => {
  const [genre, setGenre] = useState<string>('edisonpts')
  const location = useLocation()
  return (
    <GenresContext.Provider value={{genre, setGenre}}>
      <Header/>
      {
        location.pathname == '/' ?
          <div className='min-h-[7em] 1650res:min-h-[5.5em] 540res:min-h-[5em]'/>
        :
        <div className='min-h-[5em] 1650res:min-h-[3.5em] 540res:min-h-[3.2em]'/>
      }
      
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/result' element={<SearchPage/>}/>
        <Route path='/watch' element={<Video/>}/>
        <Route path='/playlist' element={<PlayList/>}/>
        <Route path='/channels/:id' element={<ChannelsPage/>}/>
      </Routes>
    </GenresContext.Provider>
  )
}

export default App