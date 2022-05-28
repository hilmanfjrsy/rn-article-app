import React from 'react';
import { Dimensions, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';
import GlobalStyles from '../Utils/GlobalStyles';
import Feat from 'react-native-vector-icons/Feather'
import GlobalVar from '../Utils/GlobalVar';
import RenderHTML from 'react-native-render-html';

const { width } = Dimensions.get('screen')
export default function FAQ({ navigation, route }) {
  return (
    <SafeAreaView style={[GlobalStyles.container, GlobalStyles.p20, {}]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Collapse>
          <CollapseHeader>
            <View style={[GlobalStyles.cardBody, GlobalStyles.spaceBetween, { paddingVertical: 15 }]}>
              <Text style={[GlobalStyles.fontPrimary, GlobalStyles.fontTitle, { fontSize: 14 }]}>1. Cara membuat Artikel</Text>
              <Feat size={20} name="chevron-right" color={GlobalVar.greyColor} />
            </View>
          </CollapseHeader>
          <CollapseBody>
            <RenderHTML
              contentWidth={width - 40}
              source={{ html: `<ul> <li>Ketuk menu <strong>Artikel&nbsp;</strong>pada menu tab bawah.</li></ul> <p><img alt="" src="https://ckeditor.com/apps/ckfinder/userfiles/files/WhatsApp%20Image%202022-05-28%20at%208_15_26%20PM%20(5)(1).jpeg" style="height:52px; width:360px"/></p><ul> <li>Ketik judul artikel Anda pada form <strong>Judul</strong></li></ul> <p><strong><img alt="" src="https://ckeditor.com/apps/ckfinder/userfiles/files/WhatsApp%20Image%202022-05-28%20at%208_15_26%20PM%20(1).jpeg" style="height:90px; width:360px"/></strong></p><ul> <li><strong>Upload</strong> sampul artikel Anda</li></ul> <p><img alt="" src="https://ckeditor.com/apps/ckfinder/userfiles/files/WhatsApp%20Image%202022-05-28%20at%208_15_26%20PM%20(2).jpeg" style="height:228px; width:360px"/></p><ul> <li>Setelah itu, ketik konten artikel yang ingin Anda buat</li></ul> <p><img alt="" src="https://ckeditor.com/apps/ckfinder/userfiles/files/WhatsApp%20Image%202022-05-28%20at%208_15_26%20PM%20(3).jpeg" style="height:365px; width:360px"/></p><ul> <li>Setelah selesai, lalu klik tombol <strong>Simpan</strong></li></ul> <p><strong>​​​​​​​<img alt="" src="https://ckeditor.com/apps/ckfinder/userfiles/files/WhatsApp%20Image%202022-05-28%20at%208_15_26%20PM%20(4).jpeg" style="height:80px; width:360px"/>​​​​​​​</strong></p>` }}
            />
          </CollapseBody>
        </Collapse>
      </ScrollView>
    </SafeAreaView>
  )
}