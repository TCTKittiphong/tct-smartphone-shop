import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { storage, db } from "../../lib/firebase_config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { v4 } from "uuid";
import Swal from "sweetalert2";
import NavBar from "../Navbar";
import "./style.css";

export const CheckOut = ({ basketData, totalCost, handleEmptyBasket}) => {
  const checkoutRef = collection(db, "/CheckOut");
  const [checkoutName, setCheckoutName] = useState("");
  const [checkoutAD, setCheckoutAD] = useState("");
  const [checkoutTotal, setCheckoutTotal] = useState(totalCost);
  const [checkoutIMG, setCheckoutIMG] = useState(null);
  const [file2upload, setFile2Upload] = useState("");
  const [progress, setProgress] = useState(0);

  function handle() {
    Swal.fire({
      title: "Are you sure upload file?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sure",
    }).then((result) => {
      if (result.isConfirmed) {
        uploadIMG();
      }
    });
  }

  const uploadIMG = () => {
    if (!file2upload) return;
    const pathname = "/IMG/";
    const fileRef = ref(storage, pathname + v4() + file2upload.name);
    const uploadTask = uploadBytesResumable(fileRef, file2upload);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(Math.round(prog));
      },
      (err) => {
        window.alert(err);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((url) => {
            document.getElementById("fileInput").value = "";
            setCheckoutIMG(url);
          })
          .catch((err) => window.alert(err));
      }
    );
  };

  function handleaddCheckout() {
    Swal.fire({
      title: "Order confirmation?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sure",
    }).then((result) => {
      if (result.isConfirmed) {
        Checkout();
        handleEmptyBasket();
        Swal.fire({
          position: "end",
          icon: "success",
          title: "Checkout success",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    });
  }

  const Checkout = (e) => {
    const data = {
      CheckOutName: checkoutName,
      CheckOutAD: checkoutAD,
      ProductPrice: checkoutTotal,
      CheckOutIMG: checkoutIMG,
    };
    addDoc(checkoutRef, data)
      .then(() => {
        setCheckoutName("");
        setCheckoutAD("");
        setCheckoutTotal("");
        setCheckoutIMG("");
      })
      .catch((err) => alert(err));
  };

  return (
    <div className="w3-animate-bottom">
      <NavBar
        basketItems={basketData.total_items}
      />
      <div className="container">
        <h2>CheckOut</h2>
        <hr />
        <label>Name</label>
        <input
          type="text"
          className="form-control"
          required
          onChange={(e) => setCheckoutName(e.target.value)}
          value={checkoutName}
        />
        <br />

        <label>Address</label>
        <input
          type="text"
          className="form-control"
          required
          onChange={(e) => setCheckoutAD(e.target.value)}
          value={checkoutAD}
        />
        <br />

        <label>SubTotal</label>
        <input
          type="text"
          className="form-control"
          placeholder={totalCost}
          value={checkoutTotal}
          disabled
        />
        <br />

        <label>Transfer slip</label>
        <input
          type="file"
          className="form-control"
          id="fileInput"
          required
          onChange={(e) => setFile2Upload(e.target.files[0])}
        />
        <br />
        <button className="btn btn btn-primary" onClick={handle}>
          Upload slip
        </button>
        <div>Progress: {progress}%</div>
        <img src={checkoutIMG} alt="SlipIMG" />
        <br />
        <br />
        <button
          className="btn btn-success btn-md mybtn"
          onClick={handleaddCheckout}
        >
          Check Out
        </button>
      </div>
    </div>
  );
};

export default CheckOut;
