import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import loadable from '@loadable/component';
//=====================o코드스플릿팅o===========================
const Login = loadable(() => import('@pages/login/Login'));
const Signup = loadable(() => import('@pages/signup/Signup'));
const Channel = loadable(() => import('@pages/channel/Channel'));
//============================================================

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/workspace/channel" element={<Channel />} />
    </Routes>
  );
};

export default App;
