## 最终报告

#### 源码github地址：
	[https://github.com/linqy71/projectOfBlockChain](https://github.com/linqy71/projectOfBlockChain)

#### 选题背景、依据

对于大学校园里的学生，老师，或者员工，身处校园中要证明自己的身份较为容易，但是脱离了校园的环境之后需要有一个平台来帮助证明自己的身份。在证明身份的同时，有时候希望向他人展示自己已获得的成果。
区块链具有公开可验证和不可篡改的特性，因此可以将身份存储在区块链上，作为一种证明，当需要向别人证明身份的时候，区块链就是一个相当可靠的平台。因此，希望用区块链搭建一个可供他人查询身份以及奖项信息的平台，用户可以注册自己的身份，添加自己的奖项并决定可见性，他人只能查询到可见的奖项。当遇到需要出示身份证明的场合，只需要提供自己在区块链上的地址，即可让对方查询到自己的身份。

#### 使用说明
- 环境：Windows10
- 工具：
	- Truffle v4.1.14 (core: 4.1.14)
	- Solidity v0.4.24 (solc-js)
	- EthereumJS TestRPC v6.0.3 (ganache-core: 2.0.2)
- 步骤：
	- 首先打开命令行运行testrpc：`testrpc`
	- 然后在项目所在文件夹调出另外一个命令行输入`truffle migrate`部署智能合约
	- 然后输入`npm run dev`启动服务
	- 用浏览器打开http://127.0.0.1:8080 即可显示页面

1. 初次打开页面时有个默认账号。
![](https://i.loli.net/2018/12/31/5c29cc6bae9ea.png)
2. 点击右上角的切换账号按钮可以切换账号，输入正确的账号并点击登录按钮可以成功切换账号。
![](https://i.loli.net/2018/12/31/5c29bed83ba68.png)
3. 注册身份部分，输入姓名，id，身份，点击注册即可。
![](https://i.loli.net/2018/12/31/5c29be3a4a13e.png)
4. 查询身份部分，输入想要查询的账号，点击查询，若该用户已注册则显示已经注册的身份信息，否则提示该用户未注册。
![](https://i.loli.net/2018/12/31/5c29bf9fcee20.png)
5. 添加奖项部分，输入奖项描述，点击添加，可以添加想要记录的奖项信息，下方单选按钮可以设置奖项可见性，若设为不可见则他人无法查看。
![](https://i.loli.net/2018/12/31/5c29bff5d45d0.png)
6. 查询奖项部分，点击“查看我的所有奖项”按钮会显示当前用户所有的奖项，包括可见与不可见；输入想要查询的账号点击“查看他的所有奖项”可以查看该用户所有可见奖项。
![](https://i.loli.net/2018/12/31/5c29c79c57b74.png)
![](https://i.loli.net/2018/12/31/5c29c7d48dbda.png)


#### 测试
1. 切换账号功能
	- 输入无效地址，提示登录失败
	![](https://i.loli.net/2018/12/31/5c29c83d93218.png)

	- 输入正确地址，登录成功
	![](https://i.loli.net/2018/12/31/5c29c8afe66ca.png)

2. 查询身份功能：
	- 查询未注册账号：
	![](https://i.loli.net/2018/12/31/5c29c9b4b3c62.png)

3. 查看未注册或者未添加奖项的账户的奖项：
	![](https://i.loli.net/2018/12/31/5c29cab1d22b9.png)