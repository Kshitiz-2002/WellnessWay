import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SignupScreen = () => {
  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [error, setError] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [loading, setLoading] = useState(false); // Added loading state

  const navigation = useNavigation();

  const handleSignup = async () => {
    if (
      !patientName ||
      !patientAge ||
      !gender ||
      !address ||
      !city ||
      !state ||
      !phoneNumber ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      setError('Enter all details');
      return;
    }

    const user = {
      name: patientName,
      age: patientAge,
      gender: gender,
      address: address,
      city: city,
      state: state,
      phonenum: phoneNumber,
      emailaddress: email,
      password: password,
    };

    try {
      setLoading(true); // Set loading to true while waiting for the response

      const response = await fetch(
        'https://dbfb539b-1621-4585-8f4e-2729f136a9b5-00-udz7gviutoov.kirk.replit.dev/signup',
        // 'https://wellnesswayserver.kshitizpandey.repl.co/signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        }
      );

      if (response.ok) {
        setError('');
        // Handle success, e.g., navigate to the next screen
        navigation.navigate('NavigationScreen', { user: user });
      } else {
        // Handle error
        setError('Signup failed');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Set loading back to false regardless of success or failure
    }
  };

  const handleOptionPress = (option) => {
    setGender(option);
    setSelectedOption(option);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create an Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="#A0A0A0"
        value={patientName}
        onChangeText={(text) => setPatientName(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Age"
        placeholderTextColor="#A0A0A0"
        value={patientAge}
        onChangeText={(text) => setPatientAge(text)}
        keyboardType="numeric"
      />

      <View style={styles.genderContainer}>
        <TouchableOpacity
          style={[
            styles.option,
            selectedOption === 'male' && styles.selectedOption,
          ]}
          onPress={() => handleOptionPress('male')}>
          <Text style={styles.optionText}>Male</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.option,
            selectedOption === 'female' && styles.selectedOption,
          ]}
          onPress={() => handleOptionPress('female')}>
          <Text style={styles.optionText}>Female</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.option,
            selectedOption === 'other' && styles.selectedOption,
          ]}
          onPress={() => handleOptionPress('other')}>
          <Text style={styles.optionText}>Other</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Address"
        placeholderTextColor="#A0A0A0"
        value={address}
        onChangeText={(text) => setAddress(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="City"
        placeholderTextColor="#A0A0A0"
        value={city}
        onChangeText={(text) => setCity(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="State"
        placeholderTextColor="#A0A0A0"
        value={state}
        onChangeText={(text) => setState(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        placeholderTextColor="#A0A0A0"
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
        keyboardType="phone-pad"
      />

      <TextInput
        style={styles.input}
        placeholder="Email Address"
        placeholderTextColor="#A0A0A0"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#A0A0A0"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#A0A0A0"
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
        secureTextEntry
      />
      <Text style={styles.error}>{error}</Text>
      <TouchableOpacity
        style={styles.signupButton}
        onPress={handleSignup}
        disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={styles.signupText}>Sign Up</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FAFAFA',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#262626',
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#EAEAEA',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: '#262626',
  },
  signupButton: {
    width: '100%',
    height: 40,
    backgroundColor: '#4FC9BF',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  error: {
    fontSize: 14,
    color: 'red',
  },
  signupText: {
    color: 'white',
    fontSize: 16,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  option: {
    flex: 1,
    height: 40,
    backgroundColor: '#EAEAEA',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  selectedOption: {
    backgroundColor: '#4FC9BF',
  },
  optionText: {
    color: '#262626',
    fontSize: 16,
  },
});

export default SignupScreen;
