<template>
  <Navbar
      :is-connected='isConnected'
      :current-account='currentAccount'
      :provider='provider'
      :chain-id='chainId'
      :networks='networks'
      @backgroundChanged='backgroundChanged'
      @chainIdChanged='chainIdChanged'
      @currentAccountChanged='currentAccountChanged'
      @isConnectedChanged='isConnectedChanged'
  />
  <main class='w-full'>
    <section class='section'>
      <Headline :bgType='bgType'/>
    </section>
  </main>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Headline from '@/components/Headline.vue'
import Web3 from 'web3';

export default {
  name: 'event-vue',
  components: {
    Navbar,
    Headline
  },
  data() {
    return {
      bgType: 'night',
      isConnected: false,
      accounts: [],
      currentAccount: '',
      provider: window.ethereum,
      chainId: 0,
      web3: {},
      networks: {
        1: 'Ethereum Main Network',
        3: 'Ropsten Test Network',
        4: 'Rinkeby Test Network',
        5: 'Goerli Test Network',
        42: 'Kovan Test Network',
      },
    }
  },
  async mounted () {
    this.web3 = new Web3(this.provider);
    this.provider.on('accountsChanged', this.handleAccountsChanged);
    this.provider.on('chainChanged', this.handleChainChanged);
    this.provider.on('disconnect', this.handleAccountsChanged);
    await this.handleChainChanged()
    await this.onLogin()
  },
  methods: {
    async handleAccountsChanged(accounts) {
      if (accounts.length === 0) {
        this.currentAccount = null
        this.isConnected = false
      } else if (accounts[0] !== this.currentAccount) {
        this.currentAccount = accounts[0]
        this.isConnected = true
      }
    },
    async handleChainChanged() {
      this.chainId = await this.web3.eth.getChainId()
    },
    async onLogin () {
      const accounts = await this.web3.eth.getAccounts();
      await this.handleAccountsChanged(accounts)
    },
    backgroundChanged (bgType) {
      this.bgType = bgType
    },
    chainIdChanged (chainId) {
      this.chainId = chainId
    },
    currentAccountChanged (currentAccount) {
      this.currentAccount = currentAccount
    },
    isConnectedChanged (isConnected) {
      this.isConnected = isConnected
    }
  }
}

</script>

<style scoped>
.section {
  @apply w-screen;
  /* py-24 px-6 py-12 md:px-16 xl:px-28;*/
}
</style>
