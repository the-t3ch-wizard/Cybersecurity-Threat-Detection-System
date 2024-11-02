import { Route, Routes } from "react-router-dom";
import { HomeLayout } from "./app/Home/HomeLayout";
import { Home } from "./app/Home/Home";
import { Url } from "./app/Url/Url";
import { File } from "./app/File/File";
import { Search } from "./app/Search/Search";

export const App = () => {
  return (
    <Routes>

      <Route path="/" element={<HomeLayout />} >
        <Route index element={<Home />} />
        <Route path="/url" element={<Url />} />
        <Route path="/file" element={<File />} />
        <Route path="/search" element={<Search />} />
      </Route>

    </Routes>
  )
}
