import React, { createRef, useState } from 'react';
import { Dimensions, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import WebView from 'react-native-webview';
import ButtonPrimary from '../Components/ButtonPrimary';
import GlobalStyles from '../Utils/GlobalStyles';
import GlobalVar from '../Utils/GlobalVar';
import Feat from 'react-native-vector-icons/Feather'
import FastImage from 'react-native-fast-image';
import { postRequest, showNotification } from '../Utils/GlobalFunc';

const { width } = Dimensions.get('screen')
export default function CreateArticle({ navigation, route }) {
  const [contents, setContents] = useState('')
  const [image, setImage] = useState('')
  const [title, setTitle] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  var webView = createRef()
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

        <Text style={[GlobalStyles.fontTitle, GlobalStyles.fontPrimary, { marginVertical: 10 }]}>Konten</Text>
        <View style={{ height: 350, }}>
          <WebView
            ref={w => webView = w}
            javaScriptEnabled={true}
            scalesPageToFit={true}
            onMessage={async (e) => {
              let tex = JSON.parse(e.nativeEvent.data)
              console.log(tex.data)
              setContents(tex.data)
            }}
            source={{
              html: `<html lang="en">
                        <head>
                            <meta charset="utf-8">
                            <meta name="viewport" content="width=${width - 40}, initial-scale=1">
                            <title>CKEditor 5 – Classic editor</title>
                            <script src="https://cdn.ckeditor.com/ckeditor5/29.0.0/classic/ckeditor.js"></script>
                        </head>
                        <body>
                            <div id="editor">
                            </div>
                            <style>
                            .ck-editor__editable {
                                height: 300px;
                            }
                            </style>
                            <script type="text/javascript">
                                ClassicEditor
                                    .create( document.querySelector( '#editor' ), {
                                        placeholder: 'Ketik disini..',
                                        link: {
                                            defaultProtocol: 'https://'
                                        },
                                        // removePlugins: [ 'Bold', 'Italic' ],
                                        toolbar: {
                                            items: [
                                              'heading',
                                              '|',
                                              'bold',
                                              'italic',
                                              'link',
                                              'bulletedList',
                                              'numberedList',
                                              '|',
                                              'insertTable',
                                              'blockQuote',
                                              '|',
                                              'outdent',
                                              'indent',
                                              'undo',
                                              'redo'
                                            ]
                                          },
                                        mediaEmbed: {
                                            previewsInData: true
                                        },

                                    } )
                                    .then( newEditor => {
                                        editor = newEditor;
                                        editor.model.document.on( 'change:data', (e) => {
                                            window.ReactNativeWebView.postMessage(JSON.stringify({'data':editor.getData()}))
                                        } );
                                    })
                                    .catch( error => {
                                        console.error( error );
                                    }); 
                                    window.addEventListener('load', (event) => {
                                        editor.ui.view.editable.editableElement.style.height = '300px';
                                    });
                            </script>
                        </body>
                    </html>` }} />
        </View>
      </View>

      <View style={{ padding: 20 }}>
        <ButtonPrimary
          isLoading={isLoading}
          text={'Simpan'}
          onPress={() => saveArticle()}
        />
      </View>
    </ScrollView>
  )

  async function saveArticle() {
    setIsLoading(true)
    if (contents && title && image) {
      let form = {
        contents,
        title,
        img: image
      }
      let { data } = await postRequest('articles/create', form)
      if (data) {
        showNotification('success', "Berhasil", "Artikel telah dibuat")
        navigation.navigate('BottomTab', { screen: 'Profile' })
      }
    }else{
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