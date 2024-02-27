function Balance({header,bgcolor,description,update}){
    const [show, setShow] = React.useState(true);
    const [status, setStatus] = React.useState("EUR");
   
    const [email, setEmail] = React.useState("");
    const [currency, setCurrency] = React.useState("");
    const bankContext = React.useContext(BankContext);
    const bankDispatchContext = React.useContext(BankDispatchContext);


 
 
   function validate(field, label){
     if (!field) {
       setStatus('Error: ' + label);
       setTimeout(() => setStatus(''),3000);
       return false;
     }
     return true;
 }
 function handleCreate(){
     console.log(email, currency);
     if (!validate(email,    'email'))    return;
     if (!validate(currency, 'currency')) return;
     bankDispatchContext({
        type: update,
        ammount,
        currency
        
    })
  //   ctx.users.push({email,currency,balance:100});

     setShow(false);
   }    
    function clearForm(){
      setEmail  ('');
     setCurrency('');
     setShow(true);
   }
 
    return(
     <Card
     header={header}
     bgcolor={bgcolor}
     update={update}
     description={description}
     status={status}
     body={show ?(   
           <>
        
        Email<br/>
         <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
        Choose currency<br/>
        <select className="form-control" id="currency" placeholder="Enter currency" value={currency} onChange={e => setCurrency(e.currentTarget.value)}>
        <option value="USD">CHF</option>
        <option value="EUR">EUR</option>
        </select><br/>

        
         <button type="submit" className="btn btn-light" onClick={handleCreate}>show current balance</button>
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
    