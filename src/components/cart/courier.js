import React, { useState,useEffect } from 'react';
import styles from '../dialogbox/dialogbox.module.css';


const CourierDialogBox = ({ isOpen, onClose, message,setCourierDetails,courierDetails }) => {
  const [phoneNumber, setPhoneNumber] = useState(courierDetails.phoneNumber);
  const [deliveryAddress, setDeliveryAddress] = useState(courierDetails.deliveryAddress);
  const [error,SetError] = useState(null);

  useEffect(()=>{
   setPhoneNumber(courierDetails.phoneNumber);
    setDeliveryAddress(courierDetails.deliveryAddress);
    SetError(null);
   },[courierDetails]);

  const handleConfirm = () => {
    if (error) {
      return;
    }
    else{
    // Pass phone and address to the parent
    setCourierDetails({
        phoneNumber: phoneNumber,
        deliveryAddress: deliveryAddress,
      });
    onClose(true);
    }
  };

  useEffect(()=>{
    if(phoneNumber=="" ||deliveryAddress ==""){
        SetError("INPUT FIELDS CAN'T BE EMPTY");
    }
    else{
        SetError(null);
    }
    },[phoneNumber,deliveryAddress]);

  const handleCancel = () => {
    onClose(false);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.box}>
        <p>{message}</p>
        <small className={styles}>Please enter your phone number</small>
        <input
          type="tel"
          placeholder="Enter your phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className={styles.input}
        />
         <small className={styles}>Please enter the delivery Address</small>
        <input
          type="text"
          placeholder="Enter your delivery address"
          value={deliveryAddress}
          onChange={(e) => setDeliveryAddress(e.target.value)}
          className={styles.input}
        />
        
        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={handleConfirm}>Confirm</button>
          <button className={styles.button} onClick={handleCancel}>Cancel</button>
        </div>
      </div>
      {error && <small>{error}</small>}
    </div>
  );
};

export default CourierDialogBox;