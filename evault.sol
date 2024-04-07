//SPDX-License-Identifier:MIT
pragma solidity ^0.8.13;

import "../lib/openzeppelin-contracts/contracts/access/AccessControl.sol"; 

contract evault is AccessControl
{
    // address private admin;

    // setting the admin role
    bytes32 public constant ADMIN = keccak256("ADMIN");
    bytes32 public constant RECIPIENT = keccak256("RECIPIENT");
    bytes32 public constant POLICE = keccak256("POLICE");
    bytes32 public constant CLIENT = keccak256("CLIENT");
    bytes32 public constant JUDGE = keccak256("JUDGE");

    constructor() {
        // setup roles to the people
        _setupRole(ADMIN, msg.sender);
        /*
        _setupRole(CLIENT, CLIENT);
        _setupRole(POLICE, POLICE);
        _setupRole(JUDGE, JUDGE);
        */
        _setRoleAdmin(ADMIN, ADMIN);
        _setRoleAdmin(CLIENT, ADMIN);
        _setRoleAdmin(RECIPIENT, ADMIN);
    }

    modifier onlyAdmin() {
        require(hasRole(ADMIN, msg.sender), "only admin can access");
        _;
    }
    
    struct Document
    {
        string hash;
        address issuer;
        address recipient;
        uint256 timestamp;
    }
    mapping(uint => Document) documents;

    event documentIssued(uint256 indexed documentid_, string hash_, address indexed issuer_, address indexed recipient_);
    event documentReceived(uint256 indexed documentid_, address indexed recipient_);

    struct Folder
    {
        Document[] documents;
        address[] allowedAddresses;
    }

    
    address[] userID; // keep track of all the users/recipients

    mapping(address => Folder[]) folders; // map the users to their folders

    function issueDocument(string memory hash_, address recipient_) public onlyRole(ADMIN) {
        uint256 documentID = 0;
        documents[documentID] = Document(hash_, msg.sender, recipient_, block.timestamp); // add the documents to document mappings
        _grantRole(RECIPIENT, recipient_);
        emit documentIssued(documentID, hash_, msg.sender, recipient_);

        /* now we need logic to add this document to the folders */
        Folder.documents.push(Document(hash_, msg.sender, recipient_, block.timestamp));
        Folder.allowedAddresses.push(recipient_);
        folders[recipient_] = Folder[documentID];
        
        documentID++;
    }

    /* 
    while calling this function ensure that the address calling this function should be the recipient of the same document.(msg.sender) 
    the recipient field of the document should have the same address as the address that is calling the function
    */
    function receiveDocument(uint256 id_) public onlyRole(RECIPIENT) {
        Document storage document = documents[id_];
        require(document.recipient == msg.sender, "You are not the recipient");
        emit documentReceived(id_, msg.sender);
    }

}
