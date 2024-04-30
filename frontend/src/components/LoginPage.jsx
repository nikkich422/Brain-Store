import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { setUserLogin } from "../Utils/dataSlice";
import { useDispatch } from "react-redux";
import { useToast } from "@chakra-ui/react";

const LoginPage = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    dispatch(setUserLogin());
    navigate("/");
    toast({
      title: "Log In",
      description: "Login Successful...",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
  };

  return (
    <div className="h-full md:h-screen flex flex-col justify-start my-20 md:my-0 md:justify-center items-center gap-3 md:gap-6">
      <h1 className="text-4xl font-bold">Log in</h1>
      <p>
        Don't have an account?{" "}
        <Link to="/register">
          <span className="text-blue-500 hover:underline font-bold hover:cursor-pointer">
            Sign up
          </span>
        </Link>
      </p>

      <Link to="/loginwithotp">
        <button className="m-2 px-4 py-2 bg-green-500 text-white font-semibold rounded-md">
          Login with OTP
        </button>
      </Link>
      <div className="w-11/12 h-11/12 md:w-3/5 md:h-3/5 border border-gray-200 shadow-xl rounded-xl flex justify-center items-center md:py-0 py-6">
        <Form
          className="login-form w-10/12 h-11/12 md:w-3/5 md:h-4/5 flex flex-col justify-center items-center gap-2 md:gap-4"
          name="normal_login"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            className="w-full"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Enter Email"
            />
          </Form.Item>
          <Form.Item
            className="w-full"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <Button
              classNames="px-4 py-2"
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            <span className="mx-2">
              Or{"  "}
              <Link
                className="hover:underline text-blue-500 font-semibold"
                to="/register"
              >
                register now!
              </Link>
            </span>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
