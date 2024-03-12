function Balance({ header, bgcolor, description, update }) {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [currency, setCurrency] = React.useState("EUR");
  const bankContext = React.useContext(BankContext);
  const bankDispatchContext = React.useContext(BankDispatchContext);
  const currentAccount = bankContext.accounts[bankContext.currentAccount];

  if (!currentAccount) {
    return <h4> you need to create an account or login</h4>;
  }
  const currentBalance = currentAccount.balance;

  function showError(error) {
    setStatus(error);
    setTimeout(() => setStatus(""), 3000);
  }

  function validate(field, label) {
    if (!field) {
      setStatus("Error: " + label);
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  }
  //  const numericAmount = Number(field);
  //  if (isNaN(numericAmount)) {
  //    setStatus("Error: " + label + " must be a valid number");
  //    setTimeout(() => setStatus(""), 3000);
  //    return false;
  //  }

  //  return true;
  //}
  function handle() {
    if (!validate(amount, "amount")) return;
    const numericAmount = Number(amount);
    if (isNaN(numericAmount)|| numericAmount <= 0) {
      showError("Error: Amount must be a valid positive number");
      return;
    }
    if (update === ACTION_WITHDRAW) {
      if (currentBalance < Number(amount)) {
        showError("your balance is too low to withdraw that amount");
        return;
      }
    }
   
    bankDispatchContext({
      type: update,
      amount: Number(amount),
      currency,
    });
    //   ctx.users.push({email,currency,balance:100});

    setShow(false);
  }
  function clearForm() {
    setAmount("");
    setCurrency("");
    setShow(true);
  }

  return (
    <Card
      header={header}
      bgcolor={bgcolor}
      update={update}
      description={description}
      status={status}
      body={
        show ? (
          <>
            Balance: {currentBalance}
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
            <button type="submit" className="btn btn-light" onClick={handle}>
              show current balance
            </button>
          </>
        ) : (
          <>
            <h5>Current balance</h5>
            <button type="submit" className="btn btn-light" onClick={clearForm}>
              print receipt
            </button>
          </>
        )
      }
    />
  );
}
