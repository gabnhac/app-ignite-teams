import { Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import theme from '@theme/index';
import { useFonts } from 'expo-font';

import { Groups } from '@screens/Groups';
import { NewGroup } from '@screens/NewGroup';
import { Players } from '@screens/Players';

import { ThemeProvider } from 'styled-components/native';
import { Loading } from '@components/Loading';
import { StatusBar } from 'react-native';

import { Routes } from '@routes/index';

export default function App() {
  const [fontsLoaded] = useFonts({Roboto_400Regular, Roboto_700Bold});
  return (
    <ThemeProvider theme={theme}>
      <StatusBar
      barStyle='light-content'
      backgroundColor='transparent'
      translucent
      />
      {fontsLoaded ? <Routes/> : <Loading/>}
    </ThemeProvider>
  );
}


