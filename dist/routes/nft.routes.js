"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const nft_controller_1 = require("../controllers/nft.controller");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /api/nft:
 *   post:
 *     summary: Store NFT data
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nftId:
 *                 type: number
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               logoUrl:
 *                 type: string
 *               userWalletAddress:
 *                 type: string
 *     responses:
 *       201:
 *         description: NFT data stored successfully
 */
router.post("/nft", nft_controller_1.storeNFT);
/**
 * @swagger
 * /api/nft/{id}:
 *   get:
 *     summary: Get NFT data by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: NFT ID
 *     responses:
 *       200:
 *         description: NFT data retrieved successfully
 *       404:
 *         description: NFT not found
 */
router.get("/nft/:id", nft_controller_1.getNFTById);
/**
 * @swagger
 * /api/nft/gallery/{userWalletAddress}:
 *   get:
 *     summary: Get NFT gallery by user wallet address
 *     parameters:
 *       - in: path
 *         name: userWalletAddress
 *         schema:
 *           type: string
 *         required: true
 *         description: User Wallet Address
 *     responses:
 *       200:
 *         description: List of NFT data objects retrieved successfully
 */
router.get("/nft/gallery/:userWalletAddress", nft_controller_1.getNFTGallery);
exports.default = router;
