const BankContext = React.createContext(null);
const BankDispatchContext = React.createContext(null);
var privateDispatcher;
const initialData = {

    currentAccount: {
        name: null,
        email: null,
        accounts: null
    }


};
function BankContextProvider({ children }) {

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
var ACTION_LOGOUT = "ACTION_LOGOUT";
var ACTION_UPDATESTATE = "UPDATE_STATE";

function bankReducer(bank, action) {
    switch (action.type) {
        case ACTION_CREATE_ACCOUNT: {
            return createAccount(bank, action);
        }

        case ACTION_DEPOSIT: {
            const account = action.account
            return changeBalance(bank, "deposit", action.amount, account);
        }

        case ACTION_WITHDRAW: {
            const account = action.account
            return changeBalance(bank, "withdraw", action.amount, account);
        }

        case ACTION_LOGIN: {
            return individualLogin(bank, action);
        }

        case ACTION_LOGOUT: {
            logout()
            return initialData;
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
    axios.post('/create-account', action.account)
        .then(response => {
            console.log(response.data); // Handle the response data
            privateDispatcher({
                type: ACTION_UPDATESTATE,
                ...response.data
            })

        })
        .catch(error => {
            console.error('There was an error!', error);
            alert("there was an error"); // Handle the error
        });

    return bank


}




function changeBalance(bank, action, amount, account) {

    axios.put('/account?action=' + action + '&amount=' + amount + '&email=' + bank.currentAccount.email + '&account=' + account)
        .then(response => {
            console.log(response.data); // Handle the response data
            privateDispatcher({
                type: ACTION_UPDATESTATE,
                balance: response.data.balance

            })
        })
        .catch(error => {
            console.error('There was an error!', error);
            alert("there is an error")// Handle the error
        });
    return bank
}

function individualLogin(bank, action) {
    axios.post('/login', { email: action.email, password: action.password })
        .then(response => {
            console.log(response.data); // Handle the response data
            privateDispatcher({
                type: ACTION_UPDATESTATE,
                ...response.data
            })

        })
        .catch(error => {
            console.error('There was an error!', error);
            alert("there was an error"); // Handle the error
        });

    return bank



}

function logout() {
    axios.post('/logout')
        .then(response => {
            location.reload();
            console.log(response.data);
        })
}



