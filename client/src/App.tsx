import React from 'react';
import Navbar from './components/nav/Navbar';
import Gallery from './components/gallery/Gallery';
import './styles/App.css';

function App() {
    return (
        <div className="App">
            <nav> <Navbar/> </nav>
            <div className="content">
                <main> <Gallery/> </main>
            </div>
        </div>
    );
}

export default App;
