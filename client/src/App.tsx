import { Route, Routes } from "react-router-dom";
import { HomeLayout } from "./app/Home/HomeLayout";
import { Home } from "./app/Home/Home";

export const App = () => {
  return (
    <Routes>

      <Route path="/" element={<HomeLayout />} >
        <Route index element={<Home />} />
      </Route>

    </Routes>
  )
}
