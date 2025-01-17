import 'styled-components/native';
import {Theme} from '../theme/theme';

declare module 'styled-components/native' {
  export interface DefaultTheme extends Theme {}
}
