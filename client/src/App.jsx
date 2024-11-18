import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";

function App() {
  return (
    <>
      <div>
        <NavBar />
      </div>
      <div style={outletStyle()}>
        <Outlet />
      </div>
    </>
  );
}

function outletStyle() {
  return {
    overflow: "auto",
    padding: "16px",
    flex: "1",
    borderTop: "grey 2px solid",
    borderBottom: "green 2px solid",
  };
}

export default App;
