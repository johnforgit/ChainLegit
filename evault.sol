//SPDX-License-Identifier:MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/AccessControl.sol"; 

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
        _grantRole(ADMIN, msg.sender);
        // _grantRole(DEFAULT_ADMIN_ROLE, minter);
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
        string Hash;
        address issuer;
        address recipient;
        uint256 timestamp;
    }
    mapping(uint256 => Document) documents;

    event documentIssued(uint256 indexed documentid_, string hash_, address indexed issuer_, address indexed recipient_);
    event documentReceived(uint256 indexed documentid_, address indexed recipient_);

/*
    struct Folder
    {
        mapping(uint => Document) documents;
        address[] allowedAddresses;
    }
*/

    // mapping(uint => Document[]) Folder;
    struct Folder
    {
        uint256 folderID;
        Document[] documents;
    }

    address[] userIDs; // keep track of all the users/recipients
    mapping(address => Folder[]) userFolders; // map the users to their folders

    // function to add a user
    function addUser(address userid_) public onlyRole(ADMIN) {
        userIDs.push(userid_);
    }

/*
    function issueDocument(string memory hash_, address recipient_) public onlyRole(ADMIN) {
        uint256 documentID = 0;
        uint256 folderID = 0;
        // add the documents to document mappings
        Document memory newDoc = Document(hash_, 
                                           msg.sender, 
                                           recipient_, 
                                           block.timestamp);
        documents[documentID] = newDoc;
        _grantRole(RECIPIENT, recipient_);
        emit documentIssued(documentID, hash_, msg.sender, recipient_);

        Folder memory newFolder = Folder(folderID, documents.push(newDoc));
        userFolders[recipient_] = newFolder;

        // adding the recipient to the list of recipients
        userIDs.push(recipient_);
        
        documentID++;
        folderID++;
    }
*/
    function issueDocument(string memory hash_, address recipient_) public onlyRole(ADMIN) {
    uint256 documentID = 0; // This should be incremented properly for each document
    uint256 folderID = 0;   // This should be incremented properly for each folder

    // Add the document to document mappings
    documents[documentID] = Document(hash_, msg.sender, recipient_, block.timestamp); 
    _grantRole(RECIPIENT, recipient_);
    emit documentIssued(documentID, hash_, msg.sender, recipient_);

    // Add the document to the recipient's folder
    Document memory newDoc = Document(hash_, msg.sender, recipient_, block.timestamp);
    userFolders[recipient_].push(newDoc); // Push the new document into the existing array of documents
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

    /* 
    need function to add a document
    */
    function addDocument(uint256 documentid_) public onlyRole(ADMIN) {

    }

    // Function to grant the RECIPIENT_ROLE to a new address
    function grantRecipientRole(address account) public onlyRole(ADMIN) {
        _grantRole(RECIPIENT, account);
    }

    // Function to revoke the RECIPIENT_ROLE from an address
    function revokeRecipientRole(address account) public onlyRole(ADMIN) {
        _revokeRole(RECIPIENT, account);
    }

    // function for the recipient to renounce their role
    function renounceRecipient(address recipientadd_) public onlyRole(RECIPIENT) {
        renounceRole(RECIPIENT, recipientadd_);
    }

}
