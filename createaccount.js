function CreateAccount() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  //const ctx = React.useContext(UserContext);
  const bankContext = React.useContext(BankContext);
  const bankDispatchContext = React.useContext(BankDispatchContext);

  function showError(error) {
    setStatus(error);
    setTimeout(() => setStatus(""), 3000);
  }

  function validate(field, label) {
    if (!field) {
      showError("Error: " + label);

      return false;
    }
    return true;
  }
  function handleCreate() {
    console.log(name, email, password);
    if (!validate(name, "name")) return;
    if (!validate(email, "email")) return;
    if (!validate(password, "password")) return;
    if (password.length < 8) {
      showError("password needs to be at least 8 characters");
      return;
    }

    //   ctx.users.push({name,email,password,balance:100});
    bankDispatchContext({
      type: ACTION_CREATE_ACCOUNT,
      account: {
        name,
        email,
        password,
      },
    });
    setShow(false);
  }

  function clearForm() {
    setName("");
    setEmail("");
    setPassword("");
    setShow(true);
  }

  function disableButton() {
    return !name && !email && !password;
  }

  return (
    <Card
      bgcolor="success"
      header="CreateAccount"
      status={status}
      body={
        show ? (
          <>
            Name
            <br />
            <input
              type="input"
              className="form-control"
              id="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
            />
            <br />
            Email address
            <br />
            <input
              type="input"
              className="form-control"
              id="email"
              placeholder="Enter email"
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
              onClick={handleCreate}
              disabled={disableButton()}
            >
              Create Account
            </button>
          </>
        ) : (
          <>
            <h5>Success</h5>
            <button type="submit" className="btn btn-light" onClick={clearForm}>
              Add another account
            </button>
          </>
        )
      }
    />
  );
}
