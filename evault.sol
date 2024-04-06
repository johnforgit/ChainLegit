//SPDX-License-Identifier:MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol"; 

contract evault is Ownable
{
    address private admin;

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(admin == msg.sender,"You are not the admin");
        _;
    }

    struct User
    {
        address user;
        string name;

    }
    User[] users;
   //  event userAdded(uint id,string name);

    struct Document
    {
        uint documentID;
        string name;
        address[] accessible;
    }
    Document[] documents;


    function addUser(address id_, string memory name_) public onlyAdmin {
        users.push(User(id_,name_));
        // emit userAdded(id_,name_);
    }

    function getUsers() public onlyAdmin returns(User[] memory) {
        return users;
    }

    function addDocument(uint id_, string memory name_, address[] memory address_) public onlyAdmin {
        documents.push(Document(id_, name_, address_));
    }

    function grantAccess(address id_,uint256 documentid_) public onlyAdmin {
        uint i;
        uint pos;
        for(i = 0;i < documents.length;i++) {
            if(documentid_ == documents[i].documentID) pos = i;
        }
        documents[pos].accessible.push(id_);
    }

    function approveUser(address id_) private onlyAdmin {

    }
}