import React from "react";
import { useEffect } from "react";
import Form from "../../components/shared/Form/Form";
import { useSelector } from "react-redux";
import Spinner from "./../../components/shared/Spinner";

import { toast } from 'react-hot-toast';
const Login = () => {
  const { loading, error } = useSelector((state) => state.auth);
 

  useEffect(() => {
    if (error) {
      toast.error("Invalid Credentials");
     
    }
  }, [error]);
  return (
    <>
     
      {loading ? (
        <Spinner />
      ) : (
        <div className=" flex justify-center items-center mt-60">
          
          {/* <div className="col-span-1 md:col-span-1 form-container flex justify-center items-center"> */}
            <Form
              formTitle={"Login "}
              submitBtn={"Login"}
              formType={"login"}
            />
          {/* </div> */}
        </div>
      )}
    </>
  );
};

export default Login;
