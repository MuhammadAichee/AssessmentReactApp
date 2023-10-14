import React from "react";
import "./App.css";
import { IRoutes, PrivateRoutes, PublicRoutes } from "Configuration/routes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "Routes/privateRoute/privateRoute.index";
import Loader from "Components/loader/loader.index";
import PublicRoute from "Routes/publicRoute/publicRoute.index";
import NotFound from "Components/notFound/notFound.index";

function App() {
  return (
    <div className="App">
        <Routes>
          {PrivateRoutes.map((route: IRoutes) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                <PrivateRoute>
                  {route?.layout !== undefined ? (
                    <Loader>
                      <route.layout>
                        <route.component />
                      </route.layout>
                    </Loader>
                  ) : (
                    <Loader>
                      <route.component />
                    </Loader>
                  )}
                </PrivateRoute>
              }
            />
          ))}
          {PublicRoutes.map((route: IRoutes) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                <PublicRoute>
                  {route?.layout !== undefined ? (
                    <Loader>
                      <route.layout>
                        <route.component />
                      </route.layout>
                    </Loader>
                  ) : (
                    <Loader>
                      <route.component />
                    </Loader>
                  )}
                </PublicRoute>
              }
            />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
    </div>
  );
}

export default App;
