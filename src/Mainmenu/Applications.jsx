import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Form,
  Input,
  Typography,
  Row,
  Col,
  Select,
  Image,
  Spin,
  Space,
  Modal,
} from "antd";

import { LoadingOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { useWatch } from "antd/es/form/Form";
import API from "../utilities/api";

import {
  RotateLeftOutlined,
  RotateRightOutlined,
  SwapOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from "@ant-design/icons";

const Application = () => {
  const [form] = Form.useForm();
  const { state } = useLocation();
  const [isLoading, setLoading] = useState(true);
  // const [data, setData] = useState({});
  const [approve, setapprove] = useState(false);
  const [reject, setreject] = useState(false);
  const [submittable, setSubmittable] = useState(false);
  const values = useWatch([], form);

  const navigate = useNavigate();
  const [initialValues, setinitialValues] = useState({});


  // useEffect(() => {
  //   setTimeout(() => {
  //     
  //   }, 300);
  // }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const obj = {
        Cus_Appli_Id: state.record.Cus_Appli_Id,
        Appli_Status: state.record.Appli_Status,
      };

       API.fetchAPI("/customer/api/v1/loadApplication", obj)
        .then((response) => {
          // setData(response.responseBody);
          setLoading(false);
          const responseBody = response.responseBody;
          console.log(responseBody);
          setinitialValues({
            FullName: responseBody.CustomerPersonalDetails.FullName,
            Gender: responseBody.CustomerPersonalDetails.Gender,
            Cus_City: responseBody.CustomerPersonalDetails.Cus_City,
            Cus_Country: responseBody.CustomerPersonalDetails.Cus_Country,
            Cus_Marital_Status:
              responseBody.CustomerPersonalDetails.Cus_Marital_Status,
            Cus_PostalCode: responseBody.CustomerPersonalDetails.Cus_PostalCode,
            Cus_Address_LandMark:
              responseBody.CustomerPersonalDetails.Cus_Address_LandMark,
            Cus_Address: responseBody.CustomerPersonalDetails.Cus_Address,
            Cus_State: responseBody.CustomerPersonalDetails.Cus_State,
            Occupation: responseBody.CustomerPersonalDetails.Occupation,
            Cus_Id_Number: responseBody.CustomerIdentityDetails.Cus_Id_Number,
            Cus_Preferred_Language:
              responseBody.CustomerPersonalDetails.Cus_Preferred_Language,
            DOB: responseBody.CustomerPersonalDetails.DOB,
            Emergency_Contact:
              responseBody.CustomerPersonalDetails.Emergency_Contact,
            Nationality: responseBody.CustomerPersonalDetails.Nationality,
            Cus_Address_Proof: responseBody.CustomerKYCDetails.Cus_Address_Proof,
            Cus_Id_Proof: responseBody.CustomerKYCDetails.Cus_Id_Proof,
            Cus_SourceOfIncome:
              responseBody.CustomerEmploymentDetails.Cus_SourceOfIncome,
            Cust_Account_Type:
              responseBody.CustomerAccountdetails.Cust_Account_Type,
            Cust_Initial_Deposit_Amount:
              responseBody.CustomerAccountdetails.Cust_Initial_Deposit_Amount,
            Cust_Nominee_Details:
              responseBody.CustomerAccountdetails.Cust_Nominee_Details,
            Cust_Nominee_Relation:
              responseBody.CustomerAccountdetails.Cust_Nominee_Relation,
            Cus_Annual_Income:
              responseBody.CustomerEmploymentDetails.Cus_Annual_Income,
            Cus_Employer_Name:
              responseBody.CustomerEmploymentDetails.Cus_Employer_Name,
            Cus_Employment_Status:
              responseBody.CustomerEmploymentDetails.Cus_Employment_Status,
            Cus_Tax_Identification_Number:
              responseBody.CustomerEmploymentDetails
                .Cus_Tax_Identification_Number,
            Cus_Id_ExpiryDate:
              responseBody.CustomerIdentityDetails.Cus_Id_ExpiryDate,
            Cus_Id_Type: responseBody.CustomerIdentityDetails.Cus_Id_Type,
            Cus_Photo_Proof: responseBody.CustomerKYCDetails.Cus_Photo_Proof,
            Cus_Signature: responseBody.CustomerKYCDetails.Cus_Signature,
          });
          
        })
        .catch();
    } catch (error) {
      console.error("Error occurred", error);
    }
  };

 

  useEffect(() => {
    form
      .validateFields({
        ApplicationForm: true,
      })
      .then(
        () => {
          setSubmittable(true);
        },
        () => {
          setSubmittable(false);
        }
      );
  }, [values]);

 

  if (isLoading) {
    return (
      <>
        <Spin
          indicator={
            <LoadingOutlined
              style={{
                fontSize: 40,
                marginLeft: "600px",
                marginTop: "200px",
              }}
              spin
            />
          }
        />
      </>
    );
  }

  const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
  };
  const { Option } = Select;

  const onFinish = (values) => {
    // fetchDataValidation(values);
  };

  async function SubmitForm(key) {
    try {
      const obj = {
        Cus_Appli_Id: state.record.Cus_Appli_Id,
        Appli_Status: key === "Approve" ? 2 : 0,
        Is_Customer: key === "Approve" ? true : false,
        Approved_By: 'saikumar@admin.com',
        remarks: values.remarks,
      };
      API.fetchAPI(
        "/customer/api/v1/updateApplicationStatus",
        obj
      ).then(response =>{console.log(response)});
    } catch (error) {
      console.error("Error occurred", error);
    }
  }
  const { Title } = Typography;

  const FormFields = [
    {
      label: "Personal Details",
      disabled: false,
      type: "heading",
    },
    {
      label: "Full Name",
      name: "FullName",
      rules: [
        {
          required: true,
          message: "Full Name not Entered!",
        }
      ],
      placeholder: "Enter Your Full Name",
      disabled: true,
      type: "text",
    },
    {
      label: "Gender",
      name: "Gender",
      rules: [
        {
          required: true,
          message: "Gender has not choosed!",
        },
      ],
      placeholder: "Choose your Gender",
      disabled: true,
      type: "dropdown",
      options: [
        { label: "Male", value: "0" },
        { label: "Female", value: "1" },
        { label: "Others", value: "2" },
      ],
    },
    {
      label: "Marital Status",
      name: "Cus_Marital_Status",
      rules: [
        {
          required: true,
          message: "Please choose your Marital_Status!",
        },
      ],
      placeholder: "Choose your Marital Status",
      disabled: true,
      type: "dropdown",
      options: [
        {label: 'Select a value', value: 'NA'},
        { label: "Single", value: "0" },
        { label: "Married", value: "1" },
        { label: "Divorced", value: "2" },
      ],
    },
    {
      label: "Country of Citizenship",
      name: "Cus_Country",
      rules: [
        {
          required: true,
          message: "Invaid Country!",
        },
      ],
      
      disabled: true,
      type: "dropdown",
      options: [
        {label: 'Select a value', value: 'NA'},
        { label: "India", value: "0" },
        { label: "Vietnam", value: "1" },
        { label: "Others", value: "2" },
      ],
    },
    {
      label: "Residential Address",
      name: "Cus_Address",
      rules: [
        {
          required: true,
          message: "Please input your Address!",
        },
      ],
      placeholder: "Enter Your Address",
      disabled: true,
      type: "text",
    },
    {
      label: "Landmark",
      name: "Cus_Address_LandMark",
      rules: [
        {
          required: true,
          message: "Please input your LandMark!",
        },
      ],
      placeholder: "Enter Your Landmark",
      disabled: true,
      type: "text",
    },
    {
      label: "City",
      name: "Cus_City",
      rules: [
        {
          required: true,
          message: "Please input your City!",
        },
      ],
      placeholder: "Enter Your City",
      disabled: true,
      type: "text",
    },
    {
      label: "Postal Code",
      name: "Cus_PostalCode",
      rules: [
        {
          required: true,
          message: "Please input your PostalCode!",
        },
      ],
      placeholder: "Enter Your PostalCode",
      disabled: true,
      type: "text",
    },
    {
      label: "State",
      name: "Cus_State",
      rules: [
        {
          required: true,
          message: "Invaid State!",
        },
      ],
      
      disabled: true,
      type: "dropdown",
      options: [
        {label: 'Select a value', value: 'NA'},
        { label: "Andhra Pradesh", value: "0" },
        { label: "Telangana", value: "1" },
        { label: "Others", value: "2" },
      ],
    },
    {
      label: "Occupation",
      name: "Occupation",
      rules: [
        {
          required: true,
          message: "Please choose your Occupation!",
        },
      ],
      placeholder: "Enter Your Occupation",
      disabled: true,
      type: "text",
    },
    {
      label: "Emergency Contact",
      name: "Emergency_Contact",
      rules: [
        {
          required: true,
          message: "Please input your Phone number!",
        },
        {
          message: "Only numbers were allowed in Phone number",
        },
      ],
      placeholder: "Enter Your Phone number",
      disabled: true,
      type: "text",
    },
    // {
    //   label: "Preferred Language",
    //   name: "Cus_Preferred_Language",
    //   rules: [
    //     {
    //       required: true,
    //       message: "Please Enter Your Language!",
    //     },
    //   ],
    //   placeholder: "Enter Your Language",
    //   disabled: true,
    //   type: "text",
    // },

    {
      label: "Date of Birth",
      name: "DOB",
      rules: [
        {
          required: true,
          message: "Enter your Date of Birth!",
        },
      ],
      placeholder: "Enter your Date of Birth",
      disabled: true,
      type: "text",
    },
    {
      label: "Nationality",
      name: "Nationality",
      rules: [
        {
          required: true,
          message: "Please Enter Your Nationality!",
        },
      ],
      placeholder: "Enter Your Nationality",
      disabled: true,
      type: "text",
    },
    {
      label: "Account Details",
      disabled: false,
      type: "heading",
    },
    {
      label: "Account Type",
      name: "Cust_Account_Type",
      rules: [
        {
          required: true,
          message: "Invalid Account Type!",
        },
      ],
      
      disabled: true,
      type: "dropdown",
      options: [
        {label: 'Select a value', value: 'NA'},
        { label: "Savings Account", value: "0" },
        { label: "Current Account", value: "1" },
      ],
    },
    // {
    //   label: "Initial Deposit Amount",
    //   name: "Cust_Initial_Deposit_Amount",
    //   rules: [
    //     {
    //       required: true,
    //       message: "Enter your deposit Amount!",
    //     },
    //   ],
    //   placeholder: "Enter your deposit Amount",
    //   disabled: true,
    //   type: "text",
    // },
    {
      label: "Nominee Details",
      name: "Cust_Nominee_Details",
      rules: [
        {
          required: true,
          message: "Enter your Nominee Details!",
        },
      ],
      placeholder: "Enter your Nominee Details",
      disabled: true,
      type: "text",
    },
    {
      label: "Nominee Relation",
      name: "Cust_Nominee_Relation",
      rules: [
        {
          required: true,
          message: "Enter your Nominee Relation!",
        },
      ],
      placeholder: "Enter your Nominee Relation",
      disabled: true,
      type: "text",
    },
    {
      label: "Employment Details",
      disabled: false,
      type: "heading",
    },
    {
      label: "Cus Annual Income",
      name: "Cus_Annual_Income",
      rules: [
        {
          required: true,
          message: "Enter Annual Income!",
        },
      ],
      placeholder: "Enter Annual Income",
      disabled: true,
      type: "text",
    },
    {
      label: "Employer Name",
      name: "Cus_Employer_Name",
      rules: [
        {
          required: true,
          message: "Enter Employer Name!",
        },
      ],
      placeholder: "Enter Employer Name",
      disabled: true,
      type: "text",
    },
    {
      label: "Employment Status",
      name: "Cus_Employment_Status",
      rules: [
        {
          required: true,
          message: "Invalid Employ Status!",
        },
      ],
      
      disabled: true,
      type: "dropdown",
      options: [
        {label: 'Select a value', value: 'NA'},
        {label: 'Active', value: '0'},
        {label: 'Inactive', value: '1'},
      ],
    },
    {
      label: "Source of Funds or Income",
      name: "Cus_SourceOfIncome",
      rules: [
        {
          required: true,
          message: "Please Enter Your Language!",
        },
      ],
      placeholder: "Enter Your Income ",
      disabled: true,
      type: "text",
    },
    {
      label: "Tax ID number",
      name: "Cus_Tax_Identification_Number",
      rules: [
        {
          required: true,
          message: "Enter your Tax ID number!",
        },
      ],
      placeholder: "Enter your Tax ID number",
      disabled: true,
      type: "text",
    },
    {
      label: "Identity Details",
      disabled: false,
      type: "heading",
    },
    {
      label: "ID Expiry Date",
      name: "Cus_Id_ExpiryDate",
      rules: [
        {
          required: true,
          message: "Enter your ID Expiry Date!",
        },
      ],
      placeholder: "Enter your ID Expiry Date",
      disabled: true,
      type: "text",
    },
    {
      label: "ID Type",
      name: "Cus_Id_Type",
      rules: [
        {
          required: true,
          message: "Invalid Employ Status!",
        },
      ],
      disabled: true,
      type: "dropdown",
      options: [
        {label: 'Select a value', value: 'NA'},
        {label: 'Passport', value: '0'},
        {label: 'Drivers License', value: '1'},
        {label: 'Social Security Number', value: '2'},
      ],
    },

    {
      label: "Contact information",
      name: "Cus_Id_Number",
      rules: [
        {
          required: true,
          message: "Please input your Contact information!",
        },
      ],
      placeholder: "Enter Your Contact information",
      disabled: true,
      type: "text",
    },
    {
      label: "KYC Details",
      disabled: false,
      type: "heading",
    },
  ];

  console.log('data:image/jpeg;base64,' + initialValues.Cus_Address_Proof.slice(9,))

  return (
    <>
      <Title
        style={{fontWeight: 600, fontStyle: "normal" }}
      >
        Applications
      </Title>
      <Form
        {...layout}
        name="ApplicationForm"
        onFinish={onFinish}
        style={{ marginTop: "50px" }}
        // ref={data}
        form={form}
        initialValues={initialValues}
      >
        <Row gutter={[16, 8]}>
          {FormFields.map((item, index) =>
            item.type === "text" ? (
              <Col span={6} key={index + 1}>
                <Form.Item
                  label={item.label}
                  name={item.name}
                  rules={item.rules}

                >
                  <Input
                    placeholder={item.placeholder}
                    disabled={item.disabled}
                    style={{ color: "#000000" }}
                  />
                </Form.Item>
              </Col>
            ) : item.type === "dropdown" ? (
              <Col span={6}>
                <Form.Item
                  label={item.label}
                  name={item.name}
                  rules={item.rules}
                >
                  <Select
                    placeholder={item.placeholder}
                    disabled={item.disabled}
                    style={{ color: "#000000" }}
                  >
                    {item.options.map((option) => (
                      <Option value={option.value}> {option.label} </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            ) : (
              <Col span={24}>
                <Form.Item>
                  <Title
                    style={{
                      fontSize: "28px",
                      margin: "0px",
                      textDecoration: "underlined",
                    }}
                  >
                    {item.label}
                  </Title>
                </Form.Item>
              </Col>
            )
          )}

          <Col span={8}>
            <Form.Item
              label="Address Proof"
              valuePropName="fileList"
              required="true"
            >
              {initialValues.Cus_Address_Proof && (
                <Image
                  width={100}
                  src={`${'data:image/jpeg;base64,' + initialValues.Cus_Address_Proof.slice(9,)}`}
                  preview={{
                    toolbarRender: (
                      _,
                      {
                        transform: { scale },
                        actions: {
                          onFlipY,
                          onFlipX,
                          onRotateLeft,
                          onRotateRight,
                          onZoomOut,
                          onZoomIn,
                        },
                      }
                    ) => (
                      <Space size={12} className="toolbar-wrapper">
                        <SwapOutlined rotate={90} onClick={onFlipY} />
                        <SwapOutlined onClick={onFlipX} />
                        <RotateLeftOutlined onClick={onRotateLeft} />
                        <RotateRightOutlined onClick={onRotateRight} />
                        <ZoomOutOutlined
                          disabled={scale === 1}
                          onClick={onZoomOut}
                        />
                        <ZoomInOutlined
                          disabled={scale === 50}
                          onClick={onZoomIn}
                        />
                      </Space>
                    ),
                  }}
                />
              )}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Id Proof"
              valuePropName="fileList"
              required="true"
            >
              {initialValues.Cus_Id_Proof && (
                <Image
                  width={100}
                  src={`${'data:image/jpeg;base64,' + initialValues.Cus_Id_Proof.slice(9,)}`}
                  preview={{
                    toolbarRender: (
                      _,
                      {
                        transform: { scale },
                        actions: {
                          onFlipY,
                          onFlipX,
                          onRotateLeft,
                          onRotateRight,
                          onZoomOut,
                          onZoomIn,
                        },
                      }
                    ) => (
                      <Space size={12} className="toolbar-wrapper">
                        <SwapOutlined rotate={90} onClick={onFlipY} />
                        <SwapOutlined onClick={onFlipX} />
                        <RotateLeftOutlined onClick={onRotateLeft} />
                        <RotateRightOutlined onClick={onRotateRight} />
                        <ZoomOutOutlined
                          disabled={scale === 1}
                          onClick={onZoomOut}
                        />
                        <ZoomInOutlined
                          disabled={scale === 50}
                          onClick={onZoomIn}
                        />
                      </Space>
                    ),
                  }}
                />
              )}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Photo Proof"
              valuePropName="fileList"
              required="true"
            >
              {initialValues.Cus_Photo_Proof && (
                <Image
                  width={200}
                  src={`${initialValues.Cus_Photo_Proof}`}
                  preview={{
                    toolbarRender: (
                      _,
                      {
                        transform: { scale },
                        actions: {
                          onFlipY,
                          onFlipX,
                          onRotateLeft,
                          onRotateRight,
                          onZoomOut,
                          onZoomIn,
                        },
                      }
                    ) => (
                      <Space size={12} className="toolbar-wrapper">
                        <SwapOutlined rotate={90} onClick={onFlipY} />
                        <SwapOutlined onClick={onFlipX} />
                        <RotateLeftOutlined onClick={onRotateLeft} />
                        <RotateRightOutlined onClick={onRotateRight} />
                        <ZoomOutOutlined
                          disabled={scale === 1}
                          onClick={onZoomOut}
                        />
                        <ZoomInOutlined
                          disabled={scale === 50}
                          onClick={onZoomIn}
                        />
                      </Space>
                    ),
                  }}
                />
              )}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Signature"
              valuePropName="fileList"
              required="true"
            >
              {initialValues.Cus_Signature && (
                <Image
                  width={100}
                  src={`${'data:image/jpeg;base64,' + initialValues.Cus_Signature.slice(9,)}`}
                  preview={{
                    toolbarRender: (
                      _,
                      {
                        transform: { scale },
                        actions: {
                          onFlipY,
                          onFlipX,
                          onRotateLeft,
                          onRotateRight,
                          onZoomOut,
                          onZoomIn,
                        },
                      }
                    ) => (
                      <Space size={12} className="toolbar-wrapper">
                        <SwapOutlined rotate={90} onClick={onFlipY} />
                        <SwapOutlined onClick={onFlipX} />
                        <RotateLeftOutlined onClick={onRotateLeft} />
                        <RotateRightOutlined onClick={onRotateRight} />
                        <ZoomOutOutlined
                          disabled={scale === 1}
                          onClick={onZoomOut}
                        />
                        <ZoomInOutlined
                          disabled={scale === 50}
                          onClick={onZoomIn}
                        />
                      </Space>
                    ),
                  }}
                />
              )}
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label={"Remarks"}
              name={"remarks"}
              rules={[
                {
                  required: true,
                  message: "Remarks",
                },
                {
                  pattern: /^[a-zA-Z]+$/,
                  message: "Enter Remarks",
                },
              ]}
            >
              <Input.TextArea
                placeholder={"Remarks"}
                disabled={false}
                autoSize={{ minRows: 6, maxRows: 6 }}
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item>
              <div style={{display:'flex', justifyContent:'space-between'}}>
                <Button
                    type="primary"
                    htmlType="button"
                    style={{ background: "blue" }}
                    onClick={() =>{navigate("/main/dashboard")}}
                    > Back 
                 </Button>

                  <Space size={30}>
                    <Button
                      type="primary"
                      htmlType="button"
                      style={{ background: "red" }}
                      onClick={() => [SubmitForm("Reject"), setreject(true)]}
                    >
                      Reject
                    </Button>
                    <Modal
                      title="Rejected"
                      centered
                      open={reject}
                      onOk={() => {
                        navigate("/main/dashboard");
                      }}
                      onCancel={() => setreject(false)}
                    >
                      <p>
                        Form is Rejected, Please go to dashboard.
                      </p>
                    </Modal>

                    <Button
                      type="primary"
                      htmlType="button"
                      style={{ backgroundColor: "#7149C6" }}
                      disabled={!submittable}
                      onClick={() => [SubmitForm("Approve"), setapprove(true)]}
                    >
                      Approve
                    </Button>
                    <Modal
                      title="Approved"
                      centered
                      open={approve}
                      onOk={() => {
                        navigate("/main/dashboard");
                      }}
                      onCancel={() => setapprove(false)}
                    >
                      <p> Form is Approved, Please navigate to Dashboard </p>
                    </Modal>
                  </Space>
                </div>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Application;
