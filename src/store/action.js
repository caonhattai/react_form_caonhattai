import { type } from "@testing-library/user-event/dist/type";
import * as ActionType from "./constant";

const actDeleteStudent = (maSV) => {
  return {
    type: ActionType.DELETE_STUDENT,
    payload: maSV,
  };
};

const actEdiStudent = (student) => {
  return {
    type: ActionType.EDIT_STUDENT,
    payload: student,
  };
};

const actSearch = (keyword) => {
  return {
    type: ActionType.KEYWORD_STUDENT,
    payload: keyword,
  };
};

const actSubmitStudent = (student) => {
  return {
    type: ActionType.SUBMIT_STUDENT,
    payload: student,
  };
};

export { actDeleteStudent, actEdiStudent, actSearch, actSubmitStudent };
