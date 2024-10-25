import React from "react";
import { useLocation } from "react-router-dom";

const ActivationEmailSend = () => {
  const location = useLocation();
  const email = location.state?.email;
  return <div>Account Activation e-mail send your registered: {email} Please activate your account</div>;
};

export default ActivationEmailSend;
