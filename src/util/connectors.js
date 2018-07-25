import { Connect, SimpleSigner } from 'uport-connect'

export const uport = new Connect('Tasks Uport', {
  clientId: '2ogkaTf6Tf8dJShtt2d4BVFKxg3yYvy6xjH',
  network: 'rinkeby',
  signer: SimpleSigner('0c90f1bae97c5caaf6a9fbb193c3e9c4b09021328635d1604893b8144d7871aa')
})


