import { type } from "@testing-library/user-event/dist/type";
import React, { Component } from "react";
import { connect } from "react-redux";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maSV: "",
      hoTen: "",
      phone: "",
      email: "",
    };
  }

  handleRender = () => {
    const { listStudent, keyword } = this.props;

    const studentFilter = listStudent?.filter((student) => {
      return student.hoTen.toLowercase().indexOf(keyword.toLowercase()) !== -1;
    });

    return studentFilter?.map((student, index) => {
      return (
        <tr key={index}>
          <td>{student.maSV}</td>
          <td>{student.hoTen}</td>
          <td>{student.phone}</td>
          <td>{student.email}</td>
          <td>
            <button
              className="btn btn-primary"
              onClick={() => {
                this.props.edit(student);
              }}
            >
              Edit
            </button>
            <button
              className="btn btn-danger"
              onClick={() => {
                this.props.deleteStudent(student.maSV);
              }}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  };

  handleInput = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, () => {
      // console.log(this.state);
    });
  };

  handleSubmitUser = (event) => {
    event.preventDefault();
    console.log(this.state);
    this.props.submit(this.state);
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { editStudent } = nextProps;
    if (editStudent) {
      this.setState({
        maSV: editStudent.maSV,
        hoTen: editStudent.hoTen,
        phone: editStudent.phone,
        email: editStudent.email,
      });
    } else {
      this.setState({
        maSV: "",
        hoTen: "",
        phone: "",
        email: "",
      });
    }
  }

  handleOnchange = (event) => {
    console.log(event.target.value);
    this.props.searchStudent(event.target.value);
  };

  render() {
    const { keyword } = this.props;
    console.log(keyword);
    return (
      <div className="container">
        <h1 className="bg-dark text-white p-3">Thông tin sinh viên</h1>
        <form
          onSubmit={this.handleSubmitUser}
          className="form-inline row m-auto"
        >
          <div className="formgroup col-md-6">
            <p htmlFor="maSV">Mã SV:</p>
            <input
              type="text"
              className="form-control"
              id="maSV"
              name="maSV"
              onChange={this.handleInput}
              value={this.state.maSV}
            />
          </div>
          <div className="formgroup col-md-6">
            <p htmlFor="hoTen">Họ tên:</p>
            <input
              type="text"
              className="form-control"
              id="hoTen"
              name="hoTen"
              onChange={this.handleInput}
              value={this.state.hoTen}
            />
          </div>
          <div className="formgroup col-md-6">
            <p htmlFor="phone">Số điện thoại:</p>
            <input
              type="number"
              className="form-control"
              id="phone"
              name="phone"
              onChange={this.handleInput}
              value={this.state.phone}
            />
          </div>
          <div className="formgroup col-md-6">
            <p htmlFor="email">Email:</p>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              onChange={this.handleInput}
              value={this.state.email}
            />
          </div>

          <button type="submit" className="btn btn-success mt-3">
            Thêm sinh viên
          </button>
          <button
            type="submit"
            className="btn btn-primary mt-3 ml-3"
            onClick={() => {
              this.props.resetEdit();
            }}
          >
            Reset
          </button>
        </form>
        <form className=" mt-3">
          <input
            type="text"
            className="form-control"
            id="search"
            placeholder="Tìm kiếm"
            onChange={this.handleOnchange}
          />
        </form>
        <table className="table mt-3">
          <thead className="bg-dark text-white p-3">
            <tr>
              <th scope="col">Mã SV</th>
              <th scope="col">Họ tên</th>
              <th scope="col">Số điện thoại</th>
              <th scope="col">Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{this.handleRender()}</tbody>
        </table>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    submit: (student) => {
      const action = {
        type: "SUBMIT_STUDENT",
        payload: student,
      };
      dispatch(action);
    },
    deleteStudent: (maSV) => {
      const action = {
        type: "DELETE_STUDENT",
        payload: maSV,
      };
      dispatch(action);
    },
    edit: (student, event) => {
      const action = {
        type: "EDIT_STUDENT",
        payload: student,
      };
      dispatch(action);
    },
    resetEdit: () => {
      const action = {
        type: "EDIT_STUDENT",
        payload: null,
      };
      dispatch(action);
    },
    searchStudent: (keyword) => {
      const action = {
        type: "KEYWORD_STUDENT",
        payload: keyword,
      };
      dispatch(action);
    },
  };
};

const mapStateToProps = (state) => {
  return {
    listStudent: state.studentReducer.listStudent,
    editStudent: state.studentReducer.editStudent,
    keyword: state.studentReducer.keyword,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
