import { Outlet, Route, Routes } from "react-router-dom";
import Home from "./src/modules/home/components/Home";

const MainLayout = () => {
  return (
    <>
      <Routes>
        <Route path="" element={<Outlet />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </>
  );
};

export default MainLayout;
