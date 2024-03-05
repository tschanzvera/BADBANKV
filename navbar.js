function Navbar(){
    const bankContext = React.useContext(BankContext);
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
  
    const currentPage = getCurrentPage();

    return(
        <>
           <nav className="navbar navbar-expand-lg navbar-light bg-light">
     {/* <a className="navbar-brand" href="#">BadBank</a>*/}
      <a className="navbar-brand" href="#" data-toggle="tooltip" title="Home Page">
          BadBank
          </a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className={`nav-item ${currentPage === 'Create Account' ? 'active' : ''}`}>
            <a className="nav-link"
             href="#/CreateAccount/" 
              data-toggle="tooltip"
                title="Create a new account"
                >Create Account</a>
          </li>
          <li className={`nav-item ${currentPage === 'Login' ? 'active' : ''}`}>
            <a className="nav-link" href="#/login/" data-toggle="tooltip" 
                title="Log into your account">Login</a>
          </li>
          <li className={`nav-item ${currentPage === 'Deposit' ? 'active' : ''}`}>
            <a className="nav-link" href="#/deposit/"  data-toggle="tooltip"
                title="Deposit funds into your account">Deposit</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/withdraw/"data-toggle="tooltip"
                title="Withdraw funds from your account">Withdraw</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/alldata/" data-toggle="tooltip"
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