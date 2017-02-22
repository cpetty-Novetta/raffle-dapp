pragma solidity ^0.4.2;

import "./HumanStandardToken.sol";

contract JailbreakRaffle {
    HumanStandardToken newToken;
    // Constructor, run at deployment
    function JailbreakRaffle(uint256 _initialAmount, string _name, uint8 _decimals, string _symbol) public {
        newToken = (new HumanStandardToken(_initialAmount, _name, _decimals, _symbol));
        mainRaffle.raffleOwner = this;
        mainRaffle.raffleFund = _initialAmount;
    }
    
    enum Stages {
        Registration,
        Disbursement,
        Finished
    }

    // This is the current contract stage
    Stages public stage = Stages.Registration;
    
    // For checking if function call is appropriate to current stage
    modifier atStage(Stages _stage) {
        if(stage != _stage) {
            throw;
        }
        _;
    }

    // For moving through contract stages
    function nextStage() internal {
        stage = Stages(uint(stage) + 1);
    }

    // Get the current stage
    function getStage() constant public returns (uint d) {
        d = uint256(stage);
    }

    event userRegister(string _username, address _address);
    
    struct User {
        string email;
        string username;
        string companyName;
        string reasonHere;
        uint numTickets;
    }
    
    mapping(address => User) users;
    address[] public userList;
    
    struct raffleData {
        uint raffleFund;
        address raffleOwner;
        uint256 numTotalTickets;
        uint numPrizes;
        uint numUsers;
        uint winningNumber;
    } 
    // Instantiate raffleData struct
    raffleData public mainRaffle;
    
    
    // A registered user should get tickets for every entry they provide Novetta
    //   it is assumed the client sends well-formed data, or '0' for null
    //     - email - 1 ticket
    //     - phone - 1 ticket
    //     - current employer - 1 ticket
    //     - how you heard - 1 ticket
    function registerUser (address userAddress, string username, string email, string companyName, string reasonHere) public atStage(Stages.Registration) {
        users[userAddress].numTickets = 1;
        users[userAddress].username = username;
        users[userAddress].email = email;
        if (bytes(email).length != 0) {
            users[userAddress].numTickets += 1;
        } 
        users[userAddress].companyName = companyName;
        if (bytes(companyName).length != 0) {
            users[userAddress].numTickets += 1;
        } 
        users[userAddress].reasonHere = reasonHere;
        if (bytes(reasonHere).length != 0) {
            users[userAddress].numTickets += 1;
        } 
        mainRaffle.numUsers += 1;
        
        mainRaffle.numTotalTickets += users[userAddress].numTickets;
        // Add user address to list for later iteration
        userList.push(userAddress);
        userRegister(username, userAddress);
    }
    
    function getNumUsers() public constant returns (uint) {
        return mainRaffle.numUsers;
    } 
    
    function getNumTickets() public constant returns (uint) {
        return mainRaffle.numTotalTickets;
    }
    
    function getUserInfo(address userAddress) public constant returns (uint, uint256) {
        return (users[userAddress].numTickets, newToken.balanceOf(userAddress));
    }
    
    function closeRegistration() atStage(Stages.Registration) {
        nextStage();
    }

    function distributeFunds() atStage(Stages.Disbursement) {
        // TODO: add `atStage` modifier for disbursement stage only
        // for now, lets just distribute evenly
        uint256 tokensPerTicket = mainRaffle.raffleFund / mainRaffle.numTotalTickets;
        for (uint i = 0; i < userList.length; i++) {
            newToken.transfer(userList[i], tokensPerTicket * users[userList[i]].numTickets );   
        }
        nextStage();
    }

    function getUserBalance( address userAddress ) returns (uint) {
        return newToken.balanceOf(userAddress);
    }

    function getFundBalance() public constant returns (uint) {
        return newToken.balanceOf(this);
    }

}
