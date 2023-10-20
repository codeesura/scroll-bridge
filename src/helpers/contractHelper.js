const { ethers } = require("ethers");
const { 
    BRIDGE_CONTRACT_ABI, 
    BRIDGE_CONTRACT_ADDRESS, 
    UNISWAP_POOL_ABI, 
    UNISWAP_POOL_CONTRACT_ADDRESS, 
    PROVIDER_URL, 
    PRIVATE_KEY
} = require('../../config/config.js');

class ContractHelper {
    constructor() {
        this.provider = new ethers.providers.JsonRpcProvider(PROVIDER_URL);
        this.wallet = new ethers.Wallet(PRIVATE_KEY, this.provider);
        this.contract = new ethers.Contract(BRIDGE_CONTRACT_ADDRESS, BRIDGE_CONTRACT_ABI, this.wallet);
    }

    async getEthPriceFromUniswap() {
        const uniswapPool = new ethers.Contract(UNISWAP_POOL_CONTRACT_ADDRESS, UNISWAP_POOL_ABI, this.provider);
        
        const { sqrtPriceX96 } = await uniswapPool.slot0();
        const numerator = sqrtPriceX96 ** 2
        const denominator = 2 ** 192
        let ratio = numerator / denominator
        const decimalShift = 10 ** (Number(6) - Number(18));
        return 1 / (ratio * decimalShift);
    }

    async getBalance() {
        try {
            return await this.provider.getBalance(this.wallet.address);
        } catch (error) {
            console.error("Error getting balance:", error);
            throw error;
        }
    }

    async estimateGasCost(amountEth, gasPriceGwei) {
        const l2GasLimit = 168000;
        const depositAmount = ethers.utils.parseEther(amountEth);
        const addedValue = ethers.utils.parseEther("0.000084");
        const totalValue = depositAmount.add(addedValue);

        const gasEstimate = await this.contract.estimateGas["depositETH(uint256,uint256)"](depositAmount, l2GasLimit, { value: totalValue });
        const gasCostWei = gasEstimate.mul(ethers.utils.parseUnits(gasPriceGwei, 'gwei'));

        return { estimatedGasCostEth: ethers.utils.formatEther(gasCostWei), gasLimit: gasEstimate };
    }

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
