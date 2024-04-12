import React, { useState, useEffect, useMemo } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Alert,
  TextInput,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const PrescriptionScreen = ({ user }) => {
  const [isPrescription, setIsPrescription] = useState(false);
  const [showAddPrescription, setShowAddPrescription] = useState(false);
  const [error, setError] = useState('');
  const [timePeriod, setTimePeriod] = useState('AM');
  const [doctorName, setDoctorName] = useState('');
  const [prescriptionDate, setPrescriptionDate] = useState('');
  const [prescriptionDesc, setPrescriptionDesc] = useState('');
  const [medicines, setMedicines] = useState([]);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]);

  const fetchPrescriptionsMemoized = useMemo(() => async () => {
    try {
      const response = await fetch(
        'https://dbfb539b-1621-4585-8f4e-2729f136a9b5-00-udz7gviutoov.kirk.replit.dev/prescriptions',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            emailaddress: user.emailaddress,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch prescriptions');
      }

      const data = await response.json();
      setPrescriptions(data.prescriptions);
    } catch (error) {
      console.error(error);
      // Handle error, e.g., show an error message to the user
    }
  }, [prescriptions]);

  fetchPrescriptionsMemoized()

  // useEffect(() => {
  //   const fetchPrescriptions = async () => {
  //     try {
  //       const response = await fetch(
  //         'https://wellnesswayserver.kshitizpandey.repl.co/prescriptions',
  //         {
  //           method: 'GET',
  //           headers: {
  //             'Content-Type': 'application/json',
  //             emailaddress: user.emailaddress,
  //           },
  //         }
  //       );

  //       if (!response.ok) {
  //         throw new Error('Failed to fetch prescriptions');
  //       }

  //       const data = await response.json();
  //       setPrescriptions(data.prescriptions);
  //     } catch (error) {
  //       console.error(error);
  //       // Handle error, e.g., show an error message to the user
  //     }
  //   };

  //   fetchPrescriptions();
  // }, [prescriptions]);

  const openPrescriptionDetails = (index) => {
    setSelectedPrescription(index);
  };

  const closePrescriptionDetails = () => {
    setSelectedPrescription(null);
  };

  const editPrescription = () => {
    const prescriptionToEdit = prescriptions[selectedPrescription];
    setDoctorName(prescriptionToEdit.title.replace('Dr. ', ''));
    setPrescriptionDate(prescriptionToEdit.date);
    setPrescriptionDesc(prescriptionToEdit.desc);
    setMedicines(prescriptionToEdit.medicines);
    setShowAddPrescription(true);
    closePrescriptionDetails();
  };

  const addMedicine = () => {
    const newMedicine = {
      name: '',
      time: '',
      timePeriod: 'AM',
    };
    setMedicines((prevMedicines) => [...prevMedicines, newMedicine]);
  };

  useEffect(() => {
    setIsPrescription(prescriptions.length !== 0);
  }, [prescriptions]);

  const confirmDeletePrescription = (index) => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this prescription?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => removePrescription(index),
          style: 'destructive',
        },
      ]
    );
  };

  const removePrescription = async (indexToRemove) => {
    // Create a new array without the prescription to be removed
    try {
      // Replace 'your-server-url' with the actual URL of your server
      const response = await fetch(
        'https://dbfb539b-1621-4585-8f4e-2729f136a9b5-00-udz7gviutoov.kirk.replit.dev/deletePrescription',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            emailaddress: user.emailaddress,
            prescriptionIndex: indexToRemove,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete prescription');
      } 

      // Show a success message
      Alert.alert('Success', 'Prescription deleted successfully');

      // Optionally, you can fetch updated prescriptions from the server and update the state
      // const updatedPrescriptions = await fetchPrescriptions();
      // setPrescriptions(updatedPrescriptions);
    } catch (error) {
      console.error(error);
      // Handle error, e.g., show an error message to the user
    }
  };

  const addPrescription = () => {
    setShowAddPrescription(true);
  };

  const closeAddPrescription = () => {
    setShowAddPrescription(false);
    setPrescriptionDesc('');
    setPrescriptionDate('');
    setDoctorName('');
    setError('');
  };

  const done = async () => {
    if (doctorName === '') {
      setError('Enter Doctor Name');
    } else if (prescriptionDate === '') {
      setError('Enter Date');
    } else if (prescriptionDesc === '') {
      setError('Enter Description');
    } else {
      const newPrescription = {
        title: `Dr. ${doctorName}`,
        desc: prescriptionDesc,
        date: prescriptionDate,
        medicines: [...medicines],
      };

      // Update the prescriptions in the database
      try {
        // Replace 'your-server-url' with the actual URL of your server
        const response = await fetch(
          'https://dbfb539b-1621-4585-8f4e-2729f136a9b5-00-udz7gviutoov.kirk.replit.dev/updatePrescriptions',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              emailaddress: user.emailaddress,
              prescriptions: [newPrescription, ...prescriptions],
            }),
          }
        );

        if (!response.ok) {
          throw new Error('Failed to update prescriptions');
        }
        // Show a success message
        Alert.alert('Success', 'Prescription added successfully');

        // Close the prescription modal and reset state
        closeAddPrescription();
        setError('');
        setMedicines([]);

        // Optionally, you can fetch updated prescriptions from the server and update the state
        // const updatedPrescriptions = await fetchPrescriptions();
        // setPrescriptions(updatedPrescriptions);
      } catch (error) {
        console.error(error);
        // Handle error, e.g., show an error message to the user
      }
    }
  };

  const updateMedicineName = (text, index) => {
    const updatedMedicines = [...medicines];
    updatedMedicines[index].name = text;
    setMedicines(updatedMedicines);
  };

  const updateMedicineTime = (text, index) => {
    const updatedMedicines = [...medicines];
    updatedMedicines[index].time = text;
    setMedicines(updatedMedicines);
  };

  const toggleMedicineTimePeriod = (index) => {
    const updatedMedicines = [...medicines];
    updatedMedicines[index].timePeriod =
      updatedMedicines[index].timePeriod === 'AM' ? 'PM' : 'AM';
    setMedicines(updatedMedicines);
  };

  const confirmDeleteMedicine = (index) => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this medicine?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => removeMedicine(index),
          style: 'destructive',
        },
      ]
    );
  };

  const removeMedicine = (indexToRemove) => {
    const updatedMedicines = medicines.filter(
      (_, index) => index !== indexToRemove
    );
    setMedicines(updatedMedicines);
  };

  return (
    <SafeAreaView style={{ flex: 1, zIndex: 1 }}>
      <View
        style={{
          flex: 0.25,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            fontSize: Platform.OS === 'ios' ? 40 : 32,
            marginTop: Platform.OS === 'ios' ? 0 : 2,
            fontWeight: '700',
          }}>
          Prescriptions
        </Text>
        {isPrescription && (
          <TouchableOpacity onPress={addPrescription}>
            <Text
              style={{
                fontSize: Platform.OS === 'ios' ? 50 : 42,
                fontWeight: Platform.OS === 'ios' ? '500' : '400',
                color: '#4FC9BF',
              }}>
              +
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={{ flex: 3 }}>
        {!isPrescription && (
          <View
            style={{
              flex: 0.9,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={addPrescription}>
              <Text
                style={{
                  fontSize: 80,
                  fontWeight: '300',
                  color: '#4FC9BF',
                }}>
                +
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {isPrescription && (
          // Prescription Cards
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ marginBottom: Platform.OS === 'ios' ? '21%' : '23%' }}>
            <View>
              {prescriptions.map((prescription, index) => (
                <TouchableOpacity
                  onPress={() => openPrescriptionDetails(index)}>
                  <View
                    key={index}
                    style={{
                      height: 110,
                      marginTop: index !== 0 ? 10 : 0,
                      backgroundColor: 'white',
                      borderRadius: 20,
                      width: '100%',
                    }}>
                    <View
                      style={{
                        flex: 0.4,
                        alignItems: 'flex-end',
                        flexDirection: 'row',
                        paddingLeft: 10,
                        justifyContent: 'space-between',
                        borderTopLeftRadius: index === 0 ? 20 : 0,
                        borderTopRightRadius: index === 0 ? 20 : 0,
                      }}>
                      <Text
                        style={{
                          fontSize: Platform.OS === 'ios' ? 30 : 22,
                          fontWeight: Platform.OS === 'ios' ? '600' : '600',
                          color: '#4FC9BF',
                        }}>
                        {prescription.title}
                      </Text>
                      <Text
                        style={{
                          fontSize: Platform.OS === 'ios' ? 20 : 14,
                          marginRight: 10,
                          fontWeight: '600',
                          color: 'black',
                          marginBottom: 4,
                        }}>
                        {prescription.date}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 0.6,
                        alignItems: 'flex-start',
                        paddingLeft: 10,
                        flexDirection: 'row',
                        marginTop: 5,
                        width: '100%',
                        justifyContent: 'flex-start',
                        borderBottomLeftRadius:
                          index === prescriptions.length - 1 ? 20 : 0,
                        borderBottomRightRadius:
                          index === prescriptions.length - 1 ? 20 : 0,
                      }}>
                      <View
                        style={{
                          width: '90%',
                          height: '100%',
                        }}>
                        <Text
                          style={{
                            fontSize: Platform.OS === 'ios' ? 17 : 14,
                            fontWeight: '600',
                            color: 'black',
                          }}>
                          {prescription.desc}
                        </Text>
                      </View>
                      <View
                        style={{
                          width: '10%',
                          height: '90%',
                          justifyContent: 'flex-end',
                          alignItems: 'center',
                        }}>
                        <TouchableOpacity
                          onPress={() => confirmDeletePrescription(index)}>
                          <Icon name="trash-o" size={20} color="red" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        )}

        {selectedPrescription !== null && (
          <Modal
            visible={selectedPrescription !== null}
            transparent={true}
            animationType="slide">
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  backgroundColor: 'white',
                  borderRadius: 20,
                  flexDirection: 'column',
                  paddingBottom: 3,
                  paddingLeft: 12,
                  paddingRight: 12,
                  borderRadius: 20,
                  width: '89%',
                  top: Platform.OS === 'ios' ? -8 : -25,
                  height: Platform.OS === 'ios' ? '73%' : '81%',
                }}>
                <View style={{ flex: 4 }}>
                  <View style={{ flex: 1 }}>
                    <View
                      style={{
                        flex: 0.5,
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: 'row',
                      }}>
                      <View style={{ marginLeft: 2, flexDirection: 'row' }}>
                        <Text
                          style={{
                            fontSize: Platform.OS === 'ios' ? 20 : 17,
                            fontWeight: 'bold',
                            color: '#4FC9BF',
                          }}>
                          {prescriptions[selectedPrescription].title}
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={{
                            marginLeft: 5,
                            fontSize: Platform.OS === 'ios' ? 20 : 16,
                            fontWeight: 'bold',
                          }}>
                          {prescriptions[selectedPrescription].date}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        flex: 1,
                        borderWidth: 2,
                        borderColor: '#FAFAFA',
                        borderRadius: 10,
                        padding: 5,
                      }}>
                      <Text
                        style={{
                          marginLeft: 5,
                          fontSize: Platform.OS === 'ios' ? 20 : 16,
                          fontWeight: '500',
                          textAlignVertical: 'top',
                        }}>
                        {prescriptions[selectedPrescription].desc}
                      </Text>
                    </View>

                    <View style={{ flex: 3 }}>
                      <View
                        style={{
                          flex: 0.5,
                          alignItems: 'center',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Text
                          style={{
                            fontSize: 25,
                            fontWeight: 'bold',
                            color: '#4FC9BF',
                          }}>
                          Medicine
                        </Text>
                      </View>
                      <View style={{ flex: 3 }}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                          {prescriptions[selectedPrescription].medicines.map(
                            (medicine, index) => (
                              <View
                                key={index}
                                style={{
                                  height: 60,
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                }}>
                                <View
                                  style={{
                                    width: '58%',
                                    height: 45,
                                    borderWidth: 2,
                                    borderColor: '#FAFAFA',
                                    justifyContent: 'center',
                                    alignItems: 'flex-start',
                                    paddingLeft: 5,
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: Platform.OS === 'ios' ? 20 : 16,
                                      fontWeight: 'bold',
                                    }}>
                                    {medicine.name}
                                  </Text>
                                </View>
                                <View
                                  style={{
                                    width: '20%',
                                    height: 45,
                                    borderWidth: 2,
                                    borderColor: '#FAFAFA',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: Platform.OS === 'ios' ? 20 : 16,
                                      fontWeight: 'bold',
                                      textAlign: 'center',
                                    }}>
                                    {medicine.time}
                                  </Text>
                                </View>
                                <View
                                  style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: '13%',
                                    height: 45,
                                    marginRight: 6,
                                    borderWidth: 2,
                                    borderColor: '#FAFAFA',
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: Platform.OS === 'ios' ? 20 : 16,
                                      fontWeight: 'bold',
                                      color: '#4FC9BF',
                                      textAlign: 'center',
                                      textAlignVertical: 'center',
                                    }}>
                                    {medicine.timePeriod}
                                  </Text>
                                </View>
                              </View>
                            )
                          )}
                        </ScrollView>
                      </View>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    flex: 0.3,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity
                    onPress={closePrescriptionDetails}
                    style={{
                      borderRadius: 10,
                      width: '25%',
                      marginTop: 5,
                      alignItems: 'flex-start',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        color: 'red',
                        fontSize: Platform.OS === 'ios' ? 18 : 15,
                        fontWeight: 'bold',
                        textAlign: 'center',
                      }}>
                      CLOSE
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={editPrescription}
                    style={{
                      borderRadius: 10,
                      width: '25%',
                      marginTop: 5,
                      alignItems: 'flex-end',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#4FC9BF',
                        fontSize: Platform.OS === 'ios' ? 18 : 15,
                        fontWeight: 'bold',
                        textAlign: 'center',
                      }}>
                      EDIT
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        )}

        {showAddPrescription && (
          <View
            style={{
              position: 'absolute',
              backgroundColor: 'white',
              zIndex: 2,
              top: -52,
              paddingBottom: 3,
              paddingLeft: 12,
              paddingRight: 12,
              borderRadius: 20,
              width: '100%',
              height: '95%',
            }}>
            <View style={{ flex: 4 }}>
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    flex: 0.5,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <View style={{ marginLeft: 2, flexDirection: 'row' }}>
                    <Text
                      style={{
                        fontSize: Platform.OS === 'ios' ? 20 : 17,
                        fontWeight: 'bold',
                        color: '#4FC9BF',
                      }}>
                      Dr.
                    </Text>
                    <TextInput
                      placeholder="Name"
                      placeholderTextColor="#A0A0A0"
                      value={doctorName}
                      onChangeText={(text) => setDoctorName(text)}
                      style={{
                        marginLeft: 5,
                        fontSize: Platform.OS === 'ios' ? 20 : 16,
                        fontWeight: 'bold',
                      }}
                    />
                  </View>
                  <View>
                    <TextInput
                      placeholder="DD/MM/YY"
                      placeholderTextColor="#A0A0A0"
                      value={prescriptionDate}
                      onChangeText={(text) => setPrescriptionDate(text)}
                      style={{
                        marginLeft: 5,
                        fontSize: Platform.OS === 'ios' ? 20 : 16,
                        fontWeight: 'bold',
                      }}
                    />
                  </View>
                </View>
                <View
                  style={{
                    flex: 1,
                    borderWidth: 2,
                    borderColor: '#FAFAFA',
                    borderRadius: 10,
                    padding: 5,
                  }}>
                  <TextInput
                    placeholder="Description"
                    placeholderTextColor="#A0A0A0"
                    value={prescriptionDesc}
                    onChangeText={(text) => setPrescriptionDesc(text)}
                    style={{
                      marginLeft: 5,
                      fontSize: Platform.OS === 'ios' ? 20 : 16,
                      fontWeight: '500',
                      textAlignVertical: 'top',
                    }}
                  />
                </View>
                <View style={{ flex: 3 }}>
                  <View
                    style={{
                      flex: 0.5,
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        fontSize: 25,
                        fontWeight: 'bold',
                        color: '#4FC9BF',
                      }}>
                      Medicine
                    </Text>
                    <TouchableOpacity onPress={addMedicine}>
                      <Text
                        style={{
                          fontSize: 40,
                          fontWeight: '400',
                          color: '#4FC9BF',
                          alignSelf: 'center',
                        }}>
                        +
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ flex: 3 }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                      {medicines.map((medicine, index) => (
                        <View
                          key={index}
                          style={{
                            height: 60,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}>
                          <TextInput
                            placeholder="Medicine Name"
                            placeholderTextColor="#A0A0A0"
                            value={medicine.name}
                            onChangeText={(text) =>
                              updateMedicineName(text, index)
                            }
                            style={{
                              fontSize: Platform.OS === 'ios' ? 20 : 16,
                              fontWeight: 'bold',
                              width: '58%',
                              height: 45,
                              borderWidth: 2,
                              borderColor: '#FAFAFA',
                            }}
                          />
                          <TextInput
                            placeholder="Time"
                            placeholderTextColor="#A0A0A0"
                            value={medicine.time}
                            onChangeText={(text) =>
                              updateMedicineTime(text, index)
                            }
                            style={{
                              fontSize: Platform.OS === 'ios' ? 20 : 16,
                              fontWeight: 'bold',
                              textAlign: 'center',
                              width: '20%',
                              height: 45,
                              borderWidth: 2,
                              borderColor: '#FAFAFA',
                            }}
                          />
                          <View
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              width: '13%',
                              height: 45,
                              marginRight: 6,
                              borderWidth: 2,
                              borderColor: '#FAFAFA',
                            }}>
                            <TouchableOpacity
                              onPress={() => toggleMedicineTimePeriod(index)}>
                              <Text
                                style={{
                                  fontSize: Platform.OS === 'ios' ? 20 : 16,
                                  fontWeight: 'bold',
                                  color: '#4FC9BF',
                                  textAlign: 'center',
                                  textAlignVertical: 'center',
                                }}>
                                {medicine.timePeriod}
                              </Text>
                            </TouchableOpacity>
                          </View>
                          <TouchableOpacity
                            onPress={() => confirmDeleteMedicine(index)}>
                            <Icon name="trash-o" size={20} color="red" />
                          </TouchableOpacity>
                        </View>
                      ))}
                    </ScrollView>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                flex: 0.3,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                onPress={closeAddPrescription}
                style={{
                  borderRadius: 10,
                  width: '25%',
                  marginTop: 5,
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: 'red',
                    fontSize: Platform.OS === 'ios' ? 18 : 15,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  CANCEL
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingLeft: 15,
                }}>
                <Text style={{ color: 'red' }}>{error}</Text>
              </View>
              <TouchableOpacity
                onPress={done}
                style={{
                  borderRadius: 10,
                  width: '25%',
                  marginTop: 5,
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: '#4FC9BF',
                    fontSize: Platform.OS === 'ios' ? 18 : 15,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  DONE
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default PrescriptionScreen;
