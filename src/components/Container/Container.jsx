import React, { useEffect, useState } from 'react';
import FormContainer from "../FormContainer/FormContainer";
import DataTable1 from "../DataTable1/DataTable1";
import { useSelector } from 'react-redux';
import axios from "axios";
import { serverUrl } from '../helpers/Constants';

const Container = () => {
  const [data, setData] = useState([]);
  const [reload, setReload] = useState(false);
  const { token } = useSelector(state => state.auth);

  const updateReloadState = () => {
    setReload(true);
  };

  const fetchTableData = async () => {
    try {
      const response = await axios.get(`${serverUrl}/getallurl`, {
        params: {},
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setData(response.data);
      console.log( "printing the response data",response.data)
      console.log("printing the data" , data)
      setReload(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchTableData();
  }, [reload, token]); // Include 'token' in the dependency array to trigger fetchTableData when token changes.

  return (
    <div>
      <FormContainer updateReloadState={updateReloadState} />
      <DataTable1 items={data}  />
      
    </div>
  );
};

export default Container;
