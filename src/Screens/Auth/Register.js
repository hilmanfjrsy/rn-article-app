import React, { useState, useEffect } from 'react';
import { TextInput, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import ButtonPrimary from '../../Components/ButtonPrimary';
import GlobalStyles from '../../Utils/GlobalStyles';
import GlobalVar from '../../Utils/GlobalVar';
import FA from 'react-native-vector-icons/FontAwesome'
import { postRequest, showNotification } from '../../Utils/GlobalFunc';
const Register = ({ navigation, route }) => {
  const [passwordShow, setPasswordShow] = useState(false)
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [fullName, setFullName] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('');
  const [exist, setExist] = useState(0);

  function togglePassword() {
    setPasswordShow(!passwordShow)
  }

  async function checkEmail() {
    let checkEmail = GlobalVar.regexEmail.test(email)
    if (checkEmail) {
      let form = {
        "email": email
      }
      let { data } = await postRequest('users/checkEmail', form)
      if (data) {
        console.log(data)
        setMessage(data.message)
        setExist(data.exist)
      }
    } else {
      setMessage('Email tidak valid')
      setExist(1)
    }
  }

  async function onSubmit() {
    if (fullName && password && email) {
      let checkEmail = GlobalVar.regexEmail.test(email)
      if (checkEmail) {
        if (exist) {
          showNotification('error', "Email telah digunakan", "Harap periksa kembali email Anda")
        } else {
          setIsLoading(true)
          let form = {
            "email": email,
            "name": fullName,
            "password": password
          }

          let { data } = await postRequest('users/register',form)
          if (data) {
            navigation.navigate('Login')
            showNotification('success', "Selamat!", data.message)
          }
          setIsLoading(false)
        }
      } else {
        showNotification('error', "Email tidak valid", "Harap periksa kembali email Anda")
      }
    } else {
      showNotification('error', "Form tidak boleh kosong", "Harap periksa kembali semua form")
    }
  }

  return (
    <ScrollView>
      <View style={[GlobalStyles.container, { justifyContent: 'center' }]}>
        <View style={GlobalStyles.header}>
          <Text style={[GlobalStyles.fontPrimary, { fontSize: 30, fontWeight: 'bold', color: GlobalVar.primaryColor }]}>
            Daftar
          </Text>
          <Text style={[GlobalStyles.fontSecondary, { fontSize: 14 }]}>
            Silakan isi informasi untuk membuat akun dan daftar untuk melanjutkan
          </Text>
        </View>
        <View style={GlobalStyles.cardBody}>
          <TextInput
            autoCapitalize='words'
            placeholder="Nama Lengkap"
            style={GlobalStyles.input}
            onChangeText={(v) => setFullName(v)}
          />
        </View>
        <View style={[GlobalStyles.cardBody, GlobalStyles.spaceBetween]}>
          <TextInput
            autoCapitalize='none'
            style={{ flex: 1 }}
            value={email}
            placeholder="Email"
            onBlur={checkEmail}
            onFocus={() => setMessage('')}
            onChangeText={v => setEmail(v)}
          />
          {message ? <FA
            name={exist ? 'close' : 'check'}
            color={exist ? 'firebrick' : 'green'}
            size={20}
            style={{ marginHorizontal: 10 }}
          /> : null}
        </View>
        {(exist == 1 && message != '') && <Text style={[GlobalStyles.textAlert]}>{message}</Text>}
        <View style={[GlobalStyles.cardBody, GlobalStyles.spaceBetween, { marginBottom: 50, marginTop: 3 }]}>
          <TextInput
            placeholder="Password"
            style={{ flex: 1 }}
            secureTextEntry={!passwordShow ? true : false}
            onChangeText={(v) => setPassword(v)}
          />
          <TouchableOpacity style={{ justifyContent: 'center', marginHorizontal: 10 }} onPress={togglePassword}><FA name={passwordShow ? 'eye' : 'eye-slash'} color={'grey'} size={20} /></TouchableOpacity>
        </View>
        <ButtonPrimary isLoading={isLoading} text={'Daftar'} onPress={onSubmit} />
        <Text style={[GlobalStyles.fontSecondary, { textAlign: 'center', fontSize: 14, marginTop: 50 }]}>
          Sudah memiliki akun?{' '}
          <Text
            onPress={() => navigation.navigate('Login')}
            style={[GlobalStyles.fontPrimary, { marginTop: 20, color: GlobalVar.primaryColor, fontWeight: 'bold' }]}>
            Login
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
};

export default Register;
