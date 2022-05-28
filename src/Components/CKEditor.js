import React, { createRef } from 'react';
import { Dimensions, View } from 'react-native';
import WebView from 'react-native-webview';

const { width } = Dimensions.get('screen')
export default function CKEditor({ setContents = () => { }, contents = '' }) {
  var webView = createRef()
  return (
    <View style={{ height: 350, }}>
      <WebView
        ref={w => webView = w}
        javaScriptEnabled={true}
        scalesPageToFit={true}
        onMessage={async (e) => {
          let tex = JSON.parse(e.nativeEvent.data)
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
                                  editor.setData(${JSON.stringify(contents)});
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
  )
}