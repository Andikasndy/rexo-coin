import { AuthorityType, createMetadataAccountV3, findMetadataPda, getCreateMetadataAccountV3InstructionDataSerializer, updateAsAuthorityItemDelegateV2 } from "@metaplex-foundation/mpl-token-metadata";
import * as web3 from "@solana/web3.js";

let connection = new web3.Connection(web3.clusterApiUrl('devnet'));

const mint = new web3.PublicKey('7CSuSGRae3GngP8riupM6RWdbD2NbrMnjZFEGKGBpaYo');
const publicKey = web3.Keypair.fromSecretKey(new Uint8Array([212,147,124,215,63,3,73,245,70,110,28,13,157,223,194,147,146,155,90,197,44,63,177,3,11,120,31,168,31,236,70,138,74,51,210,198,129,102,17,36,193,200,182,125,86,180,124,241,40,170,61,224,2,49,144,0,253,154,32,52,133,99,45,132]));

//upload metadata
async function NewTokenMetadata() {
    const MetadataPDA = await findMetadataPda(mint);

    const TokenMetadata = {
        name : "Rexo Coin",
        Symbol : "RCO",
        url : "https://solana-token-7CSuSGRae3GngP8riupM6RWdbD2NbrMnjZFEGKGBpaYo",
        sellerFeeBasisPoint : 0,
        creator : null,
        colection : null,
        uses : null,
    }
    const metadataTransaction = new web3.Transaction().add(
        createCreateMetadataAccountV3Instruction(
        {
            metadata: MetadataPDA,
            mint: mint,
            mintAutority: publicKey.publicKey,
            payer: publicKey.publicKey,
            updateAuthority: publicKey.publicKey, 
        },{
            createMetadataAccountV3 :{
                data : TokenMetadata,
                isMutable : true,
            }
        }
    )
    );

    const tx = await web3.sendAndConfirmTransaction (
        Connection,
        metadataTransaction,
        [publicKey]
    );
    console.log(tx)
}

//update meta data
async function updateTokenMetadata() {
    const MetadataPDA = await findMetadataPda;

    const TokenMetadata ={
        name : "Rexo Coin V2",
        Symbol : "RCO V2",
        url : "https://solana-token-7CSuSGRae3GngP8riupM6RWdbD2NbrMnjZFEGKGBpaYo",
        sellerFeeBasisPoint : 0,
        creator : null,
        colection : null,
        uses : null,
    }
    const updateTokenMetadataTransaction = new web3.Transaction().add(
        createUpdateMetadataAccountV3Instruction( 
        {
            metadata: MetadataPDA,
            updateAsAuthority: publicKey.publicKey
        },{
            createUpdateMetadataAccountV3 :{
                data : TokenMetadata,
                updateAsAuthority: publicKey.publicKey,
                primarysaleHapend: true,
                isMutable:true,
            }
        }
        )
    );
    const tx = await web3.sendAndConfirmTransaction (
        Connection,
        metadataTransaction,
        [publicKey]
    );
    console.log(tx)
}


NewTokenMetadata()


