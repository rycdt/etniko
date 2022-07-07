<template>
  <div class='grid wh-full place-content-center z-10'>
      <div class='text-center'>
        <button :onclick="handleMint">Mint</button>
      </div>
  </div>
</template>

<script>

import {BigNumber, ethers} from 'ethers';
import Etniko from '@/artifacts/contracts/Etniko.sol/Etniko.json';

const etnikoAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
export default {
  name: 'mint-vue',
  data() {
    return {
      mintAmount: 1,
    }
  },
  methods: {
    async handleMint() {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
            etnikoAddress,
            Etniko.abi,
            signer
        );

        try {
          const response = await contract.mint(BigNumber.from(this.mintAmount), {
            value: ethers.utils.parseEther((0.01 * this.mintAmount).toString())
          });

          await provider.waitForTransaction(response.hash);
          const receipt = await provider.getTransactionReceipt(response.hash);

          receipt.logs.forEach(log => {
            console.log(parseInt(log.topics[3], 16))
            this.getURI(contract, log.topics[3])
          })
          console.log(receipt)
          console.log('response: ', response)
        } catch (err) {
          console.log(err)
        }
      }
    },
    async getURI(contract, tokenId) {
      const uri = await contract.tokenURI(tokenId);
      console.log(uri);
    },
  }
}
</script>

<style scoped>

</style>