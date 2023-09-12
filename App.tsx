import { useEffect, useState } from 'react';
import { StatusBar, TextInput, View } from 'react-native';

import { styles } from './styles';
import {
  getHash,
  startOtpListener,
  removeListener,
} from 'react-native-otp-verify';

export default function App() {
  const [code, setCode] = useState('');
  function getOtpCode(message: string) {
    if (message) {
      console.log('MENSAGEM CAPTURADA:', message);
      const otpCode = /(\d{4})/g.exec(message)![1];
      console.log('CÓDIGO: ', otpCode);
      setCode(otpCode);
    } else {
      console.error('não foi encontrado nehuma messagem!');
    }
  }

  useEffect(() => {
    // getHash().then((hash) => console.log(hash));
    startOtpListener((message) => getOtpCode(message));

    return () => removeListener();
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <TextInput style={styles.input} value={code[0]} />
      <TextInput style={styles.input} value={code[1]} />
      <TextInput style={styles.input} value={code[2]} />
      <TextInput style={styles.input} value={code[3]} />
    </View>
  ); // react native otp verify
}
