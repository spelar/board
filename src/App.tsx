import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import PageLayout from "./layouts/PageLayout";
import HomePage from "./pages/HomePage";
import QuestionPage from "./pages/QuestionPage";
import FreeBoardPage from "./pages/FreeBoardPage";
import WritePage from "./pages/WritePage";
import useGlobalToastInit from "./hooks/useGlobalToastInit";
import DetailPage from "./pages/DetailPage";
import EditPage from "./pages/EditPage";
import "react-toastify/dist/ReactToastify.css";

function App() {
  useGlobalToastInit();
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route element={<PageLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/question-board">
            <Route path="list" element={<QuestionPage />} />
            <Route path="write" element={<WritePage />} />
            <Route path="detail/:itemId" element={<DetailPage />} />
            <Route path="edit/:itemId" element={<EditPage />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
