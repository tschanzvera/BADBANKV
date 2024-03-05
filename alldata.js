
function AllData() {
  const bankContext = React.useContext(BankContext)
   const { accounts } = bankContext;

    return(
        <Card
        bgcolor="primary"
        txtcolor="white"
        body ={ <>
          <h2>All Data</h2>
          <p>This is information about all accounts:</p>
          <ul>
              {Object.values(accounts).map((account) => (
                  <li key={account.email}>
                      {`Email: ${account.email}, Balance: ${account.balance}`}
                  </li>
              ))}
          </ul>
          </>

        }
     
      >    
      
      
  </Card>
);
}

