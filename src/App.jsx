import "./App.css";
import { GridCell } from "./GridCell";

function App() {
    return (
        <div className="content">
            <header>
                <h1 className="title">Pattern designer</h1>
            </header>
            <main className="grid">
                <aside>
                    <h3>Points</h3>
                    <ul>
                        <li>A (0;1)</li>
                        <li>B (2;1)</li>
                    </ul>
                    <h3>Segments</h3>
                    <ul>
                        <li>AB </li>
                    </ul>
                </aside>
                <section className="design-content">
                    <h2 className="pattern-name">GRID</h2>
                    <GridCell />
                </section>
            </main>
        </div>
    );
}

export default App;
