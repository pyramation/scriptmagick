export const maskImage = ({ pathToMaskLayer, pathToObjectLayer, outFile }) => {
  return `convert ${pathToMaskLayer} ${pathToObjectLayer} -alpha on -compose CopyOpacity -composite ${outFile}`;
};

export const composeImages = ({ layers, outFile }) => {
  for (let i = 0; i < layers.length; i++) {
    const layer = layers[i];
    if (!layer) {
      console.log(JSON.stringify(layers, null, 4));
      throw new Error('missing a layer!');
    }
  }

  const pages = layers
    .reverse()
    .map((l) => `-page +0+0 ${l}`)
    .join(' ');
  return `convert ${pages} -layers flatten ${outFile}`;
};

export const replaceColor = ({
  inFile,
  find,
  replace,
  outFile,
  fuzz = '24%'
}) => {
  return [
    'convert',
    inFile,
    `-fuzz ${fuzz}`,
    `-fill "${replace}"`,
    `-opaque "${find}"`,
    outFile
  ].join(' ');
};
