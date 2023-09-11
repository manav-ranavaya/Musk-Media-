import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { users } from "../../../db.json";
import rusklogo from "../../assets/rusklogo.png";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const Login = () => {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleLogin = () => {
    const user = users.find(
      (u) => u.email === userData.email && u.password === userData.password
    );

    if (user) {
      localStorage.setItem("auth", true);
      navigate("/games");
    } else {
      toast.error("Invalid username or password", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  {
    return (
      <div className="log-sig">
        <ToastContainer />
        <div className="logo">
          <img className="rusklogo" src={rusklogo} alt="Logo" />
        </div>
        <Form className="form-log-sign">
          <h1 className="hder">Playverse Admin Panel</h1>
          <Form.Group
            className="mb-3 mt-5 form-size"
            controlId="formBasicEmail"
          >
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              size="lg"
              {...register("email")}
              placeholder="Enter email"
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
            <p className="error">{errors.email?.message}</p>
          </Form.Group>

          <Form.Group className="mb-3 form-size" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              size="lg"
              {...register("password")}
              placeholder="Enter Password..."
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
            />
            <p className="error">{errors.password?.message}</p>
          </Form.Group>

          <Button
            className="mb-4 mt-2 btn-ok"
            variant="primary"
            type="button"
            onClick={handleSubmit(handleLogin)}
          >
            LOGIN
          </Button>

          <p>Dont have an account ?</p>
          <Button variant="dark">
            <Link
              to="/signup"
              style={{ textDecoration: "none", color: "white" }}
            >
              SIGNUP
            </Link>
          </Button>
        </Form>
      </div>
    );
  }
};

export default Login;
