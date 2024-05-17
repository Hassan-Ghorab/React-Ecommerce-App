import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../firebaseConfig'; // Import the auth object
import styles from './Signup.module.css';
import signupImage from '../assets/Sign-Login-Image.png';
import { useContext, useState } from 'react';
import { UserAuthContext } from '../components/context/UserAuthContext';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
} from 'firebase/auth';
import { useLanguage } from '../components/context/LanguageContext';
import i18n from '../LanguageConfig';

function Signup() {
  const { language } = useLanguage();

  const { handleSignupDetails } = useContext(UserAuthContext);
  const [user, setUser] = useState({
    fullName: '',
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );
      await updateProfile(userCredential.user, {
        displayName: user.fullName,
      });

      handleSignupDetails(user.fullName, user.email);
      navigate('/');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const authInstance = getAuth();
      const result = await signInWithPopup(
        authInstance,
        new GoogleAuthProvider()
      );
      await updateProfile(result.user, { displayName: user.fullName });
      navigate('/');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className={styles.signUpContainer}>
      <div className={styles.signUpImageContainer}>
        <img
          className={styles.signUpImage}
          src={signupImage}
          alt={language === 'en' ? 'Signup Image' : 'صورة التسجيل'}
        />
      </div>
      <div dir={i18n.t('dir')} className={styles.signUpFormContainer}>
        <h2>{language === 'en' ? 'Create an account' : 'إنشاء حساب'}</h2>
        <p>
          {language === 'en'
            ? 'Enter your details below'
            : 'أدخل تفاصيلك أدناه'}
        </p>
        <form className={styles.signUpForm} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder={language === 'en' ? 'Full Name' : 'الاسم الكامل'}
            value={user.fullName}
            name="fullName"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder={language === 'en' ? 'Email' : 'البريد الإلكتروني'}
            value={user.email}
            name="email"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder={language === 'en' ? 'Password' : 'كلمة المرور'}
            value={user.password}
            name="password"
            onChange={handleChange}
            required
          />

          <button className={styles.createAccount} type="submit">
            {language === 'en' ? 'Create Account' : 'إنشاء حساب'}
          </button>
        </form>

        <button
          className={styles.singUpWithGoogleBtn}
          onClick={handleGoogleSignUp}
        >
          <svg
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_4970_3336)">
                <path
                  d="M23.766 12.7764C23.766 11.9607 23.6999 11.1406 23.5588 10.3381H12.24V14.9591H18.7217C18.4528 16.4494 17.5885 17.7678 16.323 18.6056V21.6039H20.19C22.4608 19.5139 23.766 16.4274 23.766 12.7764Z"
                  fill="#4285F4"
                />
                <path
                  d="M12.2401 24.5008C15.4766 24.5008 18.2059 23.4382 20.1945 21.6039L16.3276 18.6055C15.2517 19.3375 13.8627 19.752 12.2445 19.752C9.11388 19.752 6.45946 17.6399 5.50705 14.8003H1.5166V17.8912C3.55371 21.9434 7.7029 24.5008 12.2401 24.5008Z"
                  fill="#34A853"
                />
                <path
                  d="M5.50253 14.8003C4.99987 13.3099 4.99987 11.6961 5.50253 10.2057V7.11481H1.51649C-0.18551 10.5056 -0.18551 14.5004 1.51649 17.8912L5.50253 14.8003Z"
                  fill="#FBBC04"
                />
                <path
                  d="M12.2401 5.24966C13.9509 5.2232 15.6044 5.86697 16.8434 7.04867L20.2695 3.62262C18.1001 1.5855 15.2208 0.465534 12.2401 0.500809C7.7029 0.500809 3.55371 3.05822 1.5166 7.11481L5.50264 10.2058C6.45064 7.36173 9.10947 5.24966 12.2401 5.24966Z"
                  fill="#EA4335"
                />
              </g>
              <defs>
                <clipPath id="clip0_4970_3336">
                  <rect
                    width="24"
                    height="24"
                    fill="white"
                    transform="translate(0 0.5)"
                  />
                </clipPath>
              </defs>
            </svg>
          </svg>
          {language === 'en' ? 'Sign Up with Google' : 'التسجيل باستخدام جوجل'}
        </button>

        {errorMessage && (
          <div className={styles.errorMessage}>{errorMessage}</div>
        )}

        <p className={styles.loginPage}>
          {language === 'en'
            ? 'Already have an account?'
            : 'هل لديك حساب بالفعل؟'}
          <Link to="/login">
            {language === 'en' ? 'Log In' : 'تسجيل الدخول'}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
