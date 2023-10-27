import { MainStackRouter } from "./MainStackRouter";
import { AuthContextProvider } from "./context";
function App() {
  return (
    <AuthContextProvider>
      <MainStackRouter />
    </AuthContextProvider>
  );
}

export default App;
