// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Etniko is ERC721Enumerable, Ownable {
    using Strings for uint256;

    string public baseURI;
    string public baseExtension = ".json";
    string public notRevealedUri;
    uint256 public cost = 0.01 ether;
    uint256 public maxSupply = 100;
    uint256 public maxMintAmount = 3;
    uint256 public nftPerAddressLimit = 3;
    bool public paused = false;
    bool public revealed = true;
    bool public onlyWhitelisted = false;
    address payable commissions = payable(0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199);
    address payable otherCommissions = payable(0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199);
    address[] public whitelistedAddresses;
    mapping(address => uint256) public addressMintedBalance;

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _initBaseURI,
        string memory _initNotRevealedUri
    ) ERC721(_name, _symbol) {
        setBaseURI(_initBaseURI);
        setNotRevealedURI(_initNotRevealedUri);
    }

//    constructor() ERC721('Etniko', 'ET') {
//        baseURI = 'ipfs://QmVjPnBxBsTgCnZTSGm6gY6xuLbhLZZmpPWtjf2uHwZH77/';
//    }

    // internal
    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    // public
    function mint(uint256 _mintAmount) public payable {
        require(!paused, "the contract is paused");
        uint256 supply = totalSupply();
        require(_mintAmount > 0, "need to mint at least 1 NFT");
        require(_mintAmount <= maxMintAmount, "max mint amount per session exceeded");
        require(supply + _mintAmount <= maxSupply, "max NFT limit exceeded");

        if (msg.sender != owner()) {
            if(onlyWhitelisted == true) {
                require(isWhitelisted(msg.sender), "user is not whitelisted");
                uint256 ownerMintedCount = addressMintedBalance[msg.sender];
                require(ownerMintedCount + _mintAmount <= nftPerAddressLimit, "max NFT per address exceeded");
            }
            require(msg.value >= cost * _mintAmount, "insufficient funds");
        }

        for (uint256 i = 1; i <= _mintAmount; i++) {
            addressMintedBalance[msg.sender]++;
            _safeMint(msg.sender, supply + i);
        }

        //  Commissions
        (bool success, ) = payable(commissions).call{value: msg.value * 6 / 100}("");
        require(success);
    }

    function isWhitelisted(address _user) public view returns (bool) {
        for (uint i = 0; i < whitelistedAddresses.length; i++) {
            if (whitelistedAddresses[i] == _user) {
                return true;
            }
        }
        return false;
    }

    function walletOfOwner(address _owner)
    public
    view
    returns (uint256[] memory)
    {
        uint256 ownerTokenCount = balanceOf(_owner);
        uint256[] memory tokenIds = new uint256[](ownerTokenCount);
        for (uint256 i; i < ownerTokenCount; i++) {
            tokenIds[i] = tokenOfOwnerByIndex(_owner, i);
        }
        return tokenIds;
    }

    function tokenURI(uint256 tokenId)
    public
    view
    virtual
    override
    returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        if(revealed == false) {
            return notRevealedUri;
        }

        string memory currentBaseURI = _baseURI();
        return bytes(currentBaseURI).length > 0
        ? string(abi.encodePacked(currentBaseURI, tokenId.toString(), baseExtension))
        : "";
    }

    //only owner
    function reveal() public onlyOwner {
        revealed = true;
    }

    function setNftPerAddressLimit(uint256 _limit) public onlyOwner {
        nftPerAddressLimit = _limit;
    }

    function setCost(uint256 _newCost) public onlyOwner {
        cost = _newCost;
    }

    function setMaxMintAmount(uint256 _newMaxMintAmount) public onlyOwner {
        maxMintAmount = _newMaxMintAmount;
    }

    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }

    function setBaseExtension(string memory _newBaseExtension) public onlyOwner {
        baseExtension = _newBaseExtension;
    }

    function setNotRevealedURI(string memory _notRevealedURI) public onlyOwner {
        notRevealedUri = _notRevealedURI;
    }

    function pause(bool _state) public onlyOwner {
        paused = _state;
    }

    function setOnlyWhitelisted(bool _state) public onlyOwner {
        onlyWhitelisted = _state;
    }

    function whitelistUsers(address[] calldata _users) public onlyOwner {
        delete whitelistedAddresses;
        whitelistedAddresses = _users;
    }

    function withdraw() public payable onlyOwner {
        // This will 5% of the initial sale.
        // You can remove this if you want, or keep it in to support HashLips and his channel.
        // =============================================================================
//        (bool hs, ) = payable(otherCommissions).call{value: address(this).balance * 5 / 100}("");
//        require(hs);
        // =============================================================================

        // This will payout the owner 95% of the contract balance.
        // Do not remove this otherwise you will not be able to withdraw the funds.
        // =============================================================================
        (bool os, ) = payable(owner()).call{value: address(this).balance}("");
        require(os);
        // =============================================================================
    }
}
