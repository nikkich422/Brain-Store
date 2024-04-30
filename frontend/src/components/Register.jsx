import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { setUserLogin } from "../Utils/dataSlice";
import { useDispatch } from "react-redux";

const Register = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Success:", values);
    toast({
      title: "Sign in",
      description: "Login Successful...",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
    navigate("/");
    dispatch(setUserLogin());
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    toast({
      title: "Sign up",
      description: "Some error occured while signning up",
      status: "error",
      duration: 4000,
      isClosable: true,
    });
  };
  return (
    <div className="h-screen flex flex-col justify-start md:justify-center items-center gap-5 md:gap-8 md:py-0 py-10">
      <h1 className="text-4xl font-bold">Register</h1>
      <p>
        Already have an account{" "}
        <Link to="/login">
          <span className="text-blue-500 hover:underline font-bold hover:cursor-pointer">
            Sign in
          </span>
        </Link>
      </p>
      <div className="w-11/12 md:w-3/5 h-4/6 md:h-3/6 border border-gray-200 shadow-xl rounded-xl flex justify-center items-center py-4 md:py-0">
        <Form
          className="w-9/12 md:w-3/5 h-3/5 flex flex-col justify-center items-center "
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            className="w-full p-2"
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            className="w-full"
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Sign up
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;
