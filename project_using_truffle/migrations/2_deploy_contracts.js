var ConvertLib = artifacts.require('./ConvertLib.sol')
var verifyIdInSYSU = artifacts.require('./contracts/verifyIdInSYSU.sol')

module.exports = function (deployer) {
  deployer.deploy(ConvertLib)
  deployer.link(ConvertLib, verifyIdInSYSU)
  deployer.deploy(verifyIdInSYSU)
}
