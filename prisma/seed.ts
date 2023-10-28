import {PrismaClient} from '@prisma/client';
const jsonCollection = [
    {
        address: 'BUjZjAS2vbbb65g7Z1Ca9ZRVYoJscURG5L3AkVvHP9ac',
        metadata: {
            name: 'Famous Fox Federation',
            symbol: 'FFF',
            description:
                'The Famous Fox Federation, an independent organization of the most fabulously famous foxes on the Blockchain.',
            seller_fee_basis_points: 0,
            image: 'https://arweave.net/mgvMZbiis8AE_Kkj1Om5clxpseOiZB-2Q4QFUVavD10'
        }
    },
    {
        address: '6d9pvGuM6iG9GVuxRzSVHEQCdy44arm6oyqu6aUzrzLo',
        metadata: {
            name: 'The Heist',
            symbol: 'HEIST',
            description:
                'A high-stakes, risk-based game of crime, corruption...and bananas.',
            image: 'https://arweave.net/B-2ArQmluuhmcCEiQKhGYweoyexRGtkbmPm5SrFJjbc?ext=png',
            attributes: []
        }
    },
    {
        address: '6P9DSB6ifwTfSjAY6CpEvnHYfk6Sc2iYWSoM2qM4u31f',
        metadata: {
            name: 'Reavers',
            symbol: 'REAVERS',
            description: 'Plunder, raid, navigate.',
            image: 'https://arweave.net/FQFm7onme_W77Zw_MQ-7XN2vZ64hK00aCcfELmDnqmQ',
            attributes: [],
            external_url: 'https://reavers.xyz/'
        }
    },
    {
        address: 'HNv9G2NxgZEWLxmzFqSCWYk4moUYvNrWjbq6AY2AHJKF',
        metadata: {
            name: 'Meegos',
            description:
                "Meegos is a collection of 10,000 characters carefully handcrafted with distinct personalities and emotions. Don't be fooled by their cuteness; they only want world domination.",
            image: 'https://assets.meegos.io/main.png',
            symbol: 'MEE'
        }
    },
    {
        address: 'SMBtHCCC6RYRutFEPb4gZqeBLUZbMNhRKaMKZZLHi7W',
        metadata: {
            name: 'SMB Gen2',
            symbol: 'SMB',
            description:
                'SMB is a collection of 5000 randomly generated 24x24 pixels NFTs on the Solana Blockchain. Each SolanaMonkey is unique and comes with different type and attributes varying in rarity.',
            seller_fee_basis_points: 600,
            image: 'https://arweave.net/lZ5FdIVagNoNvI4QFoHhB6Xyn4oVGLV9xOTW32WBC20',
            external_url: 'https://solanamonkey.business/',
            collection: {
                name: 'SMB Gen2',
                family: 'SMB'
            }
        }
    },
    {
        address: 'DSwfRF1jhhu6HpSuzaig1G19kzP73PfLZBPLofkw6fLD',
        metadata: {
            name: 'Degenerate Ape Academy',
            symbol: 'DAPE',
            description:
                'Deep in the heart of Dingus Forest echoes the sleepless cries of a troop of 10,000 apes. These aren’t just regular apes, however. These are degenerate apes.',
            seller_fee_basis_points: 0,
            image: 'https://arweave.net/F4q5hB2bkAhqZvLfJVqcncxTGWUSG8toaS78s4QDx_Y'
        }
    },
    {
        address: 'CLBrjmoDCFvrW8ukxXtDrBXWkL7Yx8PKspKaBPFxhpmL',
        metadata: {
            name: 'Smyths',
            symbol: 'SMYTHS',
            description: 'http://smyths.io/',
            seller_fee_basis_points: 0,
            image: 'https://nftstorage.link/ipfs/bafkreieualbvcaugd7idewqtyqdwz6hiprcbjsb7khazvt7hpit4gsbeey'
        }
    }
];

const prisma = new PrismaClient();

async function main() {
    console.log('Start seeding ...');
    await prisma.collections.deleteMany();
    for (const c of jsonCollection) {
        const collection = await prisma.collections.create({
            data: {
                address: c.address,
                name: c.metadata.name,
                image: c.metadata.image
            }
        });
        console.log(`Created collection with id: ${collection.id}`);
    }
    console.log('Seeding finished.');
}
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
