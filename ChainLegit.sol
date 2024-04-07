// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract FileManagement {
    struct File {
        string name;
        string description;
        string url;
        uint256 timestamp;
    }

    struct Folder {
        string name;
        address[] allowedUsers;
        mapping(uint256 => File) files;
        uint256 fileCount;
    }

    struct User {
        mapping(uint256 => Folder) folders;
        uint256 folderCount;
    }

    mapping(address => User) private users;

    function createUser() external {
        require(users[msg.sender].folderCount == 0, "User already exists");
        users[msg.sender].folderCount++;
    }
 function createFolder(string memory folderName) external {
    User storage user = users[msg.sender];
    uint256 folderId = user.folderCount;
    user.folders[folderId].name = folderName;
    user.folders[folderId].allowedUsers.push(msg.sender); // Fix here
    user.folderCount++;
}

    function grantPermission(address owner, uint256 folderId, address newOwner) external {
        User storage user = users[owner];
        user.folders[folderId].allowedUsers.push(newOwner);
    }

    function addFile(
        address userAddress,
        uint256 folderId,
        string memory fileName,
        string memory fileDescription,
        string memory fileUrl
    ) external {
        User storage user = users[userAddress];
        require(folderId < user.folderCount, "Invalid folder ID");

        Folder storage folder = user.folders[folderId];
        uint256 fileId = folder.fileCount;
        folder.files[fileId] = File(fileName, fileDescription, fileUrl, block.timestamp);
        folder.fileCount++;
    }

    function getFolderFiles(address userAddress, uint256 folderId)
        internal
        view
        returns (File[] memory)
    {
        User storage user = users[userAddress];
        require(folderId < user.folderCount, "Invalid folder ID");

        Folder storage folder = user.folders[folderId];
        File[] memory files = new File[](folder.fileCount);
        for (uint256 i = 0; i < folder.fileCount; i++) {
            files[i] = folder.files[i];
        }
        return files;
    }

    function getUserDetails(address userAddress) external view returns (string[] memory, File[][] memory) {
        User storage user = users[userAddress];
        string[] memory folderNames = new string[](user.folderCount);
        File[][] memory filesList = new File[][](user.folderCount);

        for (uint256 i = 0; i < user.folderCount; i++) {
            folderNames[i] = user.folders[i].name;
            filesList[i] = getFolderFiles(userAddress, i);
        }

        return (folderNames, filesList);
    }

    function getFolderDetails(address userAddress, uint256 folderId)
        external
        view
        returns (string memory, File[] memory)
    {
        User storage user = users[userAddress];
        require(folderId < user.folderCount, "Invalid folder ID");
        Folder storage folder = user.folders[folderId];
        
        // Check if caller has access to this folder
       bool hasAccess = false;
    for (uint256 i = 0; i < folder.allowedUsers.length; i++) {
    if (folder.allowedUsers[i] == msg.sender) {
        hasAccess = true;
        break;
    }
}
require(hasAccess, "Caller has no access to this folder");

        return (folder.name, getFolderFiles(userAddress, folderId));
    }

    function isUserRegistered(address userAddress) external view returns (bool) {
        return users[userAddress].folderCount > 0;
    }

    function getFolderNames(address userAddress) external view returns (string[] memory) {
        User storage user = users[userAddress];
        string[] memory folderNames = new string[](user.folderCount);

        for (uint256 i = 0; i < user.folderCount; i++) {
            folderNames[i] = user.folders[i].name;
        }

        return folderNames;
    }
}
