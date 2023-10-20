const ContractHelper = require('./helpers/contractHelper.js');
const ethers = require('ethers');
const { GAS_PRICE_GWEI, MINIMUM_ETH_BALANCE_USD } = require('../config/config.js');

async function main() {
    const contractHelper = new ContractHelper();

    try {
        const ethUsdPrice = await contractHelper.getEthPriceFromUniswap();
        const currentBalanceEth = await contractHelper.getBalance();

        const minimumEthToKeep = ethers.utils.parseEther(((MINIMUM_ETH_BALANCE_USD / ethUsdPrice).toFixed(10)).toString());

        const bridgeFeeWei = ethers.utils.parseEther("0.000084");
        const sendableAmountWei = currentBalanceEth.sub(minimumEthToKeep).sub(bridgeFeeWei);

        const { estimatedGasCostEth , gasLimit } = await contractHelper.estimateGasCost(ethers.utils.formatEther(sendableAmountWei), GAS_PRICE_GWEI);

        const sendableAmountEth = ethers.utils.formatEther(
            currentBalanceEth
            .sub(ethers.utils.parseEther(estimatedGasCostEth))
            .sub(bridgeFeeWei)
            .sub(minimumEthToKeep)
        );

        await contractHelper.depositToBridge(sendableAmountEth, gasLimit, GAS_PRICE_GWEI);

        console.log(`Successfully deposited ${sendableAmountEth} ETH to the bridge!`);
    } catch (error) {
        console.error("Error in main function:", error);
    }
}

main();
