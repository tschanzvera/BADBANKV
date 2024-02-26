function Spa(){
    return(
        <HashRouter>
        <Navbar/>
        <UserContext.Provider value={{users:[{name:'abel',email:'abel@mit.edu',password:'secret',balance:100}]}}>
        <Route path="/" exact component ={Home}/>
        <Route path="/CreateAccount/"component ={CreateAccount}/>
        <Route path="/login/"component ={Login}/>
        <Route path="/deposit/"component ={Deposit}/>
        <Route path="/withdraw/"component ={Withdraw}/>
        <Route path="/alldata/"component ={AllData}/>
        <Route path="/balance/"component ={Balance}/>
        </UserContext.Provider>
        </HashRouter>
    );
}

ReactDOM.render(
    <Spa/>,
    document.getElementById('root')
  );
