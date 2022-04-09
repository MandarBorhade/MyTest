import React , {useState} from "react";
import "./style.css";
import Modal from 'react-modal';
import { v4 as uuid } from 'uuid';



export default function App() {

  const [userDetails , setUserDetails] = useState([]);
  const [name , setName] = useState();
  const [amount , setAmount] = useState(0);
  const [showAmountModal , setShowAmountModal] = useState(false);


  const handleNameChange = (e) => {
    setName(e.target.value);
  }

  const handleNameSubmit = (e , uid) => {
    e.preventDefault();
     const userId = uuid();
    const newUser = {id:userId , userName:name , userAmount:amount};
    setUserDetails([...userDetails , newUser]);
    setName('');
  }

  const updateAmount = (uid) => {
    userDetails.map((currentElement) => {
      currentElement.id === uid ? currentElement.userAmount = Number(currentElement.userAmount) + Number(amount) : currentElement.userAmount=0;
    })
  }

  const renderUserDetails = userDetails.map((item) => (
    <>
      <span>{item.userName}  :  </span>
      <span>{item.userAmount}  </span>
      <button onClick={() => setShowAmountModal(true)}>Add amount</button>
      <Modal isOpen={showAmountModal}>
        <form>
          <label>Enter Amount</label>
          <input value={amount} type="number" onChange={(e) => setAmount(e.target.value)} />
          <button onClick={(e) => {
            e.preventDefault(); 
            updateAmount(item.id);
            setShowAmountModal(false)
            setAmount('')}}>Submit Amount</button>
        </form>
        <br/>
        <button onClick={() => setShowAmountModal(false)}>Close</button>
      </Modal>
    </>
  ));

  console.log(userDetails);

  return (
    <div>
      <form onSubmit={handleNameSubmit}>
          <div>
            <p>Add a friend</p>
            <input value={name} type="text" onChange={handleNameChange}/>
          </div>
          <button type='submit'>Submit</button>
      </form>
      <div>{renderUserDetails}</div>
    </div>
  );
}
