import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract, ContractFactory } from "ethers";

describe("### ERC20 Tokens Test ###", function () {
    let tokenA_factory: ContractFactory;
    let tokenB_factory: ContractFactory;
    let tokenA: Contract;
    let tokenB: Contract;

    const THOUSAND_TOKENS = ethers.utils.parseEther("1000");
    const FIVE_HUNDRED_TOKENS = ethers.utils.parseEther("500");

    beforeEach(async function () {
        tokenA_factory = await ethers.getContractFactory("TokenA");
        tokenB_factory = await ethers.getContractFactory("TokenB");
        tokenA = await tokenA_factory.deploy();
        tokenB = await tokenB_factory.deploy();
    });

    describe("# Deployment #", function () {
        it("Should set owner to msg.sender", async function () {
            const [owner] = await ethers.getSigners();
            const tokenA_owner = await tokenA.owner();
            const tokenB_owner = await tokenB.owner();

            expect(owner.address).to.equal(tokenA_owner);
            expect(owner.address).to.equal(tokenB_owner);
        });

        it("Should mint 1000 of each token to owner", async function () {
            const [owner] = await ethers.getSigners();
            const tokenA_balance = await tokenA.balanceOf(owner.address);
            const tokenB_balance = await tokenB.balanceOf(owner.address);

            expect(THOUSAND_TOKENS).to.equal(tokenA_balance);
            expect(THOUSAND_TOKENS).to.equal(tokenB_balance);
        });
    });

    describe("# Mint #", function () {
        it("Should mint 500 A Tokens to msg.sender", async function () {
            const [_, signer] = await ethers.getSigners();

            await tokenA.connect(signer).mint(FIVE_HUNDRED_TOKENS);
            const newBalance = await tokenA.balanceOf(signer.address);

            expect(FIVE_HUNDRED_TOKENS).to.equal(newBalance);
        });

        it("Should mint 500 B Tokens to msg.sender", async function () {
            const [_, signer] = await ethers.getSigners();

            await tokenB.connect(signer).mint(FIVE_HUNDRED_TOKENS);
            const newBalance = await tokenB.balanceOf(signer.address);

            expect(FIVE_HUNDRED_TOKENS).to.equal(newBalance);;
        });

        it("Should mint 500 of both tokens to msg.sender", async function () {
            const [_, signer] = await ethers.getSigners();
            await tokenA.connect(signer).mint(FIVE_HUNDRED_TOKENS);
            await tokenB.connect(signer).mint(FIVE_HUNDRED_TOKENS);

            const tokenA_balance = await tokenA.balanceOf(signer.address);
            const tokenB_balance = await tokenB.balanceOf(signer.address);

            expect(FIVE_HUNDRED_TOKENS).to.equal(tokenA_balance);
            expect(FIVE_HUNDRED_TOKENS).to.equal(tokenB_balance);
        });

        it("Should emit the Transfer event with the correct values", async function () {
            const [owner, signer] = await ethers.getSigners();

            await expect(tokenA.mint(FIVE_HUNDRED_TOKENS))
                .to.emit(tokenA, "Transfer")
                .withArgs(ethers.constants.AddressZero, owner.address, FIVE_HUNDRED_TOKENS);

            await expect(tokenB.connect(signer).mint(FIVE_HUNDRED_TOKENS))
                .to.emit(tokenB, "Transfer")
                .withArgs(ethers.constants.AddressZero, signer.address, FIVE_HUNDRED_TOKENS);
        });
    });
});
