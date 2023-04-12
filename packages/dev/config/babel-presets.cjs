// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

const resolver = require('./babel-resolver.cjs');

module.exports = function (isEsm, usage) {
  return resolver([
    '@babel/preset-typescript',
    [
      '@babel/preset-react',
      {
        development: false,
        runtime: 'automatic'
      }
    ],
    [
      '@babel/preset-env',
      {
        useBuiltIns: usage ? 'usage' : false,
        corejs: usage ? 3 : false,
        exclude: [
          // we don't want 2n ** 128n to Math.pow(2n, 128n)
          '@babel/plugin-transform-exponentiation-operator',
          // we don't want await import(...) to Promise.resolve(require(...))
          'proposal-dynamic-import'
        ],
        modules: isEsm ? false : 'commonjs',
        targets: isEsm
          ? {
              node: '14'
            }
          : {
              browsers: '>0.25% and last 2 versions and not ie 11 and not OperaMini all',
              node: '14'
            }
      }
    ]
  ]);
};
