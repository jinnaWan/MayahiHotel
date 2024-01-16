import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Featured = () => {
  const [newData, setNewData] = useState([]);
  const [newprompt, setNewprompt] = useState(0);
  const [newcash, setNewcash] = useState(0);
  const [newcredit, setNewcredit] = useState(0);

  useEffect(() => {
    async function fetchMethodPercentage() {
      try {
        const { data } = await axios.get("/transactions/getMethodPercentage");
        setNewData(data);
        // console.log(data);
      } catch (error) {
        console.error("Error fetching method percentage:", error);
      }
    }
    fetchMethodPercentage();
  }, []);

  useEffect(() => {
    if (newData.length > 0) {
      for (var i = 0; i < newData[0].paymentMethods.length; i++) {
        const paymentMethod = newData[0].paymentMethods[i].paymentMethod[0];
        const percentage = newData[0].paymentMethods[i].percentage.toFixed(2);

        if (paymentMethod === "Cash") {
          setNewcash(percentage);
        } else if (paymentMethod === "PromptPay") {
          setNewprompt(percentage);
        } else if (paymentMethod === "Credit-Card") {
          setNewcredit(percentage);
        }
      }
    }
  }, [newData]);

  return (
    <div className="featured">
      <div className="top" >
        <h1 className="title">Most popular payment method</h1>
        <MoreVertIcon fontSize="small" />
      </div>

      <div className="method">
        <div class="blodtitle">Method</div>

        {newData.length > 0 && (
          <>
            <div className="promptpay" style={{ marginTop: "20px" }}>
              <div class="methodtitle">PromptPay</div>
              <div className="progress-bar">
                <div className="progress" style={{ width: `${newprompt}%` }}>
                  {newprompt}%
                </div>
              </div>
            </div>

            <div className="credit-card"style={{ marginTop: "20px" }}>
              <div className="methodtitle">Credit-Card</div>
              <div className="progress-bar">
                <div className="progress" style={{ width: `${newcredit}%` }}>
                  {newcredit}%
                </div>
              </div>
            </div>

            <div className="cash" style={{ marginTop: "20px" }}>
              <div className="methodtitle">Cash</div>
              <div className="progress-bar">
                <div className="progress" style={{ width: `${newcash}%` }}>
                  {newcash}%
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Featured;
