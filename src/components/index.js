import { createImageProgress } from 'react-native-image-progress';
import FastImage from 'react-native-fast-image';
const FPImage = createImageProgress(FastImage);

import { LoginInput, RoutineInput } from './Input';
import {
  GradientButton,
  MGradientButton,
  CircleButton,
  CheckButton,
  BlueCheckButton
} from './Button';
import { MainHeader, SubHeader, Header, ChangeLangHeader } from './Header';
import SideMenu from './SideMenu';

export {
  LoginInput,
  GradientButton,
  MainHeader,
  SideMenu,
  MGradientButton,
  CircleButton,
  SubHeader,
  RoutineInput,
  CheckButton,
  BlueCheckButton,
  FPImage,
  Header,
  ChangeLangHeader
}
