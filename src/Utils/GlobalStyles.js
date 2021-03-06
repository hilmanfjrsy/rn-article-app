import { StyleSheet } from 'react-native';
import GlobalVar from './GlobalVar';

const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4'
  },
  p20: {
    padding: 20
  },
  cardHorizontal:{
    position: 'absolute',
    padding:20,
    backgroundColor:'#00000050',
    borderRadius:20,
    left:0,right: 0,bottom:0,top:0
  },
  cardBody: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fontSecondary: {
    fontSize: 12,
    color: '#949494',
  },
  fontTitle: {
    fontSize: 17,
    fontWeight: 'bold'
  },
  textAlert: {
    fontSize: 10,
    color: 'firebrick',
    marginBottom: 10
  },
  fontPrimary: {
    fontSize: 14,
    color: '#1D1D1D',
  },
  header: {
    marginTop: 50,
    marginBottom: 40,
  },
  settingContainer: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 10,
    padding: 10,
  },
  settingTitle: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  settingSection: {
    marginTop: 5,
    paddingVertical: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
});

export default GlobalStyles;
