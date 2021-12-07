import * as React from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  ActivityIndicator,
  TextInput,
  Modal,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Moment from 'moment';
import styles from '../styles'

const DATA = [
  {
    id: 1,
    title: 'Assigned To Me',
  },
  {
    id: 2,
    title: 'Priority',
  },
  {
    id: 3,
    title: 'Unassigned',
  },
  {
    id: 4,
    title: 'Everythig',
  },
];

export default function HomeScreen({ navigation }) {
    const [loading, setLoading] = React.useState(true);
    const [data, setData] = React.useState([]);
    const [originalData, setOriginalData] = React.useState([]);
    const [modalVisible, setModalVisible] = React.useState(false);
  
    React.useEffect(() => {
      navigation.setOptions({
        headerRight: () => (
          <View style={{marginRight: 15}}>
            <Pressable onPress={() => navigation.navigate('MapScreen')}>
              <FontAwesome name={'map-marked-alt'} size={20} color={'#000000'} />
            </Pressable>
          </View>
        ),
      });
  
      fetch('https://run.mocky.io/v3/82f1d43e-2176-4a34-820e-2e0aa4566b5c')
        .then(response => response.json())
        .then(json => {
          setLoading(false);
          setData(json);
          setOriginalData(json);
        })
        .catch(error => {
          setLoading(false);
        });
    }, []);
  
    const ExpandCard = item => {
      setLoading(true);
      const newArray = [...data];
      const replaceArray = {
        id: item.id,
        title: item.title,
        subtitle: item.subtitle,
        created: item.created,
        short_desc: item.short_desc,
        long_desc: item.long_desc,
        status: item.status,
        visible: !item.visible,
      };
      newArray.splice(
        newArray.findIndex(ele => ele.id === item.id),
        1,
        replaceArray,
      );
      setData(newArray);
      setLoading(false);
    };
  
    const filterList = item => {
      setLoading(true);
      if (item.id == 1) {
        setData(originalData);
        setModalVisible(false);
        setLoading(false);
      } else if (item.id == 3) {
        setData([]);
        setModalVisible(false);
        setLoading(false);
      } else {
        setData(originalData);
        setModalVisible(false);
        setLoading(false);
      }
    };
  
    const searchList = text => {
      const newData = originalData.filter(item => {
        const itemData = `${item.title.toUpperCase()}`;
  
        const textData = text.toUpperCase();
  
        return itemData.indexOf(textData) > -1;
      });
      setData(newData);
    };
  
    const renderItem = ({item}) => (
      <Pressable onPress={() => ExpandCard(item)}>
        <View style={styles.mainCard}>
          <View style={styles.cardHeader}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>W</Text>
            </View>
            <View style={styles.cardBody}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>{item.subtitle}</Text>
            </View>
            <View
              style={[
                styles.statusMain,
                {
                  backgroundColor: item.status == 'Red' ? 'red' : 'orange',
                },
              ]}>
              <Text style={styles.status}>{item.status}</Text>
            </View>
          </View>
          <View style={styles.Divider} />
          <View style={styles.created}>
            <EvilIcons name={'calendar'} size={25} color={'#cdcdcd'} />
            <Text style={styles.createdText}>Created:</Text>
            <Text style={styles.createdValue}>
              {Moment(item.created).format('DD MMM YYYY')}
            </Text>
          </View>
          <View style={styles.Divider} />
          <View style={styles.Desc}>
            <Feather name={'list'} size={25} color={'#cdcdcd'} />
            <Text style={[styles.descText, {marginLeft: 10}]}>
              {item.short_desc}
            </Text>
          </View>
          {item.visible ? (
            <View style={styles.Desc}>
              <FontAwesome
                name={'clipboard-list'}
                size={20}
                color={'#cdcdcd'}
                style={{marginLeft: 5}}
              />
              <Text style={[styles.descText, {marginLeft: 12}]}>
                {item.long_desc}
              </Text>
            </View>
          ) : null}
          <View style={{alignItems: 'center'}}>
            {item.visible ? (
              <MaterialIcons
                name={'keyboard-arrow-up'}
                size={25}
                color={'#cdcdcd'}
                style={{marginLeft: 5}}
              />
            ) : (
              <MaterialIcons
                name={'keyboard-arrow-down'}
                size={25}
                color={'#cdcdcd'}
                style={{marginLeft: 5}}
              />
            )}
          </View>
        </View>
      </Pressable>
    );
  
    if (loading) {
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator color={'orange'} size={'large'} />
        </View>
      );
    } else {
      return (
        <View style={{flex: 1}}>
          <View
            style={{flexDirection: 'row', marginHorizontal: 20, marginTop: 20}}>
            <View
              style={styles.search}>
              <Feather name={'search'} size={17} color={'#cdcdcd'} />
            </View>
            <TextInput
              underlineColorAndroid="transparent"
              style={styles.searchInput}
              placeholder={'Search Task'}
              pointerEvents="none"
              onChangeText={text => searchList(text)}
            />
            <Pressable
              onPress={() => setModalVisible(true)}
              style={styles.filterView}>
              <Text style={styles.filterText}>
                Filter
              </Text>
              <Feather name={'filter'} size={17} color={'#fff'} />
            </Pressable>
          </View>
  
          <Modal animationType="fade" transparent={true} visible={modalVisible}>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={{flex: 1}}>
              <View
                style={styles.modalView}>
                <View
                  style={styles.cardView}>
                  <ScrollView>
                    <View
                      style={styles.filterCard}>
                      <Text
                        style={{
                          fontSize: 13,
                        }}>
                        CHOOSE OPTION FROM BELOW
                      </Text>
                    </View>
                    {DATA.map((item, key) => (
                      <Pressable key={key} onPress={() => filterList(item)}>
                        <View
                          style={styles.filterData}>
                          <Text style={{flex: 1}}>{item.title}</Text>
                          <MaterialIcons
                            name={'keyboard-arrow-right'}
                            size={25}
                            color={'#cdcdcd'}
                            style={{marginLeft: 5}}
                          />
                        </View>
                        <View style={styles.Divider} />
                      </Pressable>
                    ))}
                  </ScrollView>
                </View>
              </View>
            </TouchableOpacity>
          </Modal>
          <FlatList
            data={data}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            style={{
              marginTop: 20,
              marginHorizontal: 20,
            }}
          />
        </View>
      );
    }
  }