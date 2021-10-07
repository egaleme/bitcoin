import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  FlatList,
  TouchableOpacity,
  Modal,
  Dimensions,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {RadioButton} from 'react-native-paper';

import {
  TEXT_COLOR,
  PRIMARY_COLOR,
  ACCENT_COLOR,
  LIGHT_TEXT_COLOR,
  BACKGROUND_COLOR,
  WHITE_COLOR,
} from '../constants/color';
import {currencyFormater} from '../utils/currencyFormater';

import {usePortfolioStore} from '../store/usePortfolioStore';

const amyFace = require('../../assets/images/woman-face.jpg');

const {width, height} = Dimensions.get('screen');

const coinIcon = item => {
  switch (item.coin_token) {
    case 'BTC':
      return <FontAwesome name="bitcoin" size={20} color={PRIMARY_COLOR} />;
    case 'ETH':
      return (
        <MaterialCommunityIcons
          name="ethereum"
          size={20}
          color={PRIMARY_COLOR}
        />
      );
    case 'VET':
      return <FontAwesome name="viacoin" size={20} color={PRIMARY_COLOR} />;
    default:
      return (
        <MaterialCommunityIcons
          name="litecoin"
          size={20}
          color={PRIMARY_COLOR}
        />
      );
  }
};

const totalPortfolio = portfolios => {
  return portfolios.reduce((a, r) => {
    return a + r.total_cost;
  }, 0);
};

const totalMonthlyPortfolio = portfolios => {
  return portfolios.reduce((r, c) => r + c.total_cost, 0) / portfolios.length;
};

const totalPercentPortfolio = portfolios => {
  return (
    portfolios.reduce((r, c) => r + c.percentage_to_sell_at, 0) /
    portfolios.length
  );
};

export default function Home() {
  const portfolios = usePortfolioStore(state => state.portfolios);
  const getXchangeRate = usePortfolioStore(state => state.getXchangeRate);
  const convertCurrency = usePortfolioStore(state => state.convertCurrency);
  const currency = usePortfolioStore(state => state.currency);

  const [modalVisible, setModalVisible] = React.useState(false);
  const [currencyBtn, setCurrencyBtn] = React.useState(undefined);

  React.useEffect(() => {
    getXchangeRate();
    // convertCurrency('DOT', 'NGN');
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.greetingContainer}>
        <View>
          <Text style={styles.welcomeText}>Welcome</Text>
          <Text style={styles.profileText}>Amy Chan</Text>
        </View>
        <View style={styles.profileContainer}>
          <Image source={amyFace} style={styles.profilePic} />
        </View>
      </View>
      {/********* portfolio card *********/}
      <View style={styles.portfolioCard}>
        <Text style={{color: WHITE_COLOR, fontSize: 16, paddingTop: 10}}>
          Balance
        </Text>
        <Text style={styles.balanceAmount}>
          {currency} {currencyFormater(totalPortfolio(portfolios))}
        </Text>
        <Text style={{color: WHITE_COLOR, fontSize: 16, paddingTop: 15}}>
          Monthly profit
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={styles.monthlyAmt}>
            {currency} {currencyFormater(totalMonthlyPortfolio(portfolios))}
          </Text>
          <View style={styles.monthlyContainer}>
            <Icon name="caretup" size={15} color={ACCENT_COLOR} />
            <Text
              style={{
                color: WHITE_COLOR,
                fontSize: 15,
              }}>
              +{totalPercentPortfolio(portfolios)}%
            </Text>
          </View>
        </View>
      </View>
      {/*********** coins ***********/}
      <View style={{height: '2.5%'}} />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            color: TEXT_COLOR,
            fontSize: 18,
            paddingHorizontal: 20,
            paddingVertical: 10,
          }}>
          Coins
        </Text>
        <TouchableOpacity
          style={{paddingHorizontal: 20, paddingVertical: 10}}
          onPress={() => setModalVisible(true)}>
          <FontAwesome name="gears" size={24} color={TEXT_COLOR} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={portfolios}
        renderItem={({item, key}) => (
          <View style={styles.coinsContainer} key={key}>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  padding: 10,
                  borderRadius: 20,
                  backgroundColor: `${PRIMARY_COLOR}30`,
                  width: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {coinIcon(item)}
              </View>
              <View style={{paddingLeft: 10}}>
                <Text>{item.coin_token}</Text>
                <Text>{item.unit}</Text>
              </View>
            </View>
            <View>
              <Text>
                {currency} {currencyFormater(item.total_cost)}
              </Text>
              <Text>
                <Icon name="caretup" size={15} color="green" />{' '}
                {item.percentage_to_sell_at}%
              </Text>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      <Modal
        statusBarTranslucent={true}
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        style={styles.modal}>
        <View
          style={{
            backgroundColor: 'rgba(rgba(0, 68, 0, 0.6))',
            flex: 1,
            margin: 0,
          }}
        />
        <View style={styles.modalContainer}>
          <ScrollView
            style={[styles.scrollViewContainer, {height: 270}]}
            automaticallyAdjustContentInsets
            showsVerticalScrollIndicator={false}>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
              }}
              style={styles.closeIcon}>
              <Icon name="closecircle" size={20} color="#fff" />
            </TouchableOpacity>
            <Text
              style={{
                alignSelf: 'center',
                paddingVertical: 20,
                color: TEXT_COLOR,
                fontSize: 20,
              }}>
              Currency Xchange
            </Text>
            <View style={{height: '3%'}} />
            <RadioButton.Group
              onValueChange={newValue => setCurrencyBtn(newValue)}
              value={currencyBtn}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingHorizontal: 5,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    //justifyContent: 'space-around',
                    alignItems: 'center',
                  }}>
                  <RadioButton value="USD" />
                  <Text
                    style={{
                      color: TEXT_COLOR,
                      fontSize: 15,
                    }}>
                    US Dollar($)
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    //justifyContent: 'space-around',
                    alignItems: 'center',
                  }}>
                  <RadioButton value="CNY" />
                  <Text
                    style={{
                      color: TEXT_COLOR,
                      fontSize: 15,
                    }}>
                    Renminbi (CNY)
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    //justifyContent: 'space-around',
                    alignItems: 'center',
                  }}>
                  <RadioButton value="NGN" />
                  <Text
                    style={{
                      color: TEXT_COLOR,
                      fontSize: 15,
                    }}>
                    Naira (NGN)
                  </Text>
                </View>
              </View>
            </RadioButton.Group>
            <View
              style={{
                marginTop: 15,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
              }}>
              <TouchableOpacity
                onPress={() => {
                  if (currencyBtn == undefined) {
                    Alert.alert('Please choose a currency to proceed.');
                    return;
                  }
                  convertCurrency('DOT', currencyBtn);
                }}
                style={{
                  backgroundColor: PRIMARY_COLOR,
                  padding: 10,
                  borderRadius: 10,
                  width: '40%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{color: '#fff'}}>DOT</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  if (currencyBtn == undefined) {
                    Alert.alert('Please choose a currency to proceed.');
                    return;
                  }
                  convertCurrency('ADA', currencyBtn);
                }}
                style={{
                  backgroundColor: ACCENT_COLOR,
                  padding: 10,
                  borderRadius: 10,
                  width: '40%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{color: '#fff'}}>ADA</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  greetingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 40 : 50,
  },
  profileText: {
    color: TEXT_COLOR,
    fontSize: 17,
    paddingTop: 10,
  },
  welcomeText: {
    color: LIGHT_TEXT_COLOR,
    fontSize: 14,
  },
  profileContainer: {
    width: 50,
    height: 50,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 13,
  },
  portfolioCard: {
    height: '30%',
    borderRadius: 25,
    backgroundColor: PRIMARY_COLOR,
    marginHorizontal: 20,
    marginTop: '5%',
    padding: 20,
  },
  balanceAmount: {
    color: WHITE_COLOR,
    fontSize: 22,
    fontWeight: 'bold',
    paddingTop: 16,
  },
  monthlyAmt: {
    color: WHITE_COLOR,
    fontSize: 17,
    fontWeight: 'bold',
    paddingTop: 10,
  },
  monthlyContainer: {
    //opacity: 0.3,
    backgroundColor: `${BACKGROUND_COLOR}30`,
    width: 80,
    //height: 35,
    padding: 7,
    borderRadius: 25,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  coinsContainer: {
    marginHorizontal: 20,
    height: 85,
    backgroundColor: '#fafcfe',
    paddingHorizontal: 15,
    borderRadius: 10,
    //   width: '100%'
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  closeIcon: {
    marginTop: 10,
    marginRight: 10,
    alignSelf: 'flex-end',
    padding: 5,
    backgroundColor: 'red',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: width,
    height: height,
    margin: 0,
    backgroundColor: 'transparent',
  },
  modalContainer: {
    // height: height * 0.55,
    // height: height,
    //height: hp('50%'),
    margin: 0,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    // backgroundColor: BACKGROUND_COLOR,
  },
  scrollViewContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
