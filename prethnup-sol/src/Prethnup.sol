// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.10;

import "solmate/utils/SafeTransferLib.sol";

contract Prethnup {
    error Claimed();
    error Broke();
    error PledgeNotFound();
    error BothNotConfirmed();

    mapping(address => uint256) private ownerToPledgeId;
    mapping(uint256 => Pledge) public pledges;
    uint256 private pledgeId = 1;

    struct Pledge {
        address owner;
        address other;
        bool ownerClaimed;
        bool otherClaimed;
        bool ownerSigned;
        bool otherSigned;
        uint256 amount;
    }

    event Stake(address _staker, address _otherHalf, uint256 _amount);
    event Break(address _user, bool _ownerSigned, bool _otherSigned);
    event Withdraw(address _staker, uint256 _amount);

    receive() external payable {}

    function stake(address _otherHalfAddr, uint256 _amount) external payable {
        address owner = msg.sender;
        require(msg.value >= _amount && _amount > 0, "Bad staking amount");

        if (ownerToPledgeId[owner] == 0) {
            Pledge memory p = Pledge(
                owner,
                _otherHalfAddr,
                false,
                false,
                false,
                false,
                _amount
            );
            pledges[pledgeId] = p;
            ownerToPledgeId[owner] = pledgeId;
            ownerToPledgeId[_otherHalfAddr] = pledgeId;
            pledgeId += 1;
        } else {
            Pledge storage p = pledges[ownerToPledgeId[owner]];
            p.amount += _amount;
        }

        SafeTransferLib.safeTransferETH(msg.sender, _amount);

        emit Stake(owner, _otherHalfAddr, _amount);
    }

    function signBreak() external {
        address owner = msg.sender;
        uint256 ownerPledgeId = ownerToPledgeId[owner];

        if (ownerPledgeId == 0) {
            revert PledgeNotFound();
        }

        Pledge storage p = pledges[ownerPledgeId];

        if (p.owner == owner && !p.ownerSigned) {
            p.ownerSigned = true;
        } else if (p.other == owner && !p.otherSigned) {
            p.otherSigned = true;
        } else {
            revert Broke();
        }

        emit Break(owner, p.ownerSigned, p.otherSigned);
    }

    function withdraw() external {
        address owner = msg.sender;
        uint256 ownerPledgeId = ownerToPledgeId[owner];

        if (ownerPledgeId == 0) {
            revert PledgeNotFound();
        }

        Pledge storage p = pledges[ownerPledgeId];

        if (!p.ownerSigned || !p.otherSigned) {
            revert BothNotConfirmed();
        }

        require(p.amount != 0, "Nothing to withdraw");

        if (p.owner == owner && !p.ownerClaimed) {
            p.ownerClaimed = true;
        } else if (p.other == owner && !p.otherClaimed) {
            p.otherClaimed = true;
        } else {
            revert Claimed();
        }

        uint256 payout = p.amount / 2;

        SafeTransferLib.safeTransferETH(owner, payout);

        emit Withdraw(owner, payout);
    }
}
