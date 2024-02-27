const BankContext = React.createContext(null);
const BankDispatchContext = React.createContext (null);

function BankContextProvider({children}) {
    const initialData = [];
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
            console.log("account created");
            return bank;
        }
        
        case ACTION_DEPOSIT: {
            console.log("account created");
            return bank;
        }
        
        case ACTION_WITHDRAW: {
            console.log("account created");
            return bank;
        }
        default:{
            alert(action.type + " is not supported")
        }
    }
}