import logo from "./logo.svg";
import "./App.css";
import { Component } from "react";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import CategoryDetails from "./pages/CategoryDetails";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ProtectedRoutes from "./components/ProtectedRoutes";
export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Layout />}>
            <Route index element={<Home />}></Route>
            <Route element={<ProtectedRoutes />}>
              <Route
                path={"dashboard"}
                element={<ProtectedRoutes role="admin" />}
              >
                <Route index element={<Dashboard />} />
              </Route>

              <Route path={"categories"}>
                <Route index element={<Categories />} />
                <Route path={"categoryDetails"} element={<CategoryDetails />} />
              </Route>
            </Route>
            <Route path={"/*"} element={<NotFound />} />
            <Route path={"login"} element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}
