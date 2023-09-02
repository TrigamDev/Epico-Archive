import './styles/App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import GalleryPage from "./components/galleryPage/Page";
import PostPage from "./components/postPage/Page";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" Component={GalleryPage} />
                <Route path="/post/:postId" Component={PostPage} />
            </Routes>
        </Router>
    );
}

export default App;
