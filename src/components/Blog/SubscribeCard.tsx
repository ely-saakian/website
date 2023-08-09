import axios from "axios";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SubscribeCard = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const subscribe = () => {
    setLoading(true);
    axios
      .put("/api/mailingList", {
        email,
      })
      .then((result) => {
        if (result.status === 200) {
          toast.success(result.data.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
          setEmail("");
          setLoading(false);
        }
      })
      .catch((err) => {
        toast.error("Something went wrong. Please try again later.", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        setLoading(false);
      });
  };

  return (
    <div className="flex flex-col space-y-5 p-10 mx-auto max-w-[400px]">
      <p className="sm:text-2xl text-xl font-medium dark:text-white text-center">
        Shall I keep you in the loop?
      </p>
      <p className="text-gray-500 dark:text-white text-center">
        Subscribe to get new articles.
      </p>
      <div className="flex flex-col space-y-5">
        <input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
          type="email"
          className="rounded-full dark:bg-transparent dark:text-white outline-none dark:border-white border-gray-200 border-2 py-2 px-4"
          placeholder="Email address"
        />
        <button
          type="button"
          onClick={subscribe}
          className="flex justify-center bg-gray-200 dark:bg-gray-500 py-[10px] px-5 rounded-full transition dark:text-white duration-150 active:scale-95"
        >
          {loading ? (
            <div
              className="animate-spin h-6 w-6 rounded-full border-t-4 border-4 border-gray-400"
              style={{ borderTopColor: "#000000" }}
            ></div>
          ) : (
            "Subscribe"
          )}
        </button>
        <ToastContainer></ToastContainer>
      </div>
    </div>
  );
};

export default SubscribeCard;
