import * as migration_20260730_121253 from './20260730_121253';
import * as migration_20260730_132201 from './20260730_132201';
import * as migration_20260731_221527 from './20260731_221527';

export const migrations = [
  {
    up: migration_20260730_121253.up,
    down: migration_20260730_121253.down,
    name: '20260730_121253',
  },
  {
    up: migration_20260730_132201.up,
    down: migration_20260730_132201.down,
    name: '20260730_132201',
  },
  {
    up: migration_20260731_221527.up,
    down: migration_20260731_221527.down,
    name: '20260731_221527'
  },
];
