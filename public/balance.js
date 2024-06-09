function Balance({ header, bgcolor, description, update }) {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [currency, setCurrency] = React.useState("EUR");
  const bankContext = React.useContext(BankContext);
  const bankDispatchContext = React.useContext(BankDispatchContext);
  const currentAccount = bankContext.currentAccount;
  const title =  update === ACTION_WITHDRAW ? "Withdraw" : "Deposit";
  if (!currentAccount.email) {
    return <h4> YOU NEED TO CREATE AN ACCOUNT OR LOGIN</h4>;
  }
  const currentBalance = currentAccount.balance;
  const {validate,showError} = Validater(setStatus);

  
  function handle() {
    if (!validate(amount, "amount")) return;
    let numericAmount = Number(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      showError("Error: Amount must be a valid positive number");
      return;
    }
    if (currency==="EUR"){
      numericAmount*= 0.96;
    }
    if (update === ACTION_WITHDRAW) {
      if (currentBalance < Number(amount)) {
        showError("your balance is too low to withdraw that amount");
        return;
      }
    }

    bankDispatchContext({
      type: update,
      amount: numericAmount,
      currency,
    });
    //   ctx.users.push({email,currency,balance:100});
    let updatedBalance;
    if (update === ACTION_WITHDRAW){
     updatedBalance = currentBalance - numericAmount;
    }
    else{
      updatedBalance = currentBalance + numericAmount;
    }


  
  setStatus(`${title} successful!  Current balance: CHF ${updatedBalance}`);



    setShow(false);
  }
  function clearForm() {
    setAmount("");
   // setCurrency("");
    setShow(true);
    setStatus("");
  }

  function disableButton() {
    return !amount;
  }

  return (
    <Card
      header={header}
      bgcolor={bgcolor}
      description={description}
      status={status}
      body={
        show ? (
          <>
            Balance: CHF {currentBalance}
            <br />
            Amount
            <br />
            <input
              type="input"
              className="form-control"
              id="amount"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.currentTarget.value)}
            />
            <br />
            Choose currency
            <br />
            <select
              className="form-control"
              id="currency"
              placeholder="Enter currency"
              value={currency}
              onChange={(e) => setCurrency(e.currentTarget.value)}
            >
              <option value="USD">CHF</option>
              <option value="EUR">EUR</option>
            </select>
            <br />
            <button
              type="submit"
              className="btn btn-light"
              onClick={handle}
              disabled={disableButton()}
            >
               {title}
            </button>
          </>
        ) : (
          <>
            <h5>Current balance</h5>
            <button type="submit" className="btn btn-light" onClick={clearForm}>
              {title} again
            </button>
          </>
        )
      }
    />
  );
}
