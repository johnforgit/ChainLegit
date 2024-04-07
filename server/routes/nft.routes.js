import express from 'express';
import * as dotenv from 'dotenv';
import pinataSDK from '@pinata/sdk';

dotenv.config();
import { Readable } from 'stream';
const router = express.Router();
const pinata = new pinataSDK('c4d6137919ad7970b733','e1eff279db3605e905cb233ac6be3ca7d428c82802712b2265711d17af59a565');

router.route('/').post(async (req, res) => {
    try {
        const { userName, nftName, imageDataURL } = req.body;
    
        // Decode base64-encoded image data to binary
        const imageBuffer = Buffer.from(imageDataURL.replace(/^data:image\/\w+;base64,/, ''), 'base64');
    
        // Create a readable stream from the image buffer
        const readableStream = new Readable();
        readableStream.push(imageBuffer);
        readableStream.push(null);
    
        // Upload the image to Pinata
        const pinFileOptions = {
            pinataMetadata: {
                name: `${nftName}.png`, // Provide a name for the pinned file
            },
        };
        const pinJsonOptions = {
            pinataMetadata: {
                name: `${nftName}.json`, // Provide a name for the pinned file
            },
        };
        const pinnedImage = await pinata.pinFileToIPFS(readableStream, pinFileOptions);
    
        // Retrieve the Pinata URL for the image
        const imageUrl = pinnedImage.IpfsHash;
        const imageDownloadUrl = `https://yellow-electric-egret-510.mypinata.cloud/ipfs/${imageUrl}`;
        // Example metadata including the image URL
        const metadata = {
            userName: userName,
            nftName: nftName,
            imageUrl: `https://yellow-electric-egret-510.mypinata.cloud/ipfs/${imageUrl}`,
        };
    
        // Pin metadata to Pinata
        const pinnedMetadata = await pinata.pinJSONToIPFS( metadata,pinJsonOptions);
        const jsonDownloadUrl = `https://yellow-electric-egret-510.mypinata.cloud/ipfs/${pinnedMetadata.IpfsHash}`;
        res.status(200).json({ message: "Metadata stored successfully", metadata: jsonDownloadUrl });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to store metadata" });
    }
});

export default router;