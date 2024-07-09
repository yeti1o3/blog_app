import './styles/App.css';
import Layout from './Layout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PostPage from './pages/PostPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import CreatePostPage from './pages/CreatePostPage';
import { UserProvider } from './context/UserContext';
function App() {
  return (
    <div className="App">
      <UserProvider>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
        <Route index element={<PostPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/create" element={<CreatePostPage/>}/>
        </Route>
      </Routes>
      </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
