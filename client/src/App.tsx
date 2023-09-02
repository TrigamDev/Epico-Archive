import './styles/App.css';

import Navbar from './components/nav/Navbar';
import Gallery from './components/gallery/Gallery';

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
