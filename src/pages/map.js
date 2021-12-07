import * as React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Modal,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import styles from '../styles'

export default function MapScreen({ navigation }) {
    const [loading, setLoading] = React.useState(true);
    const [data, setData] = React.useState([]);
    const [popup, setPopup] = React.useState(false);
    const [selectedItem, setSelectedItem] = React.useState('');
  
    React.useEffect(() => {
      navigation.setOptions({
        title: 'Assigned To Me',
      });
  
      fetch('https://run.mocky.io/v3/82f1d43e-2176-4a34-820e-2e0aa4566b5c')
        .then(response => response.json())
        .then(json => {
          setLoading(false);
          setData(json);
        })
        .catch(error => {
          setLoading(false);
        });
    }, []);
  
    if (loading) {
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator color={'orange'} size={'large'} />
        </View>
      );
    } else {
      return (
        <>
          <Modal animationType="fade" transparent={true} visible={popup}>
            <TouchableOpacity onPress={() => setPopup(false)} style={{flex: 1}}>
              <View style={styles.modalView}>
                <View style={styles.cardView}>
                  <ScrollView>
                    <View style={styles.mainCard}>
                      <View style={styles.cardHeader}>
                        <View style={styles.avatar}>
                          <Text style={styles.avatarText}>W</Text>
                        </View>
                        <View style={styles.cardBody}>
                          <Text style={styles.title}>
                            {selectedItem.title ? selectedItem.title : null}
                          </Text>
                          <Text style={styles.subtitle}>
                            {selectedItem.subtitle ? selectedItem.subtitle : null}
                          </Text>
                        </View>
                        <View
                          style={[
                            styles.statusMain,
                            {
                              backgroundColor:
                                selectedItem.status == 'Red' ? 'red' : 'orange',
                            },
                          ]}>
                          <Text style={styles.status}>
                            {selectedItem.status ? selectedItem.status : null}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.Divider} />
                      <View style={styles.created}>
                        <EvilIcons
                          name={'calendar'}
                          size={25}
                          color={'#cdcdcd'}
                        />
                        <Text style={styles.createdText}>Created:</Text>
                        <Text style={styles.createdValue}>
                          {selectedItem.created ? selectedItem.created : null}
                        </Text>
                      </View>
                      <View style={styles.Divider} />
                      <View style={styles.Desc}>
                        <Feather name={'list'} size={25} color={'#cdcdcd'} />
                        <Text style={styles.descText}>
                          {selectedItem.short_desc
                            ? selectedItem.short_desc
                            : null}
                        </Text>
                      </View>
                      <View style={styles.Desc}>
                        <FontAwesome
                          name={'clipboard-list'}
                          size={20}
                          color={'#cdcdcd'}
                          style={{marginLeft: 5}}
                        />
                        <Text style={styles.descText}>
                          {selectedItem.long_desc ? selectedItem.long_desc : null}
                        </Text>
                      </View>
                    </View>
                  </ScrollView>
                </View>
              </View>
            </TouchableOpacity>
          </Modal>
          <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={{flex: 1}}
            region={{
              latitude: 50.9575733,
              longitude: 15.7384571,
              latitudeDelta: 0.1,
              longitudeDelta: 0.0121,
            }}>
            {data.map((item, key) => (
              <Marker
                onPress={() => {
                  setSelectedItem(item);
                  setPopup(true);
                }}
                coordinate={{
                  latitude: item.latitude,
                  longitude: item.longitude,
                }}>
                <Text
                  style={{
                    zIndex: 1,
                    ...StyleSheet.absoluteFill,
                    color: '#000000',
                    left: 11,
                    top: 5,
                    fontSize: 10,
                    fontWeight: 'bold',
                  }}>
                  {key + 1}
                </Text>
                <Image
                  style={{
                    height: 28,
                    width: 28,
                    resizeMode: 'contain',
                  }}
                  source={require('../../customermarker.png')}
                />
              </Marker>
            ))}
          </MapView>
        </>
      );
    }
  }