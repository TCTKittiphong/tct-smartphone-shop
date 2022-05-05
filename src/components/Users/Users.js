import React from "react";
import Card from "react-bootstrap/Card";
import styled from "styled-components";
import Swal from 'sweetalert2'

const Img = styled.img`
  width: 100%;
  height : 100%;
  margin : 2%;
`;

export const Users = (props) => {
  const user = props.user;

  function handleClose (props) {
    Swal.fire({
    title: 'Are you sure?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'OK'
  }).then((result) => {
    if (result.isConfirmed){
      props.logout();}
  })}
  
  return (
    <div>
      {user ? (
        <div>
          <div className="w3-container w3-center w3-animate-bottom">
           <Card style={{ width: "30rem" }}>
               <Card.Img variant="bottom" src={user.photoURL} alt="User IMG" />
               <Card.Body>
                 <Card.Title>{user.displayName}</Card.Title>
                 <Card.Text>You email : {user.email}</Card.Text>

                <button className="btn btn-sm btn-warning" onClick={() => handleClose(props)}>
                  Logout
                </button>
                </Card.Body>
           </Card>
        </div>
      </div>
      ) : (
        <div className="w3-container w3-center w3-animate-bottom">
        <div>
          <Img src="https://media.discordapp.net/attachments/878638511463473172/966267483210252318/unknown.png" alt="Logo IMG"/>
          <h3 className="text-secondary">
            You are not login. Please login first
          </h3>
          <button className="btn btn-sm btn-success" onClick={props.login}>
            Login
          </button>
        </div>
        </div>
      )}
    </div>
  );
};

