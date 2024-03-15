function Login() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const bankContext = React.useContext(BankContext);
  const bankDispatchContext = React.useContext(BankDispatchContext);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  // const ctx = React.useContext(UserContext);


  function showError(error){
    setStatus(error);
    setTimeout(() => setStatus(''),3000);

  }

  function validate(field, label) {
    if (!field) {
      setStatus("Error: " + label);
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  }
  function handle() {
    console.log(email, password);
    if (!validate(email, "email")) return;
    if (!validate(password, "password")) return;
    if (password.length < 8){
      showError("password needs to be at least 8 characters")
      return;
    }
    
    bankDispatchContext({
      type:ACTION_LOGIN,
      email, 
      password
   
    });

    setShow(false);
  }
  function clearForm() {
    setEmail("");
    setPassword("");
    setShow(true);
  }

  function disableButton() {
    return  !email && !password;
  }


  return (
    <Card
      bgcolor="danger"
      header="Login"
      status={status}
      body={
        show ? (
          <>
            Email <br />
            <input
              type="input"
              className="form-control"
              id="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
            <br />
            Password
            <br />
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
            <br />
            <button
              type="submit"
              className="btn btn-light"
              onClick={handle}
              disabled={disableButton()}
            >
              Login
            </button>
          </>
        ) : (
          <>
            <h5>Success</h5>
            <button type="submit" className="btn btn-light" onClick={clearForm}>
              go back to login
            </button>
          </>
        )
      }
    />
  );
}
