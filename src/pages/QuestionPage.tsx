import { HOME } from "../constants/home";
import { COMMON } from "../constants/common";
import BoardPage from "./BoardPage";

function QuestionPage() {
  return (
    <BoardPage
      boardType={HOME.BOARD_TYPES.QUESTION}
      repositoryType={COMMON.REPOSITORY.QUESTION}
    />
  );
}

export default QuestionPage;
