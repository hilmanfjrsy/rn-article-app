import React, { createRef, useEffect, useState } from 'react';
import { Dimensions, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import WebView from 'react-native-webview';
import ButtonPrimary from '../Components/ButtonPrimary';
import GlobalStyles from '../Utils/GlobalStyles';
import GlobalVar from '../Utils/GlobalVar';
import Feat from 'react-native-vector-icons/Feather'
import FastImage from 'react-native-fast-image';
import { getRequest, postRequest, showNotification } from '../Utils/GlobalFunc';
import CKEditor from '../Components/CKEditor';
import { Picker } from '@react-native-picker/picker';

export default function EditArticle({ navigation, route }) {
  const article = route.params.article
  const [contents, setContents] = useState('')
  const [image, setImage] = useState(article.img)
  const [title, setTitle] = useState(article.title)
  const [categoryId, setCategoryId] = useState(article.category_id)
  const [category, setCategory] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  var webView = createRef()

  async function getCategory() {
    let { data } = await getRequest('homes/all-category')

    if (data) {
      setCategory(data.category)
    }
  }

  useEffect(() => {
    getCategory()
  }, [])

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: 'white' }}>
      <View style={[GlobalStyles.container, GlobalStyles.p20, { backgroundColor: 'white' }]}>
        <Text style={[GlobalStyles.fontTitle, GlobalStyles.fontPrimary, { marginBottom: 10 }]}>Judul Artikel</Text>
        <TextInput
          style={{ borderWidth: 1, borderColor: GlobalVar.greyColor, paddingHorizontal: 15, borderRadius: 5 }}
          autoCapitalize='none'
          value={title}
          placeholder="Judul"
          onChangeText={v => setTitle(v)}
        />

        <Text style={[GlobalStyles.fontTitle, GlobalStyles.fontPrimary, { marginVertical: 10 }]}>Sampul</Text>
        <TouchableOpacity onPress={openGallery}>
          {
            image ?
              <FastImage
                style={{ height: 200, width: '100%', borderRadius: 10 }}
                resizeMode="cover"
                source={{ uri: image }}
              />
              :
              <View style={{ borderWidth: 2, borderStyle: 'dashed', borderColor: GlobalVar.greyColor, height: 200, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                <Feat name="upload" size={50} color={GlobalVar.greyColor} />
                <Text style={[GlobalStyles.fontSecondary, {}]}>Upload sampul</Text>
              </View>
          }
        </TouchableOpacity>

        <Text style={[GlobalStyles.fontTitle, GlobalStyles.fontPrimary, { marginVertical: 10, marginTop: 20 }]}>Kategori</Text>
        <View style={{ borderRadius: 10, borderWidth: 1, borderColor: 'grey' }}>
          <Picker
            style={{ color: 'grey' }}
            selectedValue={categoryId}
            onValueChange={(itemValue, itemIndex) =>
              setCategoryId(itemValue)
            }
          >
            <Picker.Item label="- Pilih Kategori -" value="" />
            {category.map(item => <Picker.Item key={item.id} label={item.title} value={item.id} />)}
          </Picker>
        </View>

        <Text style={[GlobalStyles.fontTitle, GlobalStyles.fontPrimary, { marginVertical: 10 }]}>Konten</Text>
        <CKEditor
          setContents={(v) => setContents(v)}
          contents={article.contents}
        />
      </View>

      <View style={{ padding: 20 }}>
        <ButtonPrimary
          isLoading={isLoading}
          text={'Perbarui'}
          onPress={() => updateArticle()}
        />
      </View>
    </ScrollView>
  )

  async function updateArticle() {
    setIsLoading(true)
    if (contents && title && image && categoryId) {
      let form = {
        contents: contents || article.contents,
        title,
        img: image,
        category_id: categoryId
      }
      let { data } = await postRequest(`articles/update/${article.id}`, form)

      if (data) {
        showNotification('success', "Berhasil", "Artikel telah diperbarui")
        navigation.goBack()
      }
    } else {
      showNotification('error', "Form tidak boleh kosong", "Harap periksa kembali semua form")
    }
    setIsLoading(false)
  }

  function openGallery() {
    ImageCropPicker.openPicker({
      width: 300,
      height: 200,
      cropping: true,
      includeBase64: true,
    }).then(i => {
      setImage(`data:${i.mime};base64,${i.data}`)
    });
  }
}