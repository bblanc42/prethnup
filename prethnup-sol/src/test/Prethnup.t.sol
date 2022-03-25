// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.10;

import "ds-test/test.sol";
import "solmate/utils/SafeTransferLib.sol";
import "../Prethnup.sol";

contract Bob {
    receive() external payable {}
}

contract Alice {
    receive() external payable {}
}

interface CheatCodes {
    function prank(address) external;

    function expectRevert(bytes calldata) external;

    function startPrank(address) external;

    function stopPrank() external;
}

contract PrethnupTest is DSTest {
    CheatCodes cheats = CheatCodes(HEVM_ADDRESS);
    Prethnup prethnup;
    Bob bob;
    Alice alice;

    receive() external payable {}

    function setUp() public {
        prethnup = new Prethnup();
        bob = new Bob();
        alice = new Alice();

        // transfers eth to bob from the test contract
        payable(address(bob)).transfer(2 ether);
        cheats.prank(address(bob));
        prethnup.stake{value: 2 ether}(address(alice), 1 ether);
    }

    function testStake() public {
        (address gotBob, address gotAlice, , , , , uint256 gotAmount) = prethnup
            .pledges(1);
        assertEq(address(prethnup).balance, 1 ether);
        assertEq(gotBob, address(bob));
        assertEq(gotAlice, address(alice));
        assertEq(gotAmount, 1 ether);
    }

    function testStakeTwice() public {
        cheats.prank(address(bob));
        prethnup.stake{value: 0.5 ether}(address(alice), 0.5 ether);
        (, , , , , , uint256 gotAmount) = prethnup.pledges(1);
        assertEq(gotAmount, 1.5 ether);
    }

    function testBobSignBreak() public {
        cheats.prank(address(bob));
        prethnup.signBreak();
        (, , , , bool bobSigned, bool aliceSigned, ) = prethnup.pledges(1);
        assertTrue(bobSigned);
        assertTrue(!aliceSigned);
    }

    function testAliceSignBreak() public {
        cheats.prank(address(alice));
        prethnup.signBreak();
        (, , , , bool bobSigned, bool aliceSigned, ) = prethnup.pledges(1);
        assertTrue(!bobSigned);
        assertTrue(aliceSigned);
    }

    function testOutsiderCannotSignBreak() public {
        cheats.expectRevert(abi.encodeWithSignature("PledgeNotFound()"));
        prethnup.signBreak();
        (, , , , bool bobSigned, bool aliceSigned, ) = prethnup.pledges(1);
        assertTrue(!bobSigned);
        assertTrue(!aliceSigned);
    }

    function testCannotSignBreakTwice() public {
        cheats.startPrank(address(alice));
        prethnup.signBreak();
        cheats.expectRevert(abi.encodeWithSignature("Broke()"));
        prethnup.signBreak();
    }

    function testBobCanWithdraw() public {
        cheats.prank(address(bob));
        prethnup.signBreak();

        cheats.prank(address(alice));
        prethnup.signBreak();

        cheats.prank(address(bob));
        prethnup.withdraw();

        (, , bool bobClaimed, bool aliceClaimed, , , ) = prethnup.pledges(1);

        assertTrue(bobClaimed);
        assertTrue(!aliceClaimed);
        assertEq(address(bob).balance, 1.5 ether);
        assertEq(address(alice).balance, 0);
        assertEq(address(prethnup).balance, 0.5 ether);
    }

    function testAliceCanWithdraw() public {
        cheats.prank(address(bob));
        prethnup.signBreak();

        cheats.startPrank(address(alice));
        prethnup.signBreak();
        prethnup.withdraw();

        (, , bool bobClaimed, bool aliceClaimed, , , ) = prethnup.pledges(1);

        assertTrue(aliceClaimed);
        assertTrue(!bobClaimed);
        assertEq(address(alice).balance, 0.5 ether);
        assertEq(address(bob).balance, 1 ether);
        assertEq(address(prethnup).balance, 0.5 ether);
    }

    function testCannotWithdrawBeforeBothSigned() public {
        cheats.startPrank(address(bob));
        prethnup.signBreak();

        cheats.expectRevert(abi.encodeWithSignature("BothNotConfirmed()"));
        prethnup.withdraw();
        cheats.stopPrank();

        (, , bool bobClaimed, bool aliceClaimed, , , ) = prethnup.pledges(1);
        assertTrue(!aliceClaimed);
        assertTrue(!bobClaimed);
        assertEq(address(prethnup).balance, 1 ether);
    }

    function testBothClaim() public {
        cheats.prank(address(bob));
        prethnup.signBreak();

        cheats.prank(address(alice));
        prethnup.signBreak();

        cheats.prank(address(bob));
        prethnup.withdraw();

        cheats.prank(address(alice));
        prethnup.withdraw();

        (, , bool bobClaimed, bool aliceClaimed, , , ) = prethnup.pledges(1);
        assertTrue(aliceClaimed);
        assertTrue(bobClaimed);
        assertEq(address(alice).balance, 0.5 ether);
        assertEq(address(bob).balance, 1.5 ether);
        assertEq(address(prethnup).balance, 0 ether);
    }

    function testCannotClaimTwice() public {
        cheats.prank(address(bob));
        prethnup.signBreak();

        cheats.prank(address(alice));
        prethnup.signBreak();

        cheats.prank(address(bob));
        prethnup.withdraw();

        cheats.prank(address(alice));
        prethnup.withdraw();

        cheats.expectRevert(abi.encodeWithSignature("Claimed()"));
        cheats.prank(address(bob));
        prethnup.withdraw();
    }
}
