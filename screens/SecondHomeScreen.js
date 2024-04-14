import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Platform,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import ModernCard from '../components/CardComponent';
import Sidebar from '../components/Sidebar';
import ModernCardWhite from '../components/CardComponentWhite';

const SecondHomeScreen = ({ user }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSearchDoctor = () => {};
  const handleSearchNurse = () => {};
  const handleSearchPathalogy = () => {};
  const handleSearchPharmacy = () => {};
  const handleSearchPhysiotherapy = () => {};

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 0.2,
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          paddingTop: Platform.OS === 'ios' ? 20 : 30,
        }}>
        <TouchableOpacity
          onPress={() => {
            // Handle profile image press
          }}>
          <Image
            source={require('../assets/user.png')}
            style={{
              width: 40,
              height: 40,
              borderRadius: 14,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleSidebar}>
          <Image
            source={require('../assets/menu.png')}
            style={{
              width: 40,
              height: 40,
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 2.5, flexDirection: 'column' }}>
        <View
          style={{
            flex: 0.4,
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
          }}>
          <Text style={{ fontSize: Platform.OS === 'ios' ? 40 : 32 }}>
            Hello,
          </Text>
          <Text
            style={{
              fontSize: Platform.OS === 'ios' ? 40 : 32,
              fontWeight: '700',
            }}>
            {user.name} 👋
          </Text>
        </View>
        <View
          style={{
            flex: 0.2,
            flexDirection: 'row',
            alignItems: 'flex-start',
            paddingTop: 5,
          }}>
          <TouchableOpacity
            onPress={() => {
              handleSearchDoctor;
            }}
            style={{
              flexDirection: 'row',
              flex: 1,
              alignItems: 'center',
              height: 50,
              borderRadius: 20,
              paddingLeft: 10,
              paddingVertical: 8,
              backgroundColor: 'white',
              fontWeight: '300',
            }}>
            <Icon
              name="search"
              size={20}
              color="gray"
              style={{ marginRight: 10 }}
            />
            <Text
              style={{
                flex: 1,
                alignSelf: 'center',
                fontSize: Platform.OS === 'ios' ? 24 : 19,
                color: 'gray',
              }}>
              Search for a doctor
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 2,
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}>
          <View
            style={{
              flex: 2.5,
              flexDirection: 'row',
              marginTop: 10,
              width: '100%',
              paddingLeft: 5,
              paddingRight: 5,
            }}>
            <View
              style={{
                flex: 1,
                padding: 10,
                paddingLeft: 0,
                widht: '100%',
              }}>
              <TouchableOpacity
                onPress={() => {
                  handleSearchNurse;
                }}>
                <ModernCard
                  imageSource={require('../assets/nurse.png')}
                  text="Nurse"
                  backColor={'#E6E6FA'}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 1,
                padding: 10,
                paddingRight: 0,
              }}>
              <TouchableOpacity
                onPress={() => {
                  handleSearchPathalogy;
                }}>
                <ModernCard
                  imageSource={require('../assets/test.png')} 
                  text="Pathalogy"
                />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flex: 2.5,
              flexDirection: 'row',
              marginTop: 10,
              width: '100%',
              paddingLeft: 5,
              paddingRight: 5,
            }}>
            <View
              style={{
                flex: 1,
                padding: 10,
                paddingLeft: 0,
                widht: '100%',
              }}>
              <TouchableOpacity
                onPress={() => {
                  handleSearchPharmacy;
                }}>
                <ModernCardWhite
                  imageSource={require('../assets/pharmacy.png')} 
                  text="Pharmacy"
                  backColor={'#E6E6FA'}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 1,
                padding: 10,
                paddingRight: 0,
              }}>
              <TouchableOpacity
                onPress={() => {
                  handleSearchPhysiotherapy;
                }}>
                <ModernCardWhite
                  imageSource={require('../assets/exercise.png')} 
                  text="Physiotherapy"
                />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              width: '100%',
              paddingLeft: 5,
              paddingRight: 5,
            }}>
            <View
              style={{
                flex: 1,
                padding: 10,
                paddingLeft: 0,
                paddingTop: 0,
                widht: '100%',
              }}></View>
            <View
              style={{
                flex: 1,
                paddingRight: 0,
                paddingTop: 0,
                padding: 10,
                widht: '100%',
              }}></View>
          </View>
        </View>
      </View>
      {isSidebarOpen && (
        
        <Sidebar isSidebarOpen={isSidebarOpen} user={user} />
      )}
    </SafeAreaView>
  );
};

export default SecondHomeScreen;
