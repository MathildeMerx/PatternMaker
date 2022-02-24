import "./App.css";

function App() {
    return (
        <div className="content">
            <header>
                <h1>Pattern designer</h1>
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
                    <h2>GRID</h2>
                    <div className="design-grid">
                        {Array(100)
                            .fill(1)
                            .map((x) => {
                                return (
                                    <div className="line">
                                        <button className="point-button"></button>
                                    </div>
                                );
                            })}
                    </div>
                </section>
            </main>
        </div>
    );
}

export default App;
