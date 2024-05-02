import React, { Component } from "react";
import { connect } from "react-redux";
import {
  actDeleteStudent,
  actEdiStudent,
  actSearch,
  actSubmitStudent,
} from "../store/action";
class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      student: {
        maSV: "",
        hoTen: "",
        phone: "",
        email: "",
      },
      error: {
        maSV: "",
        hoTen: "",
        phone: "",
        email: "",
      },
    };
  }

  handleRender = () => {
    const { listStudent, keyword } = this.props;

    const studentFilter = listStudent?.filter((student) => {
      return student.hoTen.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
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
    this.setState({ [name]: value });
  };

  handleSubmitUser = (event) => {
    event.preventDefault();
    const { maSV, hoTen, phone, email } = this.state;
    const errors = {};

    // Kiểm tra điều kiện cho từng trường và cập nhật state error nếu không hợp lệ
    if (!maSV.trim()) {
      errors.maSV = "Vui lòng nhập mã sinh viên";
    }
    if (!hoTen.trim()) {
      errors.hoTen = "Vui lòng nhập họ tên sinh viên";
    }
    if (!phone.trim()) {
      errors.phone = "Vui lòng nhập số điện thoại";
    }
    if (!email.trim()) {
      errors.email = "Vui lòng nhập địa chỉ email";
    }

    // Nếu có lỗi, cập nhật state error và không dispatch action submit
    if (Object.keys(errors).length > 0) {
      this.setState({ error: errors });
    } else {
      // Nếu không có lỗi, dispatch action submit
      this.props.submit(this.state);
      // Reset state error
      this.setState({ error: {} });
    }
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
            {this.state.error.maSV && (
              <span className="text-danger">{this.state.error.maSV}</span>
            )}
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
            {this.state.error.hoTen && (
              <span className="text-danger">{this.state.error.hoTen}</span>
            )}
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
            {this.state.error.phone && (
              <span className="text-danger">{this.state.error.phone}</span>
            )}
          </div>
          <div className="formgroup col-md-6">
            <p htmlFor="email">Email:</p>
            <input
              type="text"
              className="form-control"
              id="email"
              name="email"
              onChange={this.handleInput}
              value={this.state.email}
            />
            {this.state.error.email && (
              <span className="text-danger">{this.state.error.email}</span>
            )}
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
      dispatch(actSubmitStudent(student));
    },
    deleteStudent: (maSV) => {
      dispatch(actDeleteStudent(maSV));
    },
    edit: (student) => {
      dispatch(actEdiStudent(student));
    },
    resetEdit: () => {
      dispatch(actEdiStudent(null));
    },
    searchStudent: (keyword) => {
      dispatch(actSearch(keyword));
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
