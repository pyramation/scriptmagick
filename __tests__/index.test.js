import { maskImage, composeImages, replaceColor } from '../src';
import cases from 'jest-in-case';

cases(
  'maskImage',
  (options) => {
    expect(maskImage(options)).toMatchSnapshot();
  },
  [{ pathToMaskLayer: 'mask', pathToObjectLayer: 'obj', outFile: 'out' }]
);

cases(
  'composeImages',
  (options) => {
    expect(composeImages(options)).toMatchSnapshot();
  },
  [{ layers: ['a', 'b', 'c', 'd'], outFile: 'out' }]
);

cases(
  'replaceColor',
  (options) => {
    expect(replaceColor(options)).toMatchSnapshot();
  },
  [
    {
      inFile: 'in',
      find: 'find',
      replace: 'replace',
      outFile: 'out',
      fuzz: '42%'
    }
  ]
);
