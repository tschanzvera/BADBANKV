
function AllData() {
  const bankContext = React.useContext(BankContext)
   const {currentAccount } = bankContext;

    return(
        <Card
        bgcolor="primary"
        txtcolor="white"
        body ={ <>
          <h2>All Data</h2>
          <p>All account information:</p>
          <ul>
              {Object.entries(currentAccount.balance).map(([account,amount]) => (
                  <li key={account.email}>
                      {`Account: ${account}, Balance: ${amount}`}
                  </li>
              ))}
          </ul>
          </>

        }
     
      >    
      
      
  </Card>
);
}

