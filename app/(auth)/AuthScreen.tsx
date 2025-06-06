import { 
    SafeAreaView,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    View
} from 'react-native';
import AuthHeader from '@components/auth/AuthHeader';
import AuthForm from '@components/auth/AuthForm';
import AuthFooter from '@components/auth/AuthFooter';

export default function AuthScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.semicircle} />
            <KeyboardAvoidingView
                style={{ flex: 1, width: '100%' }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.inner}>
                        <AuthHeader />
                        <AuthForm />
                        <AuthFooter />
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E8EAFD',
    },
    inner: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 40,
    },
    semicircle: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 300,
    backgroundColor: '#94A9FF',
    borderBottomLeftRadius: 250,
    borderBottomRightRadius: 250,
  },
});
