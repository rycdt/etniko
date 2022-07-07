const { readFileSync, writeFileSync, readdirSync, rmSync, existsSync, mkdirSync } = require('fs');
const sharp = require('sharp');

const template = `
    <svg width="1024" height="1024" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- bg -->
        <!-- skintone -->
        <!-- eyes -->
        <!-- mouth -->
    </svg>
`

const takenNames = {};
const takenFaces = {};
let idx = 10;

function randInt(max) {
    //return 0;
    return Math.floor(Math.random() * (max + 1));
}

function randElement(arr) {
   return arr[Math.floor(Math.random() * arr.length)];
}


function getRandomName() {
    const adjectives = 'fired trashy tubular nasty jacked swol buff ferocious firey flamin agnostic artificial bloody crazy cringey crusty dirty eccentric glutinous harry juicy simple stylish awesome creepy corny freaky shady sketchy lame sloppy hot intrepid juxtaposed killer ludicrous mangy pastey ragin rusty rockin sinful shameful stupid sterile ugly vascular wild young old zealous flamboyant super sly shifty trippy fried injured depressed anxious clinical'.split(' ');
    const names = 'aaron bart chad dale earl fred grady harry ivan jeff joe kyle lester steve tanner lucifer todd mitch hunter mike arnold norbert olaf plop quinten randy saul balzac tevin jack ulysses vince will xavier yusuf zack roger raheem rex dustin seth bronson dennis'.split(' ');
    
    const randAdj = randElement(adjectives);
    const randName = randElement(names);
    const name =  `${randAdj}-${randName}`;


    if (takenNames[name] || !name) {
        return getRandomName();
    } else {
        takenNames[name] = name;
        return name;
    }
}

function getLayer(name, skip=0.0) {
    console.log("Layer");
    console.log(name);
    const svg = readFileSync(`./layers/${name}.svg`, 'utf-8');
    const re = /(?<=\<svg\s*[^>]*>)([\s\S]*?)(?=\<\/svg\>)/g
    const layer = svg.match(re)[0];
    return Math.random() > skip ? layer : '';
}

async function svgToPng(name) {
    const src = `./nfts/${name}.svg`;
    const dest = `./nfts/${name}.png`;

    const img = await sharp(src);
    const resized = await img.resize(1024);
    await resized.toFile(dest);
}


function createImage(idx) {

    const bg = randInt(1);
    const skintone = randInt(4);
    const eyes = randInt(4); 
    const mouth = randInt(4);
    // 18,900 combinations

    const face = [ skintone, eyes, mouth].join('');

    if (face[takenFaces]) {
        createImage();
    } else {
        const name = getRandomName()
        console.log(name)
        face[takenFaces] = face;

        const final = template
            .replace('<!-- bg -->', getLayer(`bg${bg}`))
            .replace('<!-- skintone -->', getLayer(`skintone${skintone}`))
            .replace('<!-- eyes -->', getLayer(`eyes${eyes}`))
            .replace('<!-- mouth -->', getLayer(`mouth${mouth}`))

////Creating metaData
        const meta = {
            name,
            description: `A drawing of ${name.split('-').join(' ')}`,
            image: `${idx}.png`,
            attributes: [
                { 
                    //Create Traits here
                }
            ]
        }
        writeFileSync(`./nfts/${idx}.json`, JSON.stringify(meta))
        writeFileSync(`./nfts/${idx}.svg`, final)
        svgToPng(idx)
    }


}


// Create dir if not exists
if (!existsSync('./nfts')){
    mkdirSync('./nfts');
}

// Cleanup dir before each run
readdirSync('./nfts').forEach(f => rmSync(`./nfts/${f}`));


do {
    createImage(idx);
    idx--;
  } while (idx >= 0);
