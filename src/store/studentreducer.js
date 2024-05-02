import * as ActionType from "./constant";

const initialState = {
  listStudent: [],
  editStudent: null,
  keyword: "",
};
const studentReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case ActionType.SUBMIT_STUDENT: {
      const listStudentClone = [...state.listStudent];
      const student = action.payload;
      const index = listStudentClone.findIndex(
        (pupil) => pupil.maSV === student.maSV
      );
      if (index !== -1) {
        listStudentClone[index] = student;
      } else {
        const studentNew = { ...student };
        listStudentClone.push(studentNew);
      }

      state.listStudent = listStudentClone;
      return { ...state };
    }
    case ActionType.DELETE_STUDENT: {
      const { listStudent } = state;
      const listStudentFilter = listStudent.filter((student) => {
        return student.maSV !== action.payload;
      });
      return { ...state, listStudent: listStudentFilter };
    }
    case ActionType.EDIT_STUDENT:
      return { ...state, editStudent: action.payload };

    case ActionType.KEYWORD_STUDENT:
      return { ...state, keyword: action.payload };

    default:
      return { ...state };
  }
};

export default studentReducer;
