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
import SingleVideo from './components/Videos/SingleVideo/singlevideo';
import VideoDisplay from './components/Videos/VideoList/videolist';
import EditVideos from './components/Videos/EditVideos/edit_videos';


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
      await dispatch(getAllVideos())
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
        <Route path='/upload' exact={true}>
          < UploadVideos />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>
        <Route path='/users/:userId' exact={true} >
          <User />
        </Route>
        <Route path='/video/:videoId' exact={true} >
          <SingleVideo />
        </Route>
        <Route path='/edit/:videoId' exact={true} >
          <EditVideos />
        </Route>
        <Route path='/home' exact={true} >
          <VideoDisplay />
        </Route>
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
