import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import rusklogo from "../../assets/rusklogo.png";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  fullName: yup.string().required("Full Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const handleSignup = async (data) => {
    try {
      const newUser = {
        id: new Date().getTime(),
        ...data,
      };

      const response = await axios.post("http://localhost:4000/users", newUser);
      console.log("User signed up:", response.data);
      navigate("/login");
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <div className="log-sig">
      <div className="logo">
        {" "}
        <img className="rusklogo" src={rusklogo} alt="Logo" />
      </div>
      <Form className="form-log-sign" onSubmit={handleSubmit(handleSignup)}>
        <h1 className="hder">Playverse Admin Panel</h1>
        <Form.Group
          className="mb-3 mt-5 form-size"
          controlId="formBasicFullName"
        >
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            size="lg"
            placeholder="Enter Full Name"
            {...register("fullName")}
          />
          <p className="error">{errors.fullName?.message}</p>
        </Form.Group>

        <Form.Group className="mb-3 form-size" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            size="lg"
            placeholder="Enter email"
            {...register("email")}
          />
          <p className="error">{errors.email?.message}</p>
        </Form.Group>

        <Form.Group className="mb-3 form-size" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            size="lg"
            placeholder="Enter Password..."
            {...register("password")}
          />
          <p className="error">{errors.password?.message}</p>
        </Form.Group>

        <Button className="mb-4 mt-2 btn-ok " variant="primary" type="submit">
          SIGNUP
        </Button>

        <p>Already have an account?</p>
        <Button variant="dark">
          <Link to="/login" style={{ textDecoration: "none", color: "white" }}>
            LOGIN
          </Link>
        </Button>
      </Form>
    </div>
  );
}

export default Signup;
