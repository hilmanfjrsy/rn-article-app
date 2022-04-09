import React, { useContext, useState } from 'react';
import { TextInput, Text, View, TouchableOpacity } from 'react-native';
import ButtonPrimary from '../../Components/ButtonPrimary';
import GlobalStyles from '../../Utils/GlobalStyles';
import GlobalVar from '../../Utils/GlobalVar';
import FA from 'react-native-vector-icons/FontAwesome';
import { postRequest, setStorage, showNotification } from '../../Utils/GlobalFunc';
import { ContextProvider } from '../../Context/BaseContext';

const Login = ({ navigation }) => {
  const context = useContext(ContextProvider)
  const [email, setEmail] = useState('hilman@mail.com');
  const [password, setPassword] = useState('123456');
  const [isLoading, setIsLoading] = useState(false);
  const [passwordShow, setPasswordShow] = useState(false);

  function togglePassword() {
    setPasswordShow(!passwordShow);
  }

  async function handleSubmit() {
    if (email && password) {
      setIsLoading(true)
      let form = {
        "email": email,
        "password": password
      }
      let { data } = await postRequest('users/login', form)
      if (data) {
        await setStorage('token', data.token)
        await setStorage('secret', data.secret)
        await setStorage('user', data.user)
        context.setUser(data.user)
        navigation.reset({
          index: 0,
          routes: [{ name: 'SplashScreen' }],
        });
      }
      setIsLoading(false)
    } else {
      showNotification('error', "Form tidak boleh kosong", "Harap periksa kembali semua form")
    }
  }

  return (
    <View style={[GlobalStyles.container, GlobalStyles.p20, { justifyContent: 'center' }]}>
      <View style={GlobalStyles.header}>
        <Text style={[GlobalStyles.fontPrimary, { color: GlobalVar.primaryColor, fontSize: 30, fontWeight: 'bold' }]}>
          Login
        </Text>
        <Text style={[GlobalStyles.fontSecondary, { fontSize: 16 }]}>
          Masukkan email dan kata sandi Anda untuk mengakses akun Anda
        </Text>
      </View>
      <View style={[GlobalStyles.cardBody]}>
        <TextInput
          autoCapitalize='none'
          value={email}
          placeholder="Email"
          onChangeText={v => setEmail(v)}
        />
      </View>
      <View
        style={[GlobalStyles.cardBody, GlobalStyles.spaceBetween, { marginBottom: 60 }]}>
        <TextInput
          placeholder="Password"
          style={{ flex: 1 }}
          value={password}
          secureTextEntry={!passwordShow}
          onChangeText={v => setPassword(v)}
        />
        <TouchableOpacity
          style={{ justifyContent: 'center' }}
          onPress={togglePassword}>
          <FA
            name={passwordShow ? 'eye' : 'eye-slash'}
            color={'grey'}
            size={20}
            style={{ marginHorizontal: 10 }}
          />
        </TouchableOpacity>
      </View>
      <ButtonPrimary isLoading={isLoading} text={'Login'} onPress={handleSubmit} />
      <Text style={[GlobalStyles.fontSecondary, { textAlign: 'center', fontSize: 14, marginTop: 110 }]}>
        Belum memiliki akun?{' '}
        <Text
          onPress={() => navigation.navigate('Register')}
          style={[GlobalStyles.fontPrimary, { fontWeight: 'bold', color: GlobalVar.primaryColor }]}>
          Daftar
        </Text>
      </Text>
    </View>
  );
};

export default Login;
