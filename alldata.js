
function AllData() {
  const bankContext = React.useContext(BankContext)
   const { accounts } = bankContext;

    return(
        <Card
        bgcolor="primary"
        txtcolor="white"
        body ={ <>
          <h2>All Data</h2>
          <p>All account information:</p>
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

