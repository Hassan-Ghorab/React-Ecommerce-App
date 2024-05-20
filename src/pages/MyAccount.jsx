import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ActivePage from '../components/ActivePage';
import styles from './MyAccount.module.css';
import { auth } from '../firebaseConfig';
import {
  updateProfile,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from 'firebase/auth';
import { UserAuthContext } from '../components/context/UserAuthContext';
import { useLanguage } from '../components/context/LanguageContext';
import i18n from '../LanguageConfig';

function MyAccount() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { userName, userEmail, logout } = useContext(UserAuthContext);
  const [newFirstName, setNewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    const profileUpdates = {};

    if (newFirstName || newLastName) {
      profileUpdates.displayName = `${newFirstName} ${newLastName}`;
    }

    try {
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );
      await reauthenticateWithCredential(user, credential);

      await updateProfile(user, profileUpdates);

      if (newPassword === confirmPassword) {
        await updatePassword(user, newPassword);
      } else {
        setSuccessMessage("New passwords don't match");
      }
      setSuccessMessage('Profile updated successfully.');
      logout();
      navigate('/');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div dir={i18n.t('dir')} className="container">
      <div className={styles.accountName}>
        <ActivePage>
          <Link to="/myAccount">
            {language === 'en' ? 'My Account' : 'حسابي'}
          </Link>
        </ActivePage>

        <h4 className={styles.accountUsername}>
          {language === 'en' ? 'Welcome!' : 'مرحبا!'}
          <span> {userName}</span>
        </h4>
      </div>

      <div className={styles.accountInfoContainer}>
        <div className={styles.accountPages}>
          <div className={styles.accountInfo}>
            <h4>{language === 'en' ? 'Manage My Account' : 'إدارة حسابي'}</h4>
            <div>
              <Link className={styles.activePage}>
                {language === 'en' ? 'My Profile' : 'ملفي الشخصي'}
              </Link>
              <Link>
                {language === 'en' ? 'Address Book' : 'دفتر العناوين'}
              </Link>
              <Link>
                {language === 'en'
                  ? 'My Payment Options'
                  : 'خيارات الدفع الخاصة بي'}
              </Link>
            </div>
          </div>
          <div className={styles.accountInfo}>
            <h4>{language === 'en' ? 'My Orders' : 'طلباتي'}</h4>
            <div>
              <Link>{language === 'en' ? 'My Returns' : 'مرتجعاتي'}</Link>
              <Link>
                {language === 'en' ? 'Address Book' : 'دفتر العناوين'}
              </Link>
            </div>
          </div>

          <h4>
            <Link to="/wishlist">
              {language === 'en' ? 'My WishList' : 'قائمة أمنياتي'}
            </Link>
          </h4>
        </div>

        <form className={styles.accountForm} onSubmit={handleUpdateProfile}>
          <h3 className={styles.titleForm}>
            {language === 'en' ? 'Edit Your Profile' : 'تعديل ملفك الشخصي'}
          </h3>
          <div className={styles.userName}>
            <div className={styles.inputContainer}>
              <label htmlFor="firstName">
                {language === 'en' ? 'First Name' : 'الاسم الأول'}
              </label>
              <input
                type="text"
                name="firstName"
                value={newFirstName}
                onChange={(e) => setNewFirstName(e.target.value)}
              />
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="lastName">
                {language === 'en' ? 'Last Name' : 'اسم العائلة'}
              </label>
              <input
                type="text"
                name="lastName"
                value={newLastName}
                onChange={(e) => setNewLastName(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.emailAddress}>
            <div className={styles.inputContainer}>
              <label htmlFor="email">
                {language === 'en' ? 'Email' : 'البريد الإلكتروني'}
              </label>
              <input
                type="email"
                name="email"
                placeholder={userEmail}
                disabled
              />
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="address">
                {language === 'en' ? 'Address' : 'العنوان'}
              </label>
              <input type="text" name="address" required />
            </div>
          </div>

          <div className={styles.password}>
            <label htmlFor="password">
              {language === 'en' ? 'Password Changes' : 'تغييرات كلمة المرور'}
            </label>
            <input
              type="password"
              name="password"
              placeholder={
                language === 'en' ? 'Current Password' : 'كلمة المرور الحالية'
              }
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
            <input
              type="password"
              name="newPassword"
              placeholder={
                language === 'en' ? 'New Password' : 'كلمة مرور جديدة'
              }
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder={
                language === 'en' ? 'Confirm Password' : 'تأكيد كلمة المرور'
              }
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className={styles.accountFormBtns}>
            {errorMessage && <div>{errorMessage}</div>}
            <button type="submit" className={styles.saveChangesBtn}>
              {language === 'en' ? 'Save Changes' : 'احفظ التغييرات'}
            </button>
          </div>
        </form>
        {successMessage && (
          <div className={styles.successMessage}>{successMessage}</div>
        )}
      </div>
    </div>
  );
}

export default MyAccount;
