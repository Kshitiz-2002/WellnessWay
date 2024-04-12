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
import ModernCardWhite from "../components/CardComponentWhite";

const HomeScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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
      <View
        style={{ flex: 2.5, flexDirection: 'column',}}>
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
            Ledger Smith 👋
          </Text>
        </View>
        <View
          style={{
            flex: 0.2,
            flexDirection: 'row',
            alignItems: 'flex-start',
            paddingTop: 5,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flex: 1,
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
            <TextInput
              style={{
                flex: 1,
                height: 40,
                fontSize: Platform.OS === 'ios' ? 24 : 19,
              }}
              placeholder="Search for a doctor"
              placeholderTextColor="gray"
              value={searchText}
              onChangeText={(text) => setSearchText(text)}
            />
          </View>
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
              <TouchableOpacity>
                <ModernCard
                  imageSource={require('../assets/nurse.png')} // Replace with your image URL
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
              <TouchableOpacity>
                <ModernCardWhite
                  imageSource={require('../assets/test.png')} // Replace with your image URL
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
              <TouchableOpacity>
                <ModernCardWhite
                  imageSource={require('../assets/pharmacy.png')} // Replace with your image URL
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
              <TouchableOpacity>
                <ModernCard
                  imageSource={require('../assets/exercise.png')} // Replace with your image URL
                  text="Physiotherapy"
                />
              </TouchableOpacity>
            </View>
          </View>
          <Text
            style={{
              fontSize: Platform.OS === 'ios' ? 30 : 25,
              fontWeight: '700',
            }}>
            Upcoming
          </Text>
          <View
            style={{
              flex: 1.4,
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
              }}>
              <TouchableOpacity>
                <View
                  style={{
                    flexDirection: 'column',
                    paddingTop: 6,
                    paddingLeft: 10,
                    borderRadius: 20,
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#F8F8FF',
                    ...Platform.select({
                      ios: {
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.3, // Increase opacity for a stronger shadow
                        shadowRadius: 6, // Increase radius for a softer shadow
                      },
                      android: {
                        elevation: 5, // Increase elevation for a stronger shadow on Android
                        overflow: 'hidden',
                      },
                    }),
                  }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Image
                      source={require('../assets/stethoscope.png')}
                      style={{
                        width: Platform.OS === 'ios' ? 25 : 20,
                        height: Platform.OS === 'ios' ? 25 : 20,
                      }}
                    />
                    <Text
                      style={{
                        marginLeft: 4,
                        fontSize: Platform.OS === 'ios' ? 20 : 14,
                        fontWeight: '600',
                      }}>
                      Consultancy
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 1,
                paddingRight: 0,
                paddingTop: 0,
                padding:10,
                widht: '100%',
              }}>
              <TouchableOpacity>
                <View
                  style={{
                    flexDirection: 'column',
                    paddingTop: 6,
                    paddingLeft: 10,
                    borderRadius: 20,
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#F8F8FF',
                    ...Platform.select({
                      ios: {
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.3, // Increase opacity for a stronger shadow
                        shadowRadius: 6, // Increase radius for a softer shadow
                      },
                      android: {
                        elevation: 5, // Increase elevation for a stronger shadow on Android
                        overflow: 'hidden',
                      },
                    }),
                  }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Image
                      source={require('../assets/meds.png')}
                      style={{
                        width: Platform.OS === 'ios' ? 25 : 20,
                        height: Platform.OS === 'ios' ? 25 : 20,
                      }}
                    />
                    <Text
                      style={{
                        marginLeft: 6,
                        fontSize: Platform.OS === 'ios' ? 20 : 14,
                        fontWeight: '600',
                      }}>
                      Medicine
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      {isSidebarOpen && (
        // Render your sidebar content here
        <Sidebar isSidebarOpen={isSidebarOpen} />
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
