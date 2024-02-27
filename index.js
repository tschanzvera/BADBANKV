function Spa(){
    return(
        <HashRouter>
        <Navbar/>
        <BankContextProvider>
            <Route path="/" exact component ={Home}/>
            <Route path="/CreateAccount/"component ={CreateAccount}/>
            <Route path="/login/"component ={Login}/>
            <Route path="/deposit/"component ={Deposit}/>
            <Route path="/withdraw/"component ={Withdraw}/>
            <Route path="/alldata/"component ={AllData}/>
        </BankContextProvider>
        </HashRouter>
    );
}

ReactDOM.render(
    <Spa/>,
    document.getElementById('root')
  );
