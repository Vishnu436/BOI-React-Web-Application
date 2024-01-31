import React, {useState, useEffect} from "react";
import { Col, Row, Space, Table, Card, Typography,Spin, Button } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import '../components/Dashboard.css'
import { useNavigate } from "react-router-dom";
import { EditOutlined } from "@ant-design/icons";
import API from "../utilities/api";


const Dashboard = () => {
  const { Title } = Typography;
  const [data, setData] = useState([]);
  const [cardData, setCardData] = useState([])
  const [isLoading,setLoading] = useState(true)
  const navigate = useNavigate();
  
  
  useEffect(() => {
    const fetchData = async() => {
      try {
           await API.fetchAPI('/customer/api/v1/loadPendingApplications' , {}).then(response => {
            setData(response.responseBody); 
            setLoading(false);
          }).catch();
      } catch (error) {
        console.error('Error occurred', error);
      }
    };
 
    fetchData();
  }, []);

  const Status = (recordStatus) => {
     switch(recordStatus){
        case 0:
         return 'danger'
        case 1:
          return 'secondary'
        case 2:
          return 'success'
        default:
          return ''
     }
    
  }
 
  useEffect(() => {
    const fetchCardData = async () => {
      try {
          API.fetchAPI('/customer/api/v1/getCustomerApplications', {}).then(response =>{
            setCardData(response.responseBody)
            console.log(cardData)
          });
      } catch (error) {
        console.error('Error occurred', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCardData();
  }, []);

  if (isLoading) {
    return (
      <>
         <Spin
           indicator={
          <LoadingOutlined
            style={{
              fontSize: 40,
              marginLeft:'600px',
              marginTop:'200px'
            }}
            spin
          />
         }
          />
      </>
    );
  }
  const handleEdit = (record) =>{
    setData(record);
    navigate('/main/applications',{state:{record}})
  }

  const columns = [
    
    {
      title: 'Date and Time',
      dataIndex: 'Customer_Apllication_Date',
      key: 'Customer_Apllication_Date',
      width: '20%',
    }, 
    
    {
      title: 'Application id',
      dataIndex: "Cus_Appli_Id",
      key: "Cus_Appli_Id",
      width:'40%',
      
    },
    {
      title: 'Account type',
      key: "Customer_Account_Type",
      render: (_, record) => (
        <Space size="middle">
          <p type={Status(record.Customer_Account_Type)}> {record.Customer_Account_Type === 1? <p> Savings Account </p> : <p> Current Account</p>}</p>
        </Space>
      ),
      width :'15%'
    },
    {
      title: 'Status',
      render: (_, record) => (
        <Space size="middle">
          <Button type={Status(record.Appli_Status)} >{ record.Appli_Status === 2 ? <Button style={{backgroundColor:'#79F1A8'}}  > Approve</Button> : (record.Appli_Status === 0 ? <Button style={{backgroundColor:'#ED9B9B'}} > Reject </Button> :<Button style={{backgroundColor:'#53EEEE'}} > Pending </Button>)}
           </Button>
        </Space>
      ),
      key: "Appli_Status",
      width:"15%",
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={(index) => handleEdit(record)}> <EditOutlined />
           </Button>
        </Space>
      ),
      width:'10%'
    },
    
  ];

  return (
    <div>
    <Title style={{fontWeight:600,fontStyle:'normal'}}> Dashboard </Title>
      <Row gutter={20} style={{marginTop:'35px'}} >
        <Col span={18}>
          <Row gutter={[16,24]} >
            <Col span={8}>
              <Card style={{backgroundColor:'#00e600'}} className="cards" bordered={false} >
                <Title level={2} className="cardinfo"> Approved : {cardData?.Approved ? cardData?.Approved : 0}  </Title>
              </Card>
            </Col>
            <Col span={8}>
              <Card style={{backgroundColor:'#ffd4d4'}} className="cards"  bordered={false}>
                <Title level={2} className="cardinfo">  Rejected : {cardData?.Rejected ? cardData?.Rejected : 0} </Title>
              </Card>
            </Col>
            <Col span={8}>
              <Card style={{backgroundColor:'#EEE872'}} className="cards"  bordered={false}>
                <Title level={2} className="cardinfo"> Pending: {cardData?.Pending ? cardData?.Pending : 0} </Title>       
              </Card>
            </Col>
            <Col span={24} style={{padding:'20px'}}>
            <Table scroll={{y: 275}} columns={columns} dataSource={data || []} />
            </Col>
          </Row>
        </Col>
        <Col span={6} className="notifications">
            <Title level={5}> Notifications </Title>
        </Col>
      </Row>
    
    </div>
  );
};
export default Dashboard;
