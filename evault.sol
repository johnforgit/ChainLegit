//SPDX-License-Identifier:MIT
pragma solidity ^0.8.13;

import "../lib/openzeppelin-contracts/contracts/access/AccessControl.sol"; 

contract evault is AccessControl
{
    // address private admin;

    // setting the admin role
    bytes32 public constant ADMIN = keccak256("ADMIN");
    bytes32 public constant POLICE = keccak256("POLICE");
    bytes32 public constant CLIENT = keccak256("CLIENT");
    bytes32 public constant JUDGE = keccak256("JUDGE");

    constructor() {
        // setup roles to the people
        _setupRole(ADMIN, msg.sender);
        _setupRole(CLIENT, CLIENT);
        _setupRole(POLICE, POLICE);
        _setupRole(JUDGE, JUDGE);
        _setRoleAdmin(ADMIN, ADMIN);
        _setRoleAdmin(CLIENT, ADMIN);
        /*
        
        _setRoleAdmin(RECIPIENT_ROLE, ISSUER_ROLE);
        */
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

    
    address[] userID; // keep track of all the users

    mapping(address => Folder[]) folders; // map the users to their folders


}