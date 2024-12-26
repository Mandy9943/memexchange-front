import { scAddress } from '@/config';
import { Address } from '@multiversx/sdk-core/out';
import masterAbi from './abis/master.abi.json';
export const smartContractsConfig = {
  wrapEGLDShard0: {
    simpleAddress: scAddress.wrapEGLDShard0,
    address: new Address(scAddress.wrapEGLDShard0),
    abi: null
  },
  wrapEGLDShard1: {
    simpleAddress: scAddress.wrapEGLDShard1,
    address: new Address(scAddress.wrapEGLDShard1),
    abi: null
  },
  wrapEGLDShard2: {
    simpleAddress: scAddress.wrapEGLDShard2,
    address: new Address(scAddress.wrapEGLDShard2),
    abi: null
  },
  master: {
    simpleAddress: scAddress.degenMaster,
    address: new Address(scAddress.degenMaster),
    abi: masterAbi
  }
};

export type SmartContractConfigTypes = keyof typeof smartContractsConfig;
