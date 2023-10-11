import React from "react";
import Form from "../../components/shared/Form/Form";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Spinner from "../../components/shared/Spinner";
import { toast } from 'react-hot-toast';
const Register = () => {
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
        <div className="flex justify-center items-center mt-32 ">

            <Form
              formTitle={"Register "}
              submitBtn={"Register"}
              formType={"register"}
            />
         
        </div>
      )}
    </>
  );
};

export default Register;
