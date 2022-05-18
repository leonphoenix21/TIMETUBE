import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/ViewUsers/UsersList';
import User from './components/UserPage/User';
import { authenticate } from './store/session';
import UploadVideos from './components/Videos/UploadVideos.js/upload_videos';
import { loadUserDetails } from './store/details';
import { getAllVideos } from './store/videos';
import VideoDisplay from './components/Videos/VideoList/videolist';
import EditVideos from './components/Videos/EditVideos/edit_videos';
import SingleVideoPage from './components/Videos/SingleVideo/index';


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
        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/videos/:videoId' exact={true} >
          <SingleVideoPage />
        </ProtectedRoute>
        <ProtectedRoute path='/edit/:videoId' exact={true} >
          <EditVideos />
        </ProtectedRoute>
        <ProtectedRoute path='/home'  >
          <VideoDisplay />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
        </ProtectedRoute>
        <Route>
          <h1> Page Not Found</h1>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
