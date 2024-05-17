import styles from './Login.module.css';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';
import loginImage from '../assets/Sign-Login-Image.png';
import { useLanguage } from '../components/context/LanguageContext';
import i18n from '../LanguageConfig';

function Login() {
  const { language } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLoginWithEmailPassword = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEmail('');
      setPassword('');
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleForgotPassword = () => {
    if (!email) {
      setError(
        language === 'en'
          ? 'Please enter your email address.'
          : 'الرجاء إدخال عنوان بريدك الإلكتروني.'
      );
      return;
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log(
          language === 'en'
            ? 'Password reset email sent'
            : 'تم إرسال بريد إعادة تعيين كلمة المرور'
        );
        setError(null);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div  className={styles.loginContainer}>
      <div className={styles.loginImageContainer}>
        <img
          className={styles.loginImage}
          src={loginImage}
          alt={language === 'en' ? 'Signup Image' : 'صورة التسجيل'}
        />
      </div>
      <div  dir={i18n.t('dir')} className={styles.loginFormContainer}>
        <h2>
          {language === 'en'
            ? 'Log in to Exclusive'
            : 'تسجيل الدخول إلى Exclusive'}
        </h2>
        <p>
          {language === 'en'
            ? 'Enter your details below'
            : 'أدخل تفاصيلك أدناه'}
        </p>
        <input
          type="email"
          id="email"
          name="email"
          placeholder={language === 'en' ? 'Email' : 'البريد الإلكتروني'}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder={language === 'en' ? 'Password' : 'كلمة المرور'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className={styles.mainLogin}>
          <button
            className={styles.loginBtn}
            onClick={handleLoginWithEmailPassword}
          >
            {language === 'en' ? 'Log in' : 'تسجيل الدخول'}
          </button>
          <button
            className={styles.forgetPasswordBtn}
            onClick={handleForgotPassword}
          >
            {language === 'en' ? 'Forgot Password' : 'نسيت كلمة المرور'}
          </button>
        </div>

        {error && <div>{error}</div>}
        <p className={styles.signUpPage}>
          {language === 'en' ? 'Do not have an account?' : 'ليس لديك حساب؟'}
          <Link to="/signup">{language === 'en' ? 'Sign Up' : 'سجل الآن'}</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
