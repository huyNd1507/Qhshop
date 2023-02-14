import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./auth.module.scss";
import resetImg from "../../assets/forgot.png";
import Card from "../../components/card/Card";
import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../../firebase/config";
import Loader from "../../components/loader/Loader";

const Reset = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsloading] = useState(false);

  const ResetPassword = (e) => {
    e.preventDefault();
    setIsloading(true);

    sendPasswordResetEmail(auth, email)
      .then(() => {
        setIsloading(false);
        toast.success("Vui lòng kiểm tra email của bạn");
      })
      .catch((error) => {
        setIsloading(false);
        toast.error(error.message);
      });
  };

  return (
    <>
      {isLoading && <Loader />}
      <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={resetImg} alt="Reset Password" width="400" />
        </div>

        <Card>
          <div className={styles.form}>
            <h2>Đặt lại mật khẩu</h2>

            <form onSubmit={ResetPassword}>
              <input
                type="text"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <button type="submit" className="--btn --btn-primary --btn-block">
                Đặt lại mật khẩu
              </button>
              <div className={styles.links}>
                <p>
                  <Link to="/login">- Login</Link>
                </p>
                <p>
                  <Link to="/register">- Register</Link>
                </p>
              </div>
            </form>
          </div>
        </Card>
      </section>
    </>
  );
};

export default Reset;
