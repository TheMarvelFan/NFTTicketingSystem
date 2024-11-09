// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol";
import "./Counters.sol";

contract TicketNFT is ERC721Pausable, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct Event {
        uint256 eventId;
        address organizer;
        uint256 ticketPrice;
        uint256 totalTickets;
        uint256 remainingTickets;
        bool isActive;
    }

    struct Ticket {
        uint256 eventId;
        string qrCode;
        bool isUsed;
        uint256 purchaseTime;
    }

    mapping(uint256 => Event) public events;
    mapping(uint256 => Ticket) public tickets;
    mapping(address => bool) public verifiers;

    uint256 private eventCounter;

    event EventCreated(uint256 indexed eventId, address organizer, uint256 ticketPrice);
    event TicketMinted(uint256 indexed tokenId, uint256 indexed eventId, address buyer);
    event TicketUsed(uint256 indexed tokenId, uint256 indexed eventId);

    constructor(address initialOwner) ERC721("Concert Ticket", "TCKT") Ownable(initialOwner) {}

    function createEvent(uint256 _ticketPrice, uint256 _totalTickets)
    external
    returns (uint256)
    {
        eventCounter++;
        events[eventCounter] = Event(
            eventCounter,
            msg.sender,
            _ticketPrice,
            _totalTickets,
            _totalTickets,
            true
        );

        emit EventCreated(eventCounter, msg.sender, _ticketPrice);
        return eventCounter;
    }

    function mintTicket(uint256 _eventId, string memory _qrCode)
    external
    payable
    returns (uint256)
    {
        Event storage event_ = events[_eventId];
        require(event_.isActive, "Event does not exist or is not active");
        require(event_.remainingTickets > 0, "No tickets available");
        require(msg.value >= event_.ticketPrice, "Insufficient payment");

        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        _safeMint(msg.sender, newTokenId);

        tickets[newTokenId] = Ticket(
            _eventId,
            _qrCode,
            false,
            block.timestamp
        );

        event_.remainingTickets--;

        // Transfer payment to event organizer
        payable(event_.organizer).transfer(msg.value);

        emit TicketMinted(newTokenId, _eventId, msg.sender);
        return newTokenId;
    }

    function addVerifier(address _verifier) external onlyOwner {
        verifiers[_verifier] = true;
    }

    function useTicket(uint256 _tokenId)
    external
    {
        require(verifiers[msg.sender], "Not authorized to verify tickets");
        require(!tickets[_tokenId].isUsed, "Ticket already used");

        tickets[_tokenId].isUsed = true;
        emit TicketUsed(_tokenId, tickets[_tokenId].eventId);
    }

    function getTicketDetails(uint256 _tokenId)
    external
    view
    returns (Ticket memory)
    {
        return tickets[_tokenId];
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }
}
