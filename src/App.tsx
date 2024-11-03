import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";
import Header from "./Components/Header";
import Detail from "./Routes/Detail";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='movies/:id' element={<Home />}></Route>
        <Route path='/tv' element={<Tv />}></Route>
        <Route path='/search' element={<Search />}></Route>
        <Route path='detail/:id' element={<Detail />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
