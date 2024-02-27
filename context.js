const BankContext = React.createContext(null);
const BankDispatchContext = React.createContext (null);

function BankContextProvider({children}) {
    const initialData = {
        currentAccount: null, 
        accounts: {}
    };
    const [bank, dispatch] = React.useReducer(
        bankReducer,
        initialData
      );
      return (
        <BankContext.Provider value={bank}>
          <BankDispatchContext.Provider value={dispatch}>
            {children}
          </BankDispatchContext.Provider>
        </BankContext.Provider>
      );
    
    
}

var ACTION_CREATE_ACCOUNT = "ACTION_CREATE_ACCOUNT";
var ACTION_DEPOSIT = "ACTION_DEPOSIT";
var ACTION_WITHDRAW = "ACTION_WITHDRAW";

function bankReducer(bank, action){
    switch (action.type) {
        case ACTION_CREATE_ACCOUNT: {
            return createAccount(bank,action);
        }
        
        case ACTION_DEPOSIT: {
            console.log("money deposited");
            return bank;
        }
        
        case ACTION_WITHDRAW: {
            console.log("money withdrawn");
            return bank;
        }

        case ACTION_LOGIN: {
            console.log("logged in");
            return bank;
        }
        default:{
            alert(action.type + " is not supported")
        }
    }
}

function createAccount(bank, action){
    const account = action.account;
    account.balance = 0;
    const newState = {...bank};
    newState.currentAccount = account.email;
    newState.accounts = {...bank.accounts};
    newState.accounts [account.email] = account;
    

    console.log("account created");
    return newState;


}