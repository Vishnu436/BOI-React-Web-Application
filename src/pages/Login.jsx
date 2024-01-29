import React from "react";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Row,
  Col,
  Image,
  Typography,
  Space,
  Carousel,
  notification,
} from "antd";

import { useNavigate } from "react-router-dom";
import API from "../utilities/api";

const Login = () => {
  const navigate = useNavigate();
  const { Title } = Typography;
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (placement) => {
    api.error({
      message: "Error occured!",
      description: "Invalid Credentials, please input valid details",
      placement,
    });
  };

  const onFinish = async (values) => {
    console.log(values.Cus_EmailID);

    const obj = {
      Cus_EmailID: values.Cus_EmailID,
      Cus_Mobile_Number: parseInt(values.Cus_Mobile_Number),
    };

  

    try {
      await API.fetchAPI("/usrmngmt/api/v1/getIsCustomer", obj)
        .then((response) => {
          if (response.responseHeader.code) {
            const loginObj = {
              User: response.responseBody.User,
              userName: values.Cus_EmailID,
              password: parseInt(values.Cus_Mobile_Number),
            };    

            API.fetchAPI("/usrmngmt/api/v1/validateAndLogin", loginObj)
              .then((response) => {
                if (response.responseBody.Validation) {
                  navigate("./main/dashboard");
                } else {
                  openNotification();
                }
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            console("invalid");
          }
        })
        .catch((error) => {
          console.log(error.json());
        });
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  return (
    <Row>
      <Col span={12}>
        <Form
          name="basic"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          style={{
            width: "400px",
            marginLeft: "200px",
            marginTop: 200,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Title
            level={3}
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "50px",
              fontFamily: "Barlow",
              fontWeight: 500,
              fontStyle: "normal",
            }}
          >
            Login To Your Account
          </Title>
          <Form.Item
            label="Username or Email"
            name="Cus_EmailID"
            style={{
              fontFamily: "Barlow",
              fontWeight: 400,
              fontStyle: "normal",
            }}
            rules={[
              {
                required: true,
                message: "Please input your username or email!",
              },
              {
                pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid Email or Username",
              },
            ]}
          >
            <Input
              placeholder="Enter Your Username or Email"
              allowClear="true"
              autoComplete="true"
              style={{
                border: "none",
                borderBottom: "1px solid black",
                borderRadius: "0px",
                fontFamily: "Barlow",
                fontWeight: 100,
                fontStyle: "normal",
              }}
            />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="Cus_Mobile_Number"
            style={{
              fontFamily: "Barlow",
              fontWeight: 400,
              fontStyle: "normal",
            }}
            rules={[
              {
                required: true,
                message: "Please input your phonenumber!",
              },
              {
                pattern: /^[0-9]{10}$/,
                message: "Must contain only numbers with length of 10 digits.",
              },
            ]}
          >
            <Input.Password
              placeholder="Enter Your Phonenumber"
              showCount="true"
              maxLength="10"
              autoComplete="true"
              style={{
                border: "none",
                borderBottom: "1px solid black",
                borderRadius: "0px",
                fontFamily: "Barlow",
                fontWeight: 100,
                fontStyle: "normal",
              }}
            />
          </Form.Item>
          <Form.Item
            name="remember"
            valuePropName="checked"
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "40px",
              marginRight: "20px",
            }}
          >
            <Space size={170}>
              <Checkbox
                style={{
                  fontFamily: "Barlow",
                  fontWeight: 400,
                  fontStyle: "normal",
                }}
              >
                Remember me
              </Checkbox>
              {contextHolder}
              <>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    fontFamily: "Barlow",
                    fontWeight: 300,
                    fontStyle: "normal",
                    marginLeft: "40%",
                    backgroundColor: "#7149C6",
                  }}
                  onSubmit={() => openNotification("error")}
                >
                  Submit
                </Button>
              </>
            </Space>
          </Form.Item>
        </Form>
      </Col>
      <Col span={12}>
        <Carousel autoplay speed={100}>
          <div>
            <Image
              width="100%"
              preview={false}
              height="90vh"
              src="https://media.istockphoto.com/id/1305268276/vector/registration-abstract-concept-vector-illustration.jpg?s=612x612&w=0&k=20&c=nfvUbHjcNDVIPdWkaxGx0z0WZaAEuBK9SyG-aIqg2-0="
            />
          </div>
          <div>
            <Image
              width="100%"
              preview={false}
              height="100vh"
              src="https://img.freepik.com/premium-vector/sign-page-abstract-concept-vector-illustration_107173-25670.jpg"
            />
          </div>
          <div>
            <Image
              width="100%"
              preview={false}
              height="100vh"
              src="https://img.freepik.com/premium-vector/business-startup-web-concept-with-character-scene-man-generates-ideas-planning-launches-new-project-people-situation-flat-design-vector-illustration-social-media-marketing-material_9209-12389.jpg?w=2000"
            />
          </div>
          <div>
            <Image
              width="100%"
              preview={false}
              height="100vh"
              src="https://static.vecteezy.com/system/resources/previews/024/100/488/non_2x/account-login-and-password-on-smartphone-and-laptop-screen-data-protection-cyber-security-online-registration-confidentiality-concept-modern-flat-cartoon-style-illustration-vector.jpg"
            />
          </div>
        </Carousel>
      </Col>
    </Row>
  );
};
export default Login;
