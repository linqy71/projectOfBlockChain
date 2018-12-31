pragma solidity ^0.4.24;
pragma experimental ABIEncoderV2;

contract verifyIdInSYSU{


    struct Person{
        string name;
        string id;
        string status;
        mapping (int => string) awards;
        mapping (int => bool) readable;
        int awardsNum;
    }

    event managerAcceptRegister(address register, string status);
    event hasRegistered(address curPerson, string name, string id, string status);
    event hasnotRegistered(address curPerson);
    event registerSuccess(address curPerson, string name, string status);
    event showStatus(address targetPerson, string name, string status);
    event addAwardSuccess(address curPerson, int awardsNum, string description);
    event showMyAwards(address curPerson, int sum, string[] all);
    event setVisibilitySuccess(int pos, string description, bool visible);
    event showOthersAward(address target, string[] result);

    address manager;//管理员
    mapping (address => Person) public people;

    constructor() public {
        manager = msg.sender;
        //people[manager].name = name;
    }

    //验证id对应的身份是否真实
    function verify(string memory id, string memory status) internal returns(bool state){
        state = true;
    }


    //注册自己的身份信息
    function registerStatus(string memory name, string memory id, string memory status) public returns(bool result) {
        address curPerson = msg.sender;
        if(keccak256(people[curPerson].name) != keccak256("") ){
            emit hasRegistered(curPerson, name, id, status);
            return false;//注册过了
        }

        people[curPerson].name = name;
        people[curPerson].id = id;
        people[curPerson].awardsNum = 0;

        bool state = verify(id, status);

        if(state){
            people[curPerson].status = status;
            emit managerAcceptRegister(curPerson, status);
            emit registerSuccess(curPerson, name, status);
        } else {
            people[curPerson].status = "非中大成员";
        }
        return true;
    }

    // 显示身份
    function getStatus(address _ps) public returns(string memory){
        emit showStatus(_ps, people[_ps].name, people[_ps].status);
        if(keccak256(people[_ps].name) == keccak256("") ){
            return "未注册";// 还没注册
        }
        return people[_ps].status;
    }


    function verifyAward(address curPerson, string memory description) internal returns(bool){
        return true;
    }

    //添加自己的奖项
    function addAward(string memory description, uint visibility) public returns(bool) {
        address curPerson = msg.sender;
        if(keccak256(people[curPerson].name) == keccak256("")){
            emit hasnotRegistered(curPerson);
            return false;//未注册
        }
        bool result = verifyAward(curPerson, description);
        if(result){
            int pos = people[curPerson].awardsNum;
            people[curPerson].awards[pos] = description;
            people[curPerson].awardsNum += 1;
            emit addAwardSuccess(curPerson, pos, description);
        }

        if(visibility == 1){
          setVisible(people[curPerson].awardsNum - 1);
        } else {
          setInvisible(people[curPerson].awardsNum - 1);
        }

        return true;
    }

    //查看自己所有奖项
    function showAllAwards() public returns(string [] memory){
        address curPerson = msg.sender;
        string[] memory all = new string[](10);
        if(people[curPerson].awardsNum <= 0){
          return all;
        } else {
            int sum = people[curPerson].awardsNum;
            if(sum > 10){
                all = new string[](10*5);
            }
            uint cnt = 0;
            for(int i = 0; i < sum; i++){
                all[cnt] = people[curPerson].awards[i];
                cnt++;
            }
        }
        emit showMyAwards(curPerson, sum, all);
        return all;
    }

    //设置奖项为可见
    function setVisible(int pos) public {
        address curPerson = msg.sender;
        people[curPerson].readable[pos] = true;
        string memory description = people[curPerson].awards[pos];
        emit setVisibilitySuccess(pos, description, true);
    }

    //设置奖项为不可见
    function setInvisible(int pos) public {
        address curPerson = msg.sender;
        people[curPerson].readable[pos] = false;
        string memory description = people[curPerson].awards[pos];
        emit setVisibilitySuccess(pos, description, false);
    }

    //查看别人的奖项信息
    function getAwardInfo(address target) public returns(string [] memory) {
        int sum = people[target].awardsNum;
        string[] memory result = new string[](10);
        if(sum > 10){
            result = new string[](10*5);
        }
        uint cnt = 0;
        if(sum > 0){
            for(int i = 0; i < sum; i++){
                if(people[target].readable[i]){
                    result[cnt++] = people[target].awards[i];
                }
            }
        }
        emit showOthersAward(target, result);
        return result;
    }


}
