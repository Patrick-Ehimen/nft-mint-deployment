"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNFTGallery = exports.getNFTById = exports.storeNFT = void 0;
const nft_model_1 = __importDefault(require("../models/nft.model"));
const storeNFT = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, logoUrl, userWalletAddress } = req.body;
        const nftId = Date.now();
        const nft = new nft_model_1.default({
            nftId,
            name,
            description,
            logoUrl,
            userWalletAddress,
        });
        yield nft.save();
        res.status(201).json({ message: "NFT data stored successfully" });
    }
    catch (error) {
        console.error("Error storing NFT:", error);
        res.status(500).json({ error: "Failed to store NFT data" });
    }
});
exports.storeNFT = storeNFT;
const getNFTById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const nftId = Number(id);
        // Validate that the conversion was successful
        if (isNaN(nftId)) {
            res.status(400).json({ error: "Invalid NFT ID. It must be a number." });
            return;
        }
        const nft = yield nft_model_1.default.findOne({ nftId });
        if (!nft) {
            res.status(404).json({ error: "NFT not found" });
            return;
        }
        res.status(200).json(nft);
    }
    catch (error) {
        console.error("Error retrieving NFT:", error);
        res.status(500).json({ error: "Failed to retrieve NFT data" });
    }
});
exports.getNFTById = getNFTById;
const getNFTGallery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userWalletAddress } = req.params;
        const nfts = yield nft_model_1.default.find({ userWalletAddress });
        res.status(200).json(nfts);
    }
    catch (error) {
        console.error(`Error retrieving NFT gallery for userWalletAddress ${req.params.userWalletAddress}:`, error);
        res.status(500).json({ error: "Failed to retrieve NFT gallery" });
    }
});
exports.getNFTGallery = getNFTGallery;
