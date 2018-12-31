// Import the page's CSS. Webpack will know what to do with it.
import '../styles/app.css'

// Import libraries we need.
import { default as Web3 } from 'web3'
import { default as contract } from 'truffle-contract'

// Import our contract artifacts and turn them into usable abstractions.
import verifyIdArtifact from '../../build/contracts/verifyIdInSYSU.json'

// MetaCoin is our usable abstraction, which we'll use through the code below.
const verifyIdInSYSU = contract(verifyIdArtifact)

// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
let accounts
let account

const App = {
  start: function () {
    // const self = this

    // Bootstrap the MetaCoin abstraction for Use.
    verifyIdInSYSU.setProvider(web3.currentProvider)
    // console.log(window.web3.currentProvider)
    // web3.version.getNetwork(function(err,res){console.log(res)})

    var connected = web3.isConnected()
    if (!connected) {
      console.log('node not connected!')
    } else {
      console.log('node connected')
    }

    // Get the initial account balance so it can be displayed.
    web3.eth.getAccounts(function (err, accs) {
      if (err != null) {
        alert(err)
        alert('There was an error fetching your accounts.')
        return
      }

      if (accs.length === 0) {
        alert('Couldn\'t get any accounts! Make sure your Ethereum client is configured correctly.')
        return
      }

      accounts = accs
      account = accounts[0]

      console.log(accounts)

      const curAccount = document.getElementById('curAccount')
      curAccount.innerHTML = '当前账户：' + account

      const accountsElements = document.getElementById('accounts')
      for (var i = 0; i < accounts.length; i++) {
        accountsElements.innerHTML += accounts[i] + '\n'
      }

      // self.refreshBalance()
    })
  },

  setStatus: function (message) {
    const status = document.getElementById('status')
    status.innerHTML = message
  },

  login: function() {
    const self = this
    const toAccount = document.getElementById('toAccount').value
    let state = "失败"
    for (var i = 0; i < accounts.length; i++) {
      if(toAccount == accounts[i]){
        account = accounts[i]
        state = "完成"
        alert("切换成功")
        var loginPage = document.getElementById('loginPage')
        loginPage.style.display = "none"
      }
    }
    const curAccount = document.getElementById('curAccount')
    curAccount.innerHTML = '当前账户：' + account
    this.setStatus(state)
  },

  registerStatus: function () {
    const self = this

    const status = document.getElementById('myStatus').value
    const name = document.getElementById('myName').value
    const id = document.getElementById('myId').value

    let meta
    verifyIdInSYSU.deployed().then(function (instance) {
      meta = instance
      console.log(account)
      return meta.registerStatus(name, id, status, { from: account, gas:220000 })
    }).then(function (value) {
      const registerElement = document.getElementById('registerResult')
      console.log(value)
      if(value == false) {
        registerElement.innerHTML = '注册失败，已注册'
      } else {
        registerElement.innerHTML = '注册成功'
      }
    }).catch(function (e) {
      console.log(e)
      self.setStatus('Error registering status; see log.')
    })
  },

  getStatus: function () {
    const self = this

    let meta
    verifyIdInSYSU.deployed().then(function (instance) {
      meta = instance
      const target = document.getElementById('targetAccount').value
      return meta.getStatus.call(target, { from: account, gas:220000 })
    }).then(function (value) {
      const statusElement = document.getElementById('statusResult')
      if (value == "") {
        statusElement.innerHTML = '用户未注册'
      } else {
        statusElement.innerHTML = value.valueOf()
      }
    }).catch(function (e) {
      console.log(e)
      self.setStatus('Error getting status; see log.')
    })
  },

  addAward: function () {
    const self = this
    let meta
    verifyIdInSYSU.deployed().then(function (instance) {
      meta = instance
      const des = document.getElementById('description').value
      const obj = document.getElementsByName('visibility')
      let vis
      for (var i = 0; i < obj.length; i++) {
        if (obj[i].checked) {
            vis = obj[i].value
        }
      }
      return meta.addAward(des, vis, { from: account, gas:220000 })
    }).then(function () {
      const addElement = document.getElementById('addAdwardResult')
      addElement.innerHTML = "添加成功"
    }).catch(function (e) {
      console.log(e)
      self.setStatus('Error getting status; see log.')
    })
  },

  showAllAwards: function () {
    const self = this
    let meta
    verifyIdInSYSU.deployed().then(function (instance) {
      meta = instance
      return meta.showAllAwards.call( { from: account, gas:220000 })
    }).then(function (value) {
      console.log(value)
      const allMyAwards = document.getElementById('allMyAwards')
      allMyAwards.innerHTML = ""
      for (var i = 0; i < value.length; i++) {
        if (value[i] != "") {
          var award = document.createElement('ol')
          award.innerHTML = value[i]
          award.setAttribute('class', 'award')
          allMyAwards.appendChild(award)
        }
      }
      if (allMyAwards.innerHTML == "") {
        allMyAwards.innerHTML = "当前没有奖项"
      }

    }).catch(function (e) {
      console.log(e)
      self.setStatus('Error getting status; see log.')
    })

  },

  showOthersAward: function () {
    const self = this
    let meta
    verifyIdInSYSU.deployed().then(function (instance) {
      meta = instance
      const targetAccount = document.getElementById('other').value
      return meta.getAwardInfo.call(targetAccount, { from: account, gas:220000 })
    }).then(function (value) {
      console.log(value)
      const allHisAwards = document.getElementById('allHisAwards')
      allHisAwards.innerHTML = "";
      for (var i = 0; i < value.length; i++) {
        if (value[i] != "") {
          var award = document.createElement('ol')
          award.innerHTML = value[i]
          award.setAttribute('class', 'award')
          allHisAwards.appendChild(award)
        }
      }
      if (allHisAwards.innerHTML == "") {
        allHisAwards.innerHTML = "此用户当前没有奖项"
      }
    }).catch(function (e) {
      console.log(e)
      self.setStatus('Error getting status; see log.')
    })
  },

  showLogin: function () {
    var loginPage = document.getElementById('loginPage')
    loginPage.style.display = "block"
  }

}

window.App = App

window.addEventListener('load', function () {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn(
      'Using web3 detected from external source.' +
      ' If you find that your accounts don\'t appear or you have 0 MetaCoin,' +
      ' ensure you\'ve configured that source properly.' +
      ' If using MetaMask, see the following link.' +
      ' Feel free to delete this warning. :)' +
      ' http://truffleframework.com/tutorials/truffle-and-metamask'
    )
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider)
  } else {
    console.warn(
      'No web3 detected. Falling back to http://127.0.0.1:9545.' +
      ' You should remove this fallback when you deploy live, as it\'s inherently insecure.' +
      ' Consider switching to Metamask for development.' +
      ' More info here: http://truffleframework.com/tutorials/truffle-and-metamask'
    )
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'))
  }

  if (module.hot) {
    module.hot.accept()
  }

  App.start()
})
