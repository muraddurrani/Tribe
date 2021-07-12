import { NativeModules } from 'react-native'

jest.mock('@react-native-firebase/app', () => ({
  show: () => {},
}))

NativeModules.RNFBAppModule = {}