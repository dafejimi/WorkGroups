// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.17;


import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

error WorkGroups__NotOwner();
error WorkGroups__SuperiorRoleRequired();
error WorkGroups__SubordinateRoleRequired();

contract WorkGroups is Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _subordinateID;
    Counters.Counter private _superiorID;

    enum RoleType {
        NONE,
        SUPERIOR,
        SUBORDINATE
    }

    enum Status {
        ISSUED,
        IN_PROGRESS,
        COMPLETE
    }

    struct Superior {
        address superiorAddress;
        RoleType superiorRole;
    }

    struct Subordinate {
        address subordinateAddress;
        RoleType subordinateRole;
        uint256 performanceScore;
    } 

    // implement a task dashboard on the front end
    // implement a departmental/subordinate dashboard also
    struct Task {
        string department;
        string description;
        string location;
        uint256 deadline;
        Status taskStatus;
        Subordinate taskAssignee;
    }

    event DepartmentalSuperiorAssigned(
        string department,
        address superiorAddress,
        bytes32 id
    );

    event DepartmentalSubordinateModified(
        string department,
        address subordinateAddress,
        bytes32 id,
        string modification        
    );

    event DepartmentalSuperiorModified(
        address oldSuperior, 
        address newSuperior,
        string department,
        bytes32 newId
    );

    event TaskIssued(
        string description,
        string location,
        bytes32 taskID,
        Status taskStatus
    );

    event TaskReport(
        bytes32 taskID, 
        string location, 
        Status taskStatus
    );

    event SubordinateAppraisal(
        address subordinateAddress,
        uint256 performanceScore
    );

    address public admin;

    mapping(string => mapping(bytes32 => Task)) departmentalTask;

    mapping(string => mapping(bytes32 => Superior)) public departmentalSuperior;
    mapping(string => mapping(address => bool)) departmentalSuperiorToBool;

    mapping(string => mapping(bytes32 => Subordinate)) departmentalSubordinate;
    mapping(string => mapping(address => bool)) departmentalSubordinateToBool;
    
    mapping(string => mapping(address => RoleType)) public departmentalRoles;
    

    modifier onlySuperior(string memory department, bytes32 superiorId) {
        bool hierarchyStatus = getSuperiorStatus(department, superiorId);
        if (hierarchyStatus != true) {
            revert WorkGroups__SuperiorRoleRequired();
        }
        _;
    }

    modifier onlySubordinate(string memory department,bytes32 subordinateId) {
        bool hierarchyStatus = getSubordinateStatus(department, subordinateId);
        if (hierarchyStatus != true) {
            revert WorkGroups__SubordinateRoleRequired();
        }
        _;
    }

    modifier onlyAdmin() {
        if (msg.sender != admin) revert WorkGroups__NotOwner();
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function appointSuperior(
        string memory department,
        address superiorAddress
    ) public onlyAdmin {
        _superiorID.increment();
        uint256 newSuperiorId = _superiorID.current();
        Superior memory newSuperior = Superior(superiorAddress, RoleType.SUPERIOR);
        bytes32 superiorID = keccak256(bytes(abi.encode(department, newSuperiorId)));      

        departmentalSuperior[department][superiorID] = newSuperior;
        departmentalSuperiorToBool[department][superiorAddress] = true;
        departmentalRoles[department][superiorAddress] = RoleType.SUPERIOR;

        emit DepartmentalSuperiorAssigned(
            department,
            superiorAddress,
            superiorID
        );
    }

    function addSubordinate(
        address subordinateAddress,
        string memory department,
        bytes32 superiorId
    ) public onlySuperior(department, superiorId) {
        _subordinateID.increment();
        uint256 newSubordinateId = _subordinateID.current();
        Subordinate memory newSubordinate = Subordinate(subordinateAddress, RoleType.SUBORDINATE, 0);
        bytes32 subordinateID = keccak256(bytes(abi.encode(department, newSubordinateId)));


        departmentalSubordinate[department][subordinateID] = newSubordinate;
        departmentalRoles[department][subordinateAddress] = RoleType.SUBORDINATE;
        departmentalSubordinateToBool[department][newSubordinate.subordinateAddress] = true;

        emit DepartmentalSubordinateModified(department, subordinateAddress, subordinateID, "added");
    }

    function removeSubordinate(
        bytes32 superiorId,
        bytes32 subordinateId, 
        string memory department
    ) public onlySuperior(department, superiorId) {
        Subordinate memory existingSubordinate = departmentalSubordinate[department][subordinateId];

        departmentalRoles[department][existingSubordinate.subordinateAddress] = RoleType.NONE;
        departmentalSubordinateToBool[department][existingSubordinate.subordinateAddress] = false;

        emit DepartmentalSubordinateModified(department, existingSubordinate.subordinateAddress, subordinateId, "removed");
    }

    function upgradeSubordinate(
        string memory department,
        address oldSuperior, 
        address newSuperior, 
        bytes32 subordinateID
    ) public onlyAdmin {
        _superiorID.increment();
        uint256 newSuperiorId = _superiorID.current();
        Superior memory superior = Superior(newSuperior, RoleType.SUPERIOR);
        bytes32 superiorId = keccak256(bytes(abi.encode(department, newSuperiorId)));

        Subordinate memory existingSubordinate = departmentalSubordinate[department][subordinateID];

        if(departmentalSubordinateToBool[department][existingSubordinate.subordinateAddress] == true){
            departmentalSubordinateToBool[department][existingSubordinate.subordinateAddress] = false;
        }

        departmentalSuperior[department][superiorId] = superior;

        departmentalSuperiorToBool[department][oldSuperior] = false;
        departmentalSuperiorToBool[department][existingSubordinate.subordinateAddress] = true;

        departmentalRoles[department][oldSuperior] = RoleType.NONE;
        departmentalRoles[department][newSuperior] = RoleType.SUPERIOR;

        emit DepartmentalSuperiorModified(oldSuperior, newSuperior, department, superiorId);
    }

    function issueTask(
        bytes32 superiorId,
        bytes32 subordinateID,
        string memory description,
        string memory location,
        string memory department,
        uint256 numberOfDays
    ) public onlySuperior(department, superiorId) {
        uint deadline = block.timestamp + (numberOfDays * 1 days);
        Subordinate memory subordinate = departmentalSubordinate[department][subordinateID];
        Task memory newTask = Task(department, description, location, deadline, Status.ISSUED, subordinate );        

        bytes32 taskID = keccak256(bytes(string.concat(description, location)));

        departmentalTask[department][taskID] = newTask;

        emit TaskIssued(description, location, taskID, newTask.taskStatus);
    }

    function reportTask(
        bytes32 taskID,
        bytes32 subordinateId,
        string memory location,
        string memory department,
        uint256 statusNumber
    ) public onlySubordinate(department, subordinateId) {
        Status taskStatus;

        if (statusNumber == 1) {
            taskStatus = Status.IN_PROGRESS;
        } else {
            // notify user to select 1 or 2
            taskStatus = Status.COMPLETE;
        }

        Task memory existingTask = departmentalTask[department][taskID];

        require(
            msg.sender == existingTask.taskAssignee.subordinateAddress,
            "Incorrect "
        );

        existingTask.location = location;
        existingTask.taskStatus = taskStatus;

        emit TaskReport(taskID, location, taskStatus);
    }

    function performTaskAppraisal(
        bytes32 taskId,
        bytes32 superiorId,
        bytes32 subordinateId,
        string memory department
    ) public onlySuperior(department, superiorId) {
        Task memory existingTask = departmentalTask[department][taskId];
        Subordinate memory currentSubordinate = departmentalSubordinate[department][subordinateId];

        if (block.timestamp > existingTask.deadline) {
            if (existingTask.taskStatus == Status.COMPLETE) {
                currentSubordinate.performanceScore += 1;
            } else {
                currentSubordinate.performanceScore -= 1;
            }
        } else {
            return;
        }

        emit SubordinateAppraisal(
            currentSubordinate.subordinateAddress,
            currentSubordinate.performanceScore
        );
    }

    function getSuperiorStatus(
        string memory department, 
        bytes32 superiorId
    ) public view returns (bool) {
        RoleType hierarchyRole = departmentalRoles[department][msg.sender];

        address superiorAdress = departmentalSuperior[department][superiorId].superiorAddress;
        bool superiorStatus = departmentalSuperiorToBool[department][superiorAdress];

        if (hierarchyRole == RoleType.SUPERIOR && superiorStatus == true) {
            return true;
        } else {
            return false;
        }
    }

    function getSubordinateStatus(
        string memory department,
        bytes32 subordinateId
    ) public view returns (bool) {
        RoleType hierarchyRole = departmentalRoles[department][msg.sender];

        address subordinateAddress = departmentalSubordinate[department][subordinateId].subordinateAddress;
        bool subordinateStatus = departmentalSubordinateToBool[department][subordinateAddress];

        if (hierarchyRole == RoleType.SUBORDINATE && subordinateStatus == true) {
            return true;
        } else {
            return false;
        }
    }

    function getTask(string memory department, bytes32 taskID) public view returns (Task memory) {
        Task memory existingTask = departmentalTask[department][taskID];
        return existingTask;
    }

    function getSuperior(string memory department, bytes32 superiorID) public view returns(Superior memory) {
        Superior memory existingSuperior = departmentalSuperior[department][superiorID];
        return existingSuperior;
    }

    function getSubordinate(string memory department, bytes32 subordinateID) public view returns (Subordinate memory) {
        Subordinate memory existingSubordinate = departmentalSubordinate[department][subordinateID];
        return existingSubordinate;
    }

} 

/*

bytes public hierarchySetID
mapping(Hierarchy => mapping(string => Hierarchy[])) public nestedDeptHierarchies;

function nestWorkGroups(
    string memory department, 
    bytes32 superiorId
) public onlySuperior(department, superiorId) {
        
}

function modifyHierarchySets() onlyAdmin returns () {
        
}
function checkUpkeep(
    bytes calldata checkData
) public view returns (bool, bytes memory) {
    address wallet = abi.decode(checkData, (address));
    return (wallet.balance < 1 ether, bytes(""));
}

Keeper, Vrf, Functions, Data Feeds

*/
