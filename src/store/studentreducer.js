const initialState = {
  listStudent: [
    { maSV: "1", hoTen: "Mark", phone: "0909561826", email: "@mdo" },
    { maSV: "2", hoTen: "Ken", phone: "0909561826", email: "@mdo" },
  ],
  editStudent: null,
  keyword: "",
};
const studentReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case "SUBMIT_STUDENT": {
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
    case "DELETE_STUDENT": {
      const { listStudent } = state;
      const listStudentFilter = listStudent.filter((student) => {
        return student.maSV !== action.payload;
      });
      return { ...state, listStudent: listStudentFilter };
    }
    case "EDIT_STUDENT":
      return { ...state, editStudent: action.payload };

    case "KEYWORD_STUDENT":
      return { ...state, keyword: action.payload };

    default:
      return { ...state };
  }
};

export default studentReducer;
