require('dotenv').config();
const BRIDGE_ABI = require('../abis/BridgeABI.json');
const UNISWAP_POOL_ABI = require('../abis/PoolABI.json');

module.exports = {
    BRIDGE_CONTRACT_ABI: BRIDGE_ABI,
    BRIDGE_CONTRACT_ADDRESS: "0xF8B1378579659D8F7EE5f3C929c2f3E332E41Fd6",
    UNISWAP_POOL_ABI: UNISWAP_POOL_ABI,
    UNISWAP_POOL_CONTRACT_ADDRESS: "0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640",
    PROVIDER_URL: "https://ethereum.publicnode.com",
    PRIVATE_KEY: process.env.PRIVATE_KEY,
    GAS_PRICE_GWEI: "6",
    MINIMUM_ETH_BALANCE_USD: "3"
};
