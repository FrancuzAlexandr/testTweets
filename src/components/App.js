import useStore from "../utils/store";
import { Routes, Route, Navigate } from "react-router-dom";

import { TweetsPage } from "../pages/TweetsPage/TweetsPage";
import { HomePage } from "../pages/HomePage/HomePage";

function App() {
  const allUsers = useStore((state) => state.users);

  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tweets" element={<TweetsPage users={allUsers} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
