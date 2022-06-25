import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Modal, Button, Form, Input, message } from "antd";
const ItemPage = () => {
  const dispatch = useDispatch();
  const [itemsData, setItemsData] = useState([]);
  const [popupModal, setPopupModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const getAllItems = async () => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      const { data } = await axios.get("https://pos-application-back-new.herokuapp.com/api/review/get");
      setItemsData(data);
      dispatch({ type: "HIDE_LOADING" });
      console.log(data);
    } catch (error) {
      dispatch({ type: "HIDE_LOADING" });
      console.log(error);
    }
  };
  //useEffect
  useEffect(() => {
    getAllItems();
    //eslint-disable-next-line
  }, []);


  // handle form  submit
  const handleSubmit = async (value) => {
   
      try {
        dispatch({
          type: "SHOW_LOADING",
        });
        const res = await axios.post("https://pos-application-back-new.herokuapp.com/api/review/add", value);
        message.success("Review Added Succesfully");
        getAllItems();
        setPopupModal(false);
        dispatch({ type: "HIDE_LOADING" });
      } catch (error) {
        dispatch({ type: "HIDE_LOADING" });
        message.error("Something Went Wrong");
        console.log(error);
      }
    } 
  

  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
       
        <Button type="primary" onClick={() => setPopupModal(true)}>
          Feedback
        </Button>
      </div>

     
      {popupModal && (
        <Modal
          title="Add Feedback"
          visible={popupModal}
          onCancel={() => {
            setEditItem(null);
            setPopupModal(false);
          }}
          footer={false}
        >
          <Form
            layout="vertical"
            initialValues={editItem}
            onFinish={handleSubmit}
          >
           
            <Form.Item name="review" label="Write Feedback">
              <Input />
            </Form.Item>
            

            <div className="d-flex justify-content-end">
              <Button type="primary" htmlType="submit">
                Send
              </Button>
            </div>
          </Form>
        </Modal>
      )}

{itemsData.map(i=>(
    <p style={{margin:"5px",padding:"5px"}}>{i.review}</p>
))} 

    </DefaultLayout>
  );
};

export default ItemPage;
