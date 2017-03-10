pragma solidity ^0.4.2;

contract JailbreakRaffle {
    //////////////////////////////////////////////////////////
    //   Contract Stage Section
    //////////////////////////////////////////////////////////
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
        stageChanged(uint(stage) + 1);
    }
    // Move stage to close registration
    function closeRegistration() atStage(Stages.Registration) {
        nextStage();
    }

    //////////////////////////////////////////////////////////
    //   Contract variable declaration section
    //////////////////////////////////////////////////////////
    
    // Declare Events
    event ticketRegistered(string _username, address _address, uint _ticketId);
    event stageChanged(uint _stage);
    event prizeWon(address _winningAddress, string _prize);
    
    // Declare raffle property variables
    uint nonce = 0;
    uint numTicketsTotal = 0;
    uint numUsersTotal = 0;
    
    // Declare prizePool
    string[] public prizePool = [
        'ledger nano',
        'tshirt',
        'camera cover'
        ];
    
    // Create the ticket object
    struct Ticket{
        address addr;
        string prize;
    }
    
    // Map Ticket ID to Ticket object
    mapping(uint => Ticket) public tickets;
    uint[] public registeredTickets;

    //////////////////////////////////////////////////////////
    //   Contract Functionality Section
    //////////////////////////////////////////////////////////
    function generateNewTicket(address userAddress) internal {
        uint ticketID = numTicketsTotal;
        tickets[ticketID].addr = userAddress;
        registeredTickets.push(ticketID);
        numTicketsTotal += 1;
    }

    function registerTicketsToUser (string username, address userAddress, uint numTickets) atStage(Stages.Registration) {
        for (uint i = 0; i < numTickets; i++ ) {
            generateNewTicket(userAddress);
            ticketRegistered(username, userAddress, numTicketsTotal);
        }
        numUsersTotal += 1;
    }
    
    function remove(uint index)  internal returns(uint[]) {
        if (index >= registeredTickets.length) return;

        for (uint i = index; i<registeredTickets.length-1; i++){
            registeredTickets[i] = registeredTickets[i+1];
        }
        delete registeredTickets[registeredTickets.length-1];
        registeredTickets.length--;
        return registeredTickets;
    }
    
    function generate_random(uint maxNum, string salt) internal returns (uint) {
        
        uint random_number = ( 
            uint(block.blockhash(block.number-1)) +
            uint(sha3(sha3(salt))) + 
            uint(sha3(nonce))
        )%maxNum + 1;
        nonce++;
        return random_number;
    }
    
    function randomChoiceFromRegisteredTickets() internal returns(uint choice) {
        uint rand_index = generate_random(registeredTickets.length, 'salting');
        choice = registeredTickets[rand_index];
        // remove(rand_index);
        return choice;
    }
    
    // Meat of the contract here
    function distributePrizes() public atStage(Stages.Disbursement) {
        for (uint i; i < prizePool.length; i++) {
            uint winner = randomChoiceFromRegisteredTickets();
            tickets[winner].prize = prizePool[i];
            prizeWon(tickets[winner].addr, tickets[winner].prize);
        }
    }
    
    //////////////////////////////////////////////////////////
    //   Getter functions
    //////////////////////////////////////////////////////////
    
    function getNumUsers() public constant returns (uint) {
        return numUsersTotal;
    } 
    
    function getNumTickets() public constant returns (uint) {
        return numTicketsTotal;
    }

    function getStage() constant public returns (uint d) {
        d = uint256(stage);
    }
}