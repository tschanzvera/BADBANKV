function Deposit(){
    const [show, setShow] = React.useState(true);
    const [status, setStatus] = React.useState("");
   
  
    const [currency, setCurrency] = React.useState("EUR");
    const [amount, setAmount] = React.useState("");
    const ctx = React.useContext(UserContext);  
 
 
   function validate(field, label){
     if (!field) {
       setStatus('Error: ' + label);
       setTimeout(() => setStatus(''),3000);
       return false;
     }
     return true;
    }
     
    function handleCreate(){
    console.log(currency,amount);
    if (!validate(currency,    'currency'))    return;
    if (!validate(amount, 'amount')) return;
    ctx.users.push({currency,amount,balance:100});
    setShow(false);
  }    
   function clearForm(){
    setCurrency('');
    setAmount('');
    setShow(true);
  }

   return(
    <Card
    bgcolor="warning"
    header="Deposit"
    status={status}
    body={show ?(      <>
       
       Choose currency<br/>
       <select className="form-control" id="currency" placeholder="Enter currency" value={currency} onChange={e => setCurrency(e.currentTarget.value)}>
        <option value="USD">CHF</option>
        <option value="EUR">EUR</option>
        </select><br/>


        Enter amount you would like to Deposit<br/>
        <input type="amount" className="form-control" id="amount" placeholder="Enter amount" value={amount} onChange={e => setAmount(e.currentTarget.value)}/><br/>
        <button type="submit" className="btn btn-light" onClick={handleCreate}>Deposit</button>
        </>
      ):(
        <>
        <h5>Success</h5>
        <button type="submit" className="btn btn-light" onClick={clearForm}>print receipt</button>
        <button type="submit" className="btn btn-light" onClick={clearForm}>enter an other amount</button>
        </>
      )}
/>
)
}

    
     