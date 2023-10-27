import { Route, Routes } from "react-router-dom";
import { FormUpload, Login, Register } from "./feature";
import { AuthRoute } from "./AuthRoute";

export const MainStackRouter = (): JSX.Element => {
  return (
    <>
      <Routes>
        <Route path='/register' element={<Register />} />

        <Route path='/login' element={<Login />} />

        <Route
          path='/'
          element={
            <AuthRoute>
              <FormUpload />
            </AuthRoute>
          }
        />
      </Routes>
    </>
  );
};
