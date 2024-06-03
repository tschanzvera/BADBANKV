const BankContext = React.createContext(null);
const BankDispatchContext = React.createContext(null);
var privateDispatcher;
function BankContextProvider({ children }) {
    const initialData = {

        currentAccount: {
            name: null,
            email: null,
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
var ACTION_UPDATESTATE = "UPDATE_STATE";

function bankReducer(bank, action) {
    switch (action.type) {
        case ACTION_CREATE_ACCOUNT: {
            return createAccount(bank, action);
        }

        case ACTION_DEPOSIT: {
            return changeBalance(bank, "deposit", action.amount);
        }

        case ACTION_WITHDRAW: {
            return changeBalance(bank, "withdraw",action.amount);
        }

        case ACTION_LOGIN: {
            return individualLogin(bank, action);
        }
        case ACTION_UPDATESTATE: {
            const newState = { ...bank };
            newState.currentAccount = {
                ...newState.currentAccount,
                ...action

            }
            return newState;
        }
        default: {
            alert(action.type + " is not supported")
        }
    }
}

function createAccount(bank, action) {
    const account = action.account;
    account.balance = 0;
    const newState = { ...bank };
    newState.currentAccount = account.email;
    newState.accounts = { ...bank.accounts };
    newState.accounts[account.email] = account;


    console.log("account created");
    return newState;

}



function changeBalance(bank, action, amount) {
    axios.put('http://localhost:3000/account?action=' + action + '&amount=' + amount)
        .then(response => {
            console.log(response.data); // Handle the response data
            privateDispatcher({
                type: ACTION_UPDATESTATE,
                balance: response.data

            })
        })
        .catch(error => {
            console.error('There was an error!', error); // Handle the error
        });
    return bank
}

function individualLogin(bank, action) {
    axios.post('http://localhost:3000/login', { email: action.email, password: action.password })
        .then(response => {
            console.log(response.data); // Handle the response data
            privateDispatcher({
                type: ACTION_UPDATESTATE,
                ...response.data
            })

        })
        .catch(error => {
            console.error('There was an error!', error); // Handle the error
        });

    return bank



}



