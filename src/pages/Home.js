import React, { useState, useEffect } from "react";
import DefaultLayout from "./../components/DefaultLayout";
import axios from "axios";
import { Row, Col } from "antd";
import { useDispatch } from "react-redux";
import ItemList from "../components/ItemList";
const Home = () => {
  const [itemsData, setItemsData] = useState([]);
  const [selecedCategory, setSelecedCategory] = useState(2);
  const [categories, setCategory] = useState([]);

  const dispatch = useDispatch();

 
  useEffect(() => {
    const getAllItems = async () => {
      try {
        dispatch({
          type: "SHOW_LOADING",
        });
        const { data } = await axios.get(
          "https://pos-application-back-new.herokuapp.com/api/category/get"
        );
        setCategory(data);
        dispatch({ type: "HIDE_LOADING" });
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllItems();
  }, [dispatch]);

  useEffect(() => {
    const getAllItems = async () => {
      try {
        dispatch({
          type: "SHOW_LOADING",
        });
        const { data } = await axios.get("https://pos-application-back-new.herokuapp.com/api/items/get");
        setItemsData(data);
        dispatch({ type: "HIDE_LOADING" });
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllItems();
  }, [dispatch]);

  
  return (
    <DefaultLayout>
      <div className="d-flex">
        {categories.map((category) => (
          <div
            key={category.id}
            className={`d-flex category ${
              selecedCategory === category.id && "category-active"
            }`}
            onClick={() => setSelecedCategory(category.id)}
          >
            <h4>{category.name}</h4>
         <img
          
           src="https://irp-cdn.multiscreensite.com/ed1743f3/dms3rep/multi/wid-1-2880w.png"
           alt={category.name}
           height="40"
           width="60"
         />
          </div>
        ))}
      </div>
      <Row>
        {itemsData
          .filter((i) => i.caregoryId === selecedCategory)
          .map((item) => (
            <Col xs={24} lg={6} md={12} sm={6}>
              <ItemList key={item.id} item={item} />
            </Col>
          ))}
      </Row>
    </DefaultLayout>
  );
};

export default Home;
