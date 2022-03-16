import { BehaviorSubject  } from 'rxjs';
import { getCurrentUser } from 'helpers/Utils';
import Web3 from 'web3';
import Web3Modal from 'web3modal';//https://npm.io/package/web3modal


const subject = new BehaviorSubject();
const initialState = {
  status: '',
  data: [],
  newDataCount: 0,
  error: ''
};

let state = initialState;

export const walletStore = {
  init: () => {
    state = {...state, newDataCount: 0}
    subject.next(state)
  },
  openModal:()=>{

  },
  subscribe: setState => subject.subscribe(setState),
  sendMessage: message => {
    state = {
      ...state,
      data: [...state.data, message],
      newDataCount: state.newDataCount + 1
    };
    subject.next(state);
  },
  clearChat: () => {
    state = {...state, data: []};
    subject.next(state);
  },
  initialState
};



export const initWeb3 = async()=>{
  const providerOptions = {
    /* See Provider Options Section */
  };

  const web3Modal = new Web3Modal({
    network: 'mainnet', // optional
    cacheProvider: true, // optional
    providerOptions, // required
    theme: 'dark',
    // theme: {
    //   background: "rgb(39, 49, 56)",
    //   main: "rgb(199, 199, 199)",
    //   secondary: "rgb(136, 136, 136)",
    //   border: "rgba(195, 195, 195, 0.14)",
    //   hover: "rgb(16, 26, 32)"
    // },

  });

  const provider = await web3Modal.connect();
  const web3 = new Web3(provider);

// Subscribe to accounts change
  provider.on('accountsChanged', (accounts) => {
    console.log(accounts);
  });

// Subscribe to chainId change
  provider.on('chainChanged', (chainId) => {
    console.log(chainId);
  });

// Subscribe to provider connection
  provider.on('connect', (info) => {
    console.log(info);
  });

// Subscribe to provider disconnection
  provider.on('disconnect', (error) => {
    console.log(error);
  });

}


export const walletSubject = new BehaviorSubject({});

walletSubject.subscribe({
  next: (v) => console.log(`observerA: ${v}`)
});

const INIT_STATE = {
  currentUser: getCurrentUser(),
  cxWalletAddress: '',
  cxWalletProvider: '',
  loading: false,
  error: '',
};

export function initConnectWallet(state = INIT_STATE, action){
  walletSubject.subscribe(x => console.log(x));

  const apl = action.payload;
  if(action.type===WALLET_CHANGE){

    return {
      ...state,
      loading: false,
      connected: true,
      cxWalletAddress: apl.address,
      cxWalletProvider: apl.provider,
    };
  }
}
export default authUser
