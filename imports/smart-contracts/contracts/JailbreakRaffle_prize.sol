pragma solidity ^0.4.2;

contract Raffle {
    //////////////////////////////////////////////////////////
    //   Contract Contsruction
    //////////////////////////////////////////////////////////
    string public prizeName;
    uint public numPrizes;

    function Raffle(string _prizeName, uint _numPrizes) {
        prizeName = _prizeName;
        numPrizes = _numPrizes;
    }

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
        stageChanged(uint(stage));
    }
    // Move stage to close registration
    function closeRegistration() public atStage(Stages.Registration) {
        nextStage();
    }

    //////////////////////////////////////////////////////////
    //   Contract variable declaration section
    //////////////////////////////////////////////////////////
    
    // Declare Events
    event ticketRegistered(string _username, address _address, string _prizeName, uint _ticketId, uint _numTicketsTotal);
    event stageChanged(uint _stage);
    event prizeWon(uint _ticketId, string _prize);
    
    // Declare raffle property variables
    uint nonce = 0;
    uint numTicketsTotal = 0;
    uint numUsersTotal = 0;
    
    // Create the ticket object
    struct Ticket{
        address addr;
        bool won;
        uint ticketId;
    }
    
    // Map Ticket ID to Ticket object for each prize pool
    mapping(uint => Ticket) public tickets;
    
    uint[] public registeredTickets;

    //////////////////////////////////////////////////////////
    //   Contract Functionality Section
    //////////////////////////////////////////////////////////
    function generateNewTicket(string username, address userAddress) internal returns (uint) {
        uint ticketID = numTicketsTotal;
        tickets[ticketID].addr = userAddress;
        tickets[ticketID].ticketId = ticketID;
        registeredTickets.push(ticketID);
        numTicketsTotal += 1;
        ticketRegistered(username, userAddress, prizeName, tickets[ticketId].ticketId, numTicketsTotal, numUsersTotal);
        return ticketID;
    }

    function registerTicketsToUser (string username, address userAddress, uint numTickets) atStage(Stages.Registration) {
        numUsersTotal++;
        for (uint i = 0; i < numTickets; i++ ) {
            uint ticketId = generateNewTicket(username, userAddress);
        }
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
        )%maxNum;
        nonce++;
        return random_number;
    }
    
    function randomChoiceFromRegisteredTickets() internal returns(uint choice) {
        uint rand_index = generate_random(registeredTickets.length, 'salting');
        uint winningIndex = registeredTickets[rand_index];
        remove(rand_index);
        return winningIndex;
    }
    
    // Meat of the contract here
    function distributePrizes() public atStage(Stages.Disbursement) {
        for (uint i = 0; i < prizePool.length; i++) {
            uint winner = randomChoiceFromRegisteredTickets();
            tickets[winner].prize = prizePool[i];
            prizeWon(tickets[winner].ticketId, tickets[winner].prize);
        }
        nextStage();
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