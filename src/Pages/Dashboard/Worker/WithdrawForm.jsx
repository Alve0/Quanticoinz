import React, { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../Provider/useAxiosSecure";
import { AuthContext } from "../../../Provider/AuthProvider";
import { toast } from "react-toastify";

const WithdrawForm = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [coin, setCoin] = useState(0);
  const [withdrawCoin, setWithdrawCoin] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [paymentSystem, setPaymentSystem] = useState("Bkash");
  const [accountNumber, setAccountNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch user's coin balance
  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const res = await axiosSecure.get(`/users/${user.email}`);
        setCoin(res.data.coin);
      } catch (err) {
        console.error("Error fetching coin balance:", err);
        toast.error("Failed to fetch coin balance");
      }
    };
    if (user?.email) fetchCoin();
  }, [user, axiosSecure]);

  // Update withdrawal amount (20 coins = $1)
  useEffect(() => {
    const coinVal = parseInt(withdrawCoin);
    if (!isNaN(coinVal)) {
      setWithdrawAmount((coinVal / 20).toFixed(2));
    } else {
      setWithdrawAmount(0);
    }
  }, [withdrawCoin]);

  // Allow user to type any number, validate later
  const handleWithdrawCoinChange = (e) => {
    const value = e.target.value;
    setWithdrawCoin(value);

    const coinVal = parseInt(value);
    if (value === "") {
      setWithdrawAmount(0);
      setError(null);
    } else if (!/^\d+$/.test(value)) {
      setWithdrawAmount(0);
      setError("Please enter a valid number");
    } else {
      setWithdrawAmount((coinVal / 20).toFixed(2));
      setError(null);
    }
  };

  // Account number change
  const handleAccountNumberChange = (e) => {
    const value = e.target.value;
    setAccountNumber(value);
  };

  // Submit withdrawal request
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const coinVal = parseInt(withdrawCoin);

    // Input validations
    if (isNaN(coinVal)) {
      setError("Please enter a valid number of coins");
      return;
    }

    if (coinVal < 20) {
      setError("Minimum withdrawal is 20 coins");
      return;
    }

    if (coinVal > coin) {
      setError("Cannot withdraw more than available coins");
      return;
    }

    if (!accountNumber) {
      setError("Please enter your account number");
      return;
    }

    if (paymentSystem === "Bank" && !/^\d{10,16}$/.test(accountNumber)) {
      setError("Bank account number must be 10-16 digits");
      return;
    }

    setIsLoading(true);

    const data = {
      worker_email: user.email,
      worker_name: user.displayName || "Unknown",
      withdrawal_coin: coinVal,
      withdrawal_amount: parseFloat(withdrawAmount),
      payment_system: paymentSystem,
      account_number: accountNumber,
    };

    try {
      await axiosSecure.post("/withdrawals", data);
      toast.success("Withdrawal request submitted!");
      setWithdrawCoin("");
      setWithdrawAmount(0);
      setAccountNumber("");
      setCoin((prev) => prev - coinVal);
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to withdraw";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 shadow rounded-lg bg-base-100">
      <h2 className="text-2xl font-bold mb-4">Withdraw Coins</h2>
      <p className="mb-2">
        <strong>Available Coins:</strong> {coin}
      </p>
      <p className="mb-4">
        <strong>Withdrawal Amount:</strong> ${withdrawAmount}
      </p>

      {error && <p className="text-red-500 font-semibold mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label">Coin to Withdraw</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={withdrawCoin}
            onChange={handleWithdrawCoinChange}
            placeholder="Enter coin amount"
            disabled={isLoading}
          />
        </div>
        <div>
          <label className="label">Withdrawal Amount ($)</label>
          <input
            type="text"
            value={withdrawAmount}
            className="input input-bordered w-full bg-gray-100"
            readOnly
          />
        </div>
        <div>
          <label className="label">Select Payment System</label>
          <select
            className="select select-bordered w-full"
            value={paymentSystem}
            onChange={(e) => setPaymentSystem(e.target.value)}
            disabled={isLoading}
          >
            <option>Bkash</option>
            <option>Rocket</option>
            <option>Nagad</option>
            <option>Payoneer</option>
            <option>Bank</option>
          </select>
        </div>
        <div>
          <label className="label">Account Number</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={accountNumber}
            onChange={handleAccountNumberChange}
            required
            disabled={isLoading}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit Withdrawal"}
        </button>
      </form>
    </div>
  );
};

export default WithdrawForm;
