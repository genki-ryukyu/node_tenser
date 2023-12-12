# gen

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
#　扱い方
```sh
node main.js
```
出力例
```sh
[ 600, 600, 3 ]
[ 200, 200, 3 ]
[ 1, 200, 200, 3 ]
Tensor {
  kept: false,
  isDisposedInternal: false,
  shape: [ 1, 4 ],
  dtype: 'float32',
  size: 4,
  strides: [ 4 ],
  dataId: {},
  id: 94,
  rankType: '2',
  scopeId: 4
}
0
円柱型ですよ
```
mian.jsのimagePathを同ディレクトリ上にある別の画像に差し替えると、他の画像でも使えます。


# パッケージlist
私はnpm -vで10.2.3でした。
この中で使うのは、主に@tensorflow/tfjs-node@4.13.0, sharp@0.32.6, canvas@2.11.2です。この三つが入っていれば問題ないと思われます。
```sh
npm list
├── @tensorflow/tfjs-node-gpu@4.13.0
├── @tensorflow/tfjs-node@4.13.0
├── @vitejs/plugin-vue@4.4.1
├── canvas@2.11.2
├── corepack@0.23.0
├── sharp@0.32.6
├── tensorflow.js@0.0.1
├── undici@5.27.2
├── vite@4.5.0
└── vue@3.3.8
```

# 警告
npmのverは10.2.3です。
ダウングレードさせた場合に、packageが使えなくなる恐れがあります。

```sh
npm -v
```
上記を用いてverを確認しましょう。もし異なる場合、

```sh
npm install npm@10.2.3
```
を使います。その上でver確認して変わらなかった場合（←私）は、sudoを用いました。sudoは慎重に扱いましょう.

また、パッケージイントール後　→　npmのver変更を行った人は、@tensorflow/tfjs-nodeが使えなくなってる可能性があります。node main.jsでError: Cannot find module '@tensorflow/tfjs-node'が出た場合、一度npm uninstall @tensorflow/tfjs-nodeを行い、再度npm install @tensorflow/tfjs-nodeを行うと良いでしょう。
# 参考サイト
https://qiita.com/everylittle/items/519797589b9760d4bff0

