
const getCurrentPage = () => {
  const hash = window.location.hash;
  switch (hash) {
    case '#/CreateAccount/':
      return 'Create Account';
    case '#/login/':
      return 'Login';
    case '#/deposit/':
      return 'Deposit';
    case '#/withdraw/':
      return 'Withdraw';
    case '#/alldata/':
      return 'AllData';
    default:
      return '';
  }
};



function Navbar(){
    const bankContext = React.useContext(BankContext);
    const [currentPage,setCurrentPage] = React.useState(window.location.hash);
    function changePage(newPage){
setCurrentPage(newPage);
window.location.hash= newPage;
    }

 
   
console.log (currentPage)
    return(
        <>
           <nav className="navbar navbar-expand-lg navbar-lg "style={{ backgroundColor: "rgb(177, 172, 164)" }}>
     {/* <a className="navbar-brand" href="#">BadBank</a>*/}
   
      <a className={`navbar-brand ${currentPage === "#" ? 'active' : ''}` } onClick={()=>changePage("#")} data-bs-toggle="tooltip"  data-bs-title="Home Page">
          BadBank
          </a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className={`nav-item ${currentPage === "#/CreateAccount/" ? 'active' : ''}`}>
            <a className="nav-link"
            onClick={()=>changePage("#/CreateAccount/")}
              data-bs-toggle="tooltip"
                title="Create a new account"
                >Create Account</a>
          </li>
          <li className={`nav-item ${currentPage === "#/login/" ? 'active' : ''}`}>
            <a className="nav-link" onClick={()=>changePage("#/login/")} data-bs-toggle="tooltip" 
                title="Log into your account">Login</a>
          </li>
          <li className={`nav-item ${currentPage === "#/deposit/" ? 'active' : ''}`}>
            <a className="nav-link" onClick={()=>changePage("#/deposit/")}  data-bs-toggle="tooltip"
                title="Deposit funds into your account">Deposit</a>
          </li>
          <li className={`nav-item ${currentPage === "#/withdraw/" ? 'active' : ''}`}>
            <a className="nav-link" onClick={()=>changePage("#/withdraw/")}data-bs-toggle="tooltip"
                title="Withdraw funds from your account">Withdraw</a>
          </li>
          <li className={`nav-item ${currentPage === "#/alldata/" ? 'active' : ''}`}>
            <a className="nav-link" onClick={()=>changePage("#/alldata/")} data-bs-toggle="tooltip"
                title="View all data">AllData</a>
          </li> 
          <li className="nav-item">
            {bankContext.currentAccount}
          </li>             
        </ul>
      </div>
    </nav>
      
    </>
  );
}