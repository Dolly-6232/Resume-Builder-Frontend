import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

interface HeaderProps {
  title?: string;
  subtitle?: string;
  height?: number;
}

const Header: React.FC<HeaderProps> = ({
  title = 'Welcome Back',
  subtitle = 'Sign in to keep building your resume.',
  height = 300,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrapper, { height: height + insets.top }]}>
      <ImageBackground
        source={require('../../assets/images/headerBackground.jpg')}
        style={styles.background}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['rgba(9, 21, 64, 0.55)', 'rgba(15, 43, 122, 0.85)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.overlay, { paddingTop: insets.top }]}
        >
          <View style={styles.content}>
            <View style={styles.logoRing}>
              <Image
                source={require('../../assets/images/logo.jpg')}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>

            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  wrapper: {
    width,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    overflow: 'hidden',
  },
  background: {
    flex: 1,
    width: '100%',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 48,
  },
  content: {
    alignItems: 'center',
  },
  logoRing: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
  },
  logo: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 8,
    color: 'rgba(226, 232, 240, 0.95)',
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    maxWidth: width * 0.78,
  },
});
