const { ethers } = require("ethers");
const { 
    BRIDGE_CONTRACT_ABI, 
    BRIDGE_CONTRACT_ADDRESS, 
    UNISWAP_POOL_ABI, 
    UNISWAP_POOL_CONTRACT_ADDRESS, 
    PROVIDER_URL, 
    PRIVATE_KEY
} = require('../../config/config.js');

/* The `ContractHelper` class is a JavaScript class that serves as a helper for interacting with a
smart contract on the Ethereum blockchain. */
class ContractHelper {
    constructor() {
        this.provider = new ethers.providers.JsonRpcProvider(PROVIDER_URL);
        this.wallet = new ethers.Wallet(PRIVATE_KEY, this.provider);
        this.contract = new ethers.Contract(BRIDGE_CONTRACT_ADDRESS, BRIDGE_CONTRACT_ABI, this.wallet);
    }

    /**
     * The function `getEthPriceFromUniswap` retrieves the current price of Ethereum from a Uniswap pool
     * contract.
     * @returns the current price of Ethereum (ETH) from the Uniswap pool.
     */
    async getEthPriceFromUniswap() {
        const uniswapPool = new ethers.Contract(UNISWAP_POOL_CONTRACT_ADDRESS, UNISWAP_POOL_ABI, this.provider);
        
        const { sqrtPriceX96 } = await uniswapPool.slot0();
        const numerator = sqrtPriceX96 ** 2
        const denominator = 2 ** 192
        let ratio = numerator / denominator
        const decimalShift = 10 ** (Number(6) - Number(18));
        return 1 / (ratio * decimalShift);
    }

    /**
     * The function `getBalance` asynchronously retrieves the balance of a wallet using a provider and
     * throws an error if there is any issue.
     * @returns The balance of the wallet address is being returned.
     */
    async getBalance() {
        try {
            return await this.provider.getBalance(this.wallet.address);
        } catch (error) {
            console.error("Error getting balance:", error);
            throw error;
        }
    }

    /**
     * The function estimates the gas cost in Ether for a given amount of Ether and gas price in Gwei.
     * @param amountEth - The amount of Ether (ETH) you want to deposit. It is a numeric value representing
     * the amount of ETH you want to deposit.
     * @param gasPriceGwei - The `gasPriceGwei` parameter represents the gas price in Gwei. Gas price is
     * the amount of Ether you are willing to pay for each unit of gas consumed by a transaction. It
     * determines how quickly your transaction will be processed by the network.
     * @returns an object with two properties: "estimatedGasCostEth" and "gasLimit". The value of
     * "estimatedGasCostEth" is the estimated gas cost in Ether, and the value of "gasLimit" is the gas
     * limit estimate.
     */
    async estimateGasCost(amountEth, gasPriceGwei) {
        const l2GasLimit = 168000;
        const depositAmount = ethers.utils.parseEther(amountEth);
        const addedValue = ethers.utils.parseEther("0.000084");
        const totalValue = depositAmount.add(addedValue);

        const gasEstimate = await this.contract.estimateGas["depositETH(uint256,uint256)"](depositAmount, l2GasLimit, { value: totalValue });
        const gasCostWei = gasEstimate.mul(ethers.utils.parseUnits(gasPriceGwei, 'gwei'));

        return { estimatedGasCostEth: ethers.utils.formatEther(gasCostWei), gasLimit: gasEstimate };
    }

    /**
     * The `depositToBridge` function in JavaScript is used to deposit a specified amount of Ether to a
     * bridge contract, with the option to set gas limit and gas price.
     * @param amountEth - The amount of Ether (ETH) you want to deposit to the bridge. It should be
     * specified in ETH units.
     * @param gasLimit - The gas limit is the maximum amount of gas that can be used for executing a
     * transaction on the Ethereum network. It determines how much computational work can be done during
     * the transaction. The gas limit is measured in units of gas, and each operation in a transaction
     * consumes a certain amount of gas.
     * @param gasPrice - The `gasPrice` parameter is the price in Gwei that you are willing to pay for each
     * unit of gas. Gas is the unit used to measure the computational effort required to execute a
     * transaction or contract on the Ethereum network. The gas price determines how quickly your
     * transaction will be processed by the network
     * @returns the result of the `wait()` method called on the `txResponse` object.
     */
    async depositToBridge(amountEth, gasLimit, gasPrice) {
        const l2GasLimit = 168000;
        const depositAmount = ethers.utils.parseEther(amountEth);
        // Additional gas cost in ETH, converted to Wei
        const addedValue = ethers.utils.parseEther("0.000084");
        const totalValue = depositAmount.add(addedValue);

        try {
            const txResponse = await this.contract["depositETH(uint256,uint256)"](depositAmount, l2GasLimit, { value: totalValue, gasLimit: gasLimit, gasPrice: ethers.utils.parseUnits(gasPrice, 'gwei')});
            return await txResponse.wait();
        } catch (error) {
            console.error("Error during deposit to the bridge:", error);
            throw error;
        }
    }
}

module.exports = ContractHelper;
