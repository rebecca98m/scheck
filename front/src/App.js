import logo from "./img/logo/primary-logo.png";

function App() {
  return (
    <div className="App">
        <div>
            <div id="load-screen" className="load-screen hidden">
                <span className="load-screen-img" />
            </div>

            <img title="logo" src={logo} width={200} alt="scheck"/>

        </div>
    </div>
  );
}

export default App;
