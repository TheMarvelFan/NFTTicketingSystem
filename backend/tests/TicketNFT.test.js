const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TicketNFT Contract", function() {
    let TicketNFT;
    let ticketNFT;
    let owner;
    let buyer;
    let addr2;

    beforeEach(async function() {
        // Get the ContractFactory and Signers
        TicketNFT = await ethers.getContractFactory("TicketNFT");
        [owner, buyer, addr2] = await ethers.getSigners();

        // Deploy a new TicketNFT contract before each test
        ticketNFT = await TicketNFT.deploy();
        await ticketNFT.deployed();
    });

    describe("Deployment", function() {
        it("Should set the right owner", async function() {
            expect(await ticketNFT.owner()).to.equal(owner.address);
        });

        it("Should start with token count 0", async function() {
            expect(await ticketNFT.balanceOf(buyer.address)).to.equal(0);
        });
    });

    describe("Minting", function() {
        const qrCode = "testQRCode123";
        const eventId = 1;
        const uri = "ipfs://testURI";

        it("Should mint a new ticket", async function() {
            await ticketNFT.mintTicket(buyer.address, qrCode, eventId, uri);
            expect(await ticketNFT.balanceOf(buyer.address)).to.equal(1);
        });

        it("Should emit TicketMinted event", async function() {
            await expect(ticketNFT.mintTicket(buyer.address, qrCode, eventId, uri))
                .to.emit(ticketNFT, "TicketMinted")
                .withArgs(1, buyer.address, eventId);
        });

        it("Should not allow non-owners to mint", async function() {
            await expect(
                ticketNFT.connect(addr2).mintTicket(buyer.address, qrCode, eventId, uri)
            ).to.be.revertedWith("Ownable: caller is not the owner");
        });
    });

    describe("Ticket Validation", function() {
        const qrCode = "testQRCode123";
        const eventId = 1;
        const uri = "ipfs://testURI";

        beforeEach(async function() {
            await ticketNFT.mintTicket(buyer.address, qrCode, eventId, uri);
        });

        it("Should validate an unused ticket", async function() {
            const [isValid, ticketEventId, ticketQR] = await ticketNFT.validateTicket(1);
            expect(isValid).to.be.true;
            expect(ticketEventId).to.equal(eventId);
            expect(ticketQR).to.equal(qrCode);
        });

        it("Should mark ticket as used", async function() {
            await ticketNFT.useTicket(1);
            const [isValid] = await ticketNFT.validateTicket(1);
            expect(isValid).to.be.false;
        });

        it("Should not allow using ticket twice", async function() {
            await ticketNFT.useTicket(1);
            await expect(ticketNFT.useTicket(1)).to.be.revertedWith("Ticket already used");
        });
    });

    describe("Pausing", function() {
        it("Should pause and unpause", async function() {
            await ticketNFT.pause();
            await expect(
                ticketNFT.mintTicket(buyer.address, "qr", 1, "uri")
            ).to.be.revertedWith("Pausable: paused");

            await ticketNFT.unpause();
            await expect(
                ticketNFT.mintTicket(buyer.address, "qr", 1, "uri")
            ).to.not.be.reverted;
        });
    });
});
