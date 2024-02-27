function Balance({header,bgcolor,description,update}){
    const [show, setShow] = React.useState(true);
   
   
    const [amount, setAmount] = React.useState("");
    const [currency, setCurrency] = React.useState("EUR");
    const bankContext = React.useContext(BankContext);
    const bankDispatchContext = React.useContext(BankDispatchContext);
    const currentAccount = bankContext.accounts[bankContext.currentAccount];
    const currentBalance = currentAccount.balance;


 
 
   function validate(field, label){
     if (!field) {
       setStatus('Error: ' + label);
       setTimeout(() => setStatus(''),3000);
       return false;
     }
     return true;
 }
 function handle(){
     if (!validate(amount,    'amount'))    return;
     if (!validate(currency, 'currency')) return;
     bankDispatchContext({
        type: update,
        amount,
        currency
        
    })
  //   ctx.users.push({email,currency,balance:100});

     setShow(false);
   }    
    function clearForm(){
      setAmount  ('');
     setCurrency('');
     setShow(true);
   }
 
    return(
     <Card
     header={header}
     bgcolor={bgcolor}
     update={update}
     description={description}
     body={show ?(   
           <>
        Balance: {currentBalance}<br/>
        Amount<br/>
         <input 
            type="input" 
            className="form-control" 
            id="amount" 
            placeholder="Enter amount" 
            value={amount} 
            onChange={e => setAmount(e.currentTarget.value)}/><br/>
        Choose currency<br/>
        <select 
            className="form-control" 
            id="currency" 
            placeholder="Enter currency" 
            value={currency} 
            onChange={e => setCurrency(e.currentTarget.value)}>
        <option value="USD">CHF</option>
        <option value="EUR">EUR</option>
        </select><br/>

        
         <button type="submit" className="btn btn-light" onClick={handle}>show current balance</button>
         </>
       ):(
         <>
         <h5>Current balance</h5>
         <button type="submit" className="btn btn-light" onClick={clearForm}>print receipt</button>
      
         </>
       )}
 />
 )
 }
    