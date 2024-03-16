import React from "react";
import { NotFound } from "./travel/components/404";
import { Routes, Route } from "react-router-dom";
import { Term } from "./travel/components/Term";
import { Login } from "./travel/components/Account/Login";
import { Home } from "./travel/components/Home";
import { AuthProvider } from "./travel/context/authContext";
import { Register } from "./travel/components/Account/Register";
import { ProtectedRoute } from "./travel/components/ProtectedRoute";
import { FormAdd } from "./travel/components/Modal/Add/FormAdd";
import { Compress } from "./travel/components/Modal/Compress/Compress";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route
            path="/travel/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/travel/formadd"
            element={
              <ProtectedRoute>
                <FormAdd />
              </ProtectedRoute>
            }
          />

          <Route
            path="/travel/compress"
            element={
              <ProtectedRoute>
                <Compress />
              </ProtectedRoute>
            }
          />

          <Route path="/travel/term" exactly element={<Term />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Login />} />
          <Route path="/travel/register" element={<Register />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
