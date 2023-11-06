import "./styles.scss";
import { WithRouter } from "./pages/auth-page/AuthPage";
import { TasksPage } from "./pages/tasks-page/Tasks";
import { Route, Routes } from "react-router-dom";
import { MainPage } from "./pages/main-page/MainPage";
import { WrappedComponent } from "./pages/wrapped-component/NewComponent";

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route key={"/"} path={"/"} element={<MainPage />}>
          <Route key={"/auth"} path={"/auth"} element={<WithRouter />} />
          <Route
            key={"/tasks/*"}
            path={"/tasks/*"}
            element={
              <WrappedComponent>
                <TasksPage />
              </WrappedComponent>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
