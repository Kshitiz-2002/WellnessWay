import React, { useState } from 'react';
import {
  Image,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Added loading state

  const handleLogin = async () => {
    if (
      !email ||
      !password 
    ) {
      setError('Enter Credentials');
      return;
    }
    try {
      setLoading(true); // Set loading to true while waiting for the response

      const userCredentials = {
        emailaddress: email,
        password: password,
      };

      const response = await fetch(
        'https://dbfb539b-1621-4585-8f4e-2729f136a9b5-00-udz7gviutoov.kirk.replit.dev/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userCredentials),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        setError('')
        // Pass the user data to the navigation screen
        navigation.navigate('NavigationScreen', { user: responseData.user });
      } else {
        const errorText = await response.text();
        setError('Invalid Credentials')
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Set loading back to false regardless of success or failure
    }
  };

  const handleSignup = () => {
    setError('')
    navigation.navigate('SignupScreen');
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../assets/wellnessway-high-resolution-logo-transparent.png')}
      />

      <Text style={styles.signIn}>{error}</Text>

      <TextInput
        style={styles.input}
        placeholder="Email Address"
        placeholderTextColor="#A0A0A0"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#A0A0A0"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLogin}
        disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={styles.loginText}>Log In</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.forgotPasswordButton}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
        <Text style={styles.signupText}>Don't have an account? Sign up.</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    height: 120,
    width: 150,
    marginBottom: 20,
  },
  signIn: {
    fontSize: 14,
    marginVertical: 10,
    color: 'red',
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
  loginButton: {
    width: '100%',
    height: 40,
    backgroundColor: '#4FC9BF',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  loginText: {
    color: 'white',
    fontSize: 16,
  },
  forgotPasswordButton: {
    width: '100%',
    alignItems: 'center',
  },
  forgotPassword: {
    color: '#4FC9BF',
    fontSize: 14,
    marginTop: 10,
  },
  signupButton: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    height: 40,
    backgroundColor: '#FAFAFA',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#4FC9BF',
    justifyContent: 'center',
  },
  signupText: {
    color: '#4FC9BF',
    fontSize: 16,
  },
});

export default LoginScreen;
