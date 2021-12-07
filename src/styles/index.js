import {
  StyleSheet,
} from 'react-native';


const styles = StyleSheet.create({
    modalView: {
      backgroundColor: 'rgba(0,0,0,0.2)',
      flex: 1,
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    cardView: {
      backgroundColor: '#fff',
      width: '75%',
      maxHeight: '90%',
      height: 'auto',
    },
    filterCard:{
      paddingHorizontal: 10,
      paddingVertical: 10,
      backgroundColor: '#F5F5F5',
    },
    filterData: {
      flexDirection: 'row',
      marginBottom: 10,
      marginHorizontal: 10,
      marginTop: 10,
    },
    mainCard: {
      padding: 10,
      backgroundColor: '#fff',
      marginBottom: 10,
      elevation: 1,
    },
    cardHeader: {flexDirection: 'row', marginVertical: 10},
    avatar: {
        height: 50,
        width: 50,
        alignItems:'center',
        justifyContent:'center',
      borderRadius: 60,
    },
    avatarText: {fontSize: 20, fontWeight: 'bold'},
    cardBody: {flex: 1, marginLeft: 10},
    title: {fontSize: 18, fontWeight: 'bold'},
    subtitle: {fontSize: 16, color: '#cdcdcd'},
    statusMain: {
      alignSelf: 'flex-start',
      padding: 5,
      borderRadius: 50,
      minWidth: 80,
    },
    status: {textAlign: 'center', color: '#ffffff'},
    created: {
      flexDirection: 'row',
      paddingVertical: 10,
      alignItems: 'center',
    },
    createdText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#cdcdcd',
      marginLeft: 10,
    },
    createdValue: {fontSize: 16, color: '#000'},
    Desc: {flexDirection: 'row', paddingVertical: 10},
    Divider: {
      borderColor: '#cdcdcd',
      borderStyle: 'dotted',
      borderWidth: 1,
      borderRadius: 1,
      height: 1,
    },
    descText: {
      fontSize: 16,
      color: '#000',
      marginLeft: 10,
      flex: 1,
    },
    search: {
      paddingVertical: 10,
      paddingHorizontal: 15,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    searchInput:{
      flex: 1,
      backgroundColor: '#fff',
      paddingVertical: 10,
      fontSize: 15,
    },
    filterView: {
      flexDirection: 'row',
      marginLeft: 10,
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'orange',
    },
    filterText:{color: '#fff', fontSize: 16, marginRight: 10},
});
  
export default styles;