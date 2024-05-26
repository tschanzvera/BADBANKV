const BankContext = React.createContext(null);
const BankDispatchContext = React.createContext (null);
var privateDispatcher;
function BankContextProvider({children}) {
    const initialData = {
        
        currentAccount: {
            name:null,
            email:null,
            balance: null
        }
      
     
    };
    const [bank, dispatch] = React.useReducer(
        bankReducer,
        initialData
      );
      privateDispatcher = dispatch;
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
var ACTION_LOGIN = "ACTION_LOGIN"; 
var ACTION_UPDATESTATE= "UPDATE_STATE";

function bankReducer(bank, action){
    switch (action.type) {
        case ACTION_CREATE_ACCOUNT: {
            return createAccount(bank,action);
        }
        
        case ACTION_DEPOSIT: {
            axios.put('http://localhost:3000/deposit?amount='+action.amount)
            .then(response => {
              console.log(response.data); // Handle the response data
              privateDispatcher({
                type:ACTION_UPDATESTATE,
                amount:response.data
              })

            })
            .catch(error => {
              console.error('There was an error!', error); // Handle the error
            });
         return changeBalance(bank,action,1);
        }
        
        case ACTION_WITHDRAW: {
            return changeBalance (bank,action,-1);
        }

        case ACTION_LOGIN: {
            return individualLogin(bank,action);
        }
        case ACTION_UPDATESTATE:{
            const newState ={...bank};
            newState.currentAccount.balance= action.amount
            return newState;
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



// function changeBalance (bank, action,sign) {
//     const amount = action.amount;

//     if (typeof amount !== 'number' || amount <= 0) {
//         console.error("Invalid withdrawal amount");
//         return bank;
//     }

//     const newState = { ...bank };

//     if (newState.currentAccount) {
//         // Update the balance of the current account
//         newState.accounts[newState.currentAccount].balance += amount*sign;
//         console.log(` New balance: ${newState.accounts[newState.currentAccount].balance}`);
//     } else {
//         console.error("No current account selected");
//     }

//     return newState;
// }

function individualLogin(bank, action){
    const password = action.password;
    const currentAccount = bank.accounts[action.email];
    if (!currentAccount){
        return bank;
    }
    const newState ={...bank};
    newState.currentAccount = action.email;
    

    console.log("login completed. Current account:", newState.currentAccount);
    return newState;

   

}


    
