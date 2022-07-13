import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Channels from './components/ViewChannels/channels';
import HomeChannels from './components/ViewHomeChannels/homeChannels';
import User from './components/UserPage/User';
import { authenticate } from './store/session';
import UploadVideos from './components/Videos/UploadVideos/upload_videos';
import { loadUserDetails } from './store/details';
import { getAllVideos } from './store/videos';
import VideoDisplay from './components/Videos/VideoList/videolist';
import EditVideos from './components/Videos/EditVideos/edit_videos';
import SingleVideoPage from './components/Videos/SingleVideo/index';
import SplashPage from './components/Splash/splash';
import LibraryPage from './components/LibraryPage';
import LibraryUploadVids from './components/LibraryPage/Uploaded Vids/uploadedvids';
import LibraryLikedVids from './components/LibraryPage/Liked Vids/likedvids';
import ChannelSplash from './components/ViewChannels/channelSplash';
import ChannelHomeVids from './components/ViewHomeChannels/homeChannelVids';


function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      await dispatch(loadUserDetails());
      await dispatch(getAllVideos());
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/upload' exact={true}>
          < UploadVideos />
        </ProtectedRoute>
        <Route path='/channels' exact={true} >
          <ChannelSplash />
        </Route>
        <Route path={`/channels/:channelId`} >
          <Channels />
        </Route>
        <ProtectedRoute path={['/user/:userId', '/users/:userId']} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/videos/:videoId' >
          <SingleVideoPage />
        </ProtectedRoute>
        <ProtectedRoute path='/edit/:videoId' exact={true} >
          <EditVideos />
        </ProtectedRoute>
        <Route path={['/home', '/']} exact={true} >
          <HomeChannels />
          <VideoDisplay />
        </Route>
        <Route path={'/home/:channelId'}   >
          <HomeChannels />
          <ChannelHomeVids />
        </Route>

        <ProtectedRoute path='/library/upload' exact={true}>
          <LibraryPage />
          <LibraryUploadVids />
        </ProtectedRoute>
        <ProtectedRoute path='/library/likes' exact={true}>
          <LibraryPage />
          <LibraryLikedVids />
        </ProtectedRoute>
        <Route>
          <h1> Page Not Found</h1>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
