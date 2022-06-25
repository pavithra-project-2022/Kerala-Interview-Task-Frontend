import React from "react";
import { useNavigate } from "react-router-dom";
import DefaultLayout from "./../components/DefaultLayout";
const MenuPage = () => {
  const navigate = useNavigate();
  return (
    <DefaultLayout>
      <div className="d-flex" >
          <button onClick={()=>navigate('/home')}>Menu</button><br/>
          <p>Today's Special!!</p>
      </div>
    </DefaultLayout>
  );
};

export default MenuPage;
