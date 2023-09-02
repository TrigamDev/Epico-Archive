import Navbar from './nav/Navbar';
import Gallery from './gallery/Gallery';

function Page() {
    return (
        <div className="App">
            <nav> <Navbar/> </nav>
            <div className="content">
                <main> <Gallery/> </main>
            </div>
        </div>
    )
}

export default Page;