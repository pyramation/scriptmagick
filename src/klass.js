import * as shell from 'shelljs';
import { resolve, join } from 'path';
import { sync as mkdirp } from 'mkdirp';
import { sync as rimraf } from 'rimraf';

import * as cmds from './cmds';

export class ScriptMagick {
  constructor({ outDir }) {
    this.outDir = outDir;
    this.count = 0;
    mkdirp(outDir);
  }

  execCmd(cmd) {
    console.log(cmd);
    console.log('');
    shell.exec(cmd);
  }

  getIntermediateFile() {
    const c = this.count++ + '';
    const name = 'intermediate-' + c.padStart(8, '0') + '.png';
    return resolve(join(this.outDir, name));
  }

  maskImage({ pathToMaskLayer, pathToObjectLayer, outFile }) {
    if (!outFile) {
      outFile = this.getIntermediateFile();
    }
    const cmd = cmds.maskImage({ pathToMaskLayer, pathToObjectLayer, outFile });
    this.execCmd(cmd);
    return outFile;
  }

  composeImages({ layers, outFile }) {
    const cmd = cmds.composeImages({ layers, outFile });
    this.execCmd(cmd);
    return outFile;
  }

  replaceColor({ inFile, find, replace, outFile, fuzz = '24%' }) {
    const cmd = cmds.replaceColor({ inFile, find, replace, outFile, fuzz });
    this.execCmd(cmd);
  }
  cleanup() {
    rimraf(resolve(join(this.outDir, 'intermediate-*.png')));
  }
}
