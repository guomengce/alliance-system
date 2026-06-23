import type { FormEvent } from 'react';

import { useAppContext } from '../../../context/AppContext';
import type { LoginViewProps } from '../types';
import {
  createRegisteredUser,
  findRegisteredUser,
  getRegistrationIdentity,
  isRegisteredEmailConflict,
  isResetCodeValid,
  isValidAuthEmail,
  isValidAuthPassword,
  normalizeAuthEmail,
  updateRegisteredUserPassword,
} from '../utils';
import type { AuthFormState } from './useAuthFormState';

type AuthHandlerProps = Pick<
  LoginViewProps,
  | 'setPortalMode'
  | 'loginEmail'
  | 'setLoginEmail'
  | 'loginPassword'
  | 'setLoginPassword'
  | 'setNickname'
  | 'setEmail'
  | 'onSuccess'
>;

export interface UseAuthHandlersParams extends AuthHandlerProps {
  formState: AuthFormState;
}

export function useAuthHandlers({
  formState,
  setPortalMode,
  loginEmail,
  setLoginEmail,
  loginPassword,
  setLoginPassword,
  setNickname,
  setEmail,
  onSuccess,
}: UseAuthHandlersParams) {
  const { registeredUsers, setRegisteredUsers, setAdminRole } = useAppContext();
  const {
    setView,
    setErrorMsg,
    setAlertType,
    regEmail,
    regNickname,
    regPassword,
    regConfirmPassword,
    forgotEmail,
    setForgotEmail,
    resetCode,
    setResetCode,
    newPassword,
    setNewPassword,
    confirmNewPassword,
    setConfirmNewPassword,
  } = formState;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const trimmedEmail = normalizeAuthEmail(loginEmail);

    if (!isValidAuthEmail(trimmedEmail)) {
      setAlertType('error');
      setErrorMsg('请输入合法的系统安全登录邮箱账户');
      return;
    }

    if (!loginPassword || !isValidAuthPassword(loginPassword)) {
      setAlertType('error');
      setErrorMsg('系统密钥口令长度不足，请重试');
      return;
    }

    const matched = findRegisteredUser(registeredUsers, trimmedEmail);

    if (!matched) {
      setAlertType('error');
      setErrorMsg('登录账号未在系统注册，请先点击下方注册新账户');
      return;
    }

    if (matched.password !== loginPassword) {
      setAlertType('error');
      setErrorMsg('您输入的登录密钥/密码不正确，请重新输入');
      return;
    }

    setPortalMode(matched.portalMode);
    setAdminRole(matched.role);
    setNickname(matched.nickname);
    setEmail(matched.email);

    onSuccess(matched.portalMode);
  };

  const handleRegister = (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const trimmedEmail = normalizeAuthEmail(regEmail);
    const trimmedNick = regNickname.trim();

    if (!isValidAuthEmail(trimmedEmail)) {
      setAlertType('error');
      setErrorMsg('邮箱格式错误');
      return;
    }

    if (!trimmedNick) {
      setAlertType('error');
      setErrorMsg('请输入同盟专属名称（昵称）');
      return;
    }

    if (!isValidAuthPassword(regPassword)) {
      setAlertType('error');
      setErrorMsg('密码安全强度不足，最少 4 位');
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setAlertType('error');
      setErrorMsg('两次输入的密码不一致');
      return;
    }

    if (isRegisteredEmailConflict(registeredUsers, trimmedEmail)) {
      setAlertType('error');
      setErrorMsg('此邮箱已注册，请直接登录或找回密码');
      return;
    }

    const identity = getRegistrationIdentity(trimmedEmail);
    const newUser = createRegisteredUser(trimmedEmail, regPassword, trimmedNick);

    setRegisteredUsers(prev => [...prev, newUser]);

    setLoginEmail(trimmedEmail);
    setLoginPassword(regPassword);

    setAlertType('success');
    setErrorMsg(`注册成功！已为您分配：${identity.isTestSystemMail ? '系统管理员菜单 (Operator)' : '联盟普通会员账户'}`);
    setView('login');
  };

  const handleRequestResetCode = (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const trimmedForgot = normalizeAuthEmail(forgotEmail);

    if (!isValidAuthEmail(trimmedForgot)) {
      setAlertType('error');
      setErrorMsg('请输入用以验证的系统安全登录邮箱');
      return;
    }

    const matched = findRegisteredUser(registeredUsers, trimmedForgot);

    if (!matched) {
      setAlertType('error');
      setErrorMsg('未查找到此邮箱注册信息，请核对后重试');
      return;
    }

    setResetCode('');
    setNewPassword('');
    setConfirmNewPassword('');
    setAlertType('success');
    setErrorMsg('系统重置密码安全验证码已被分发，演示核验码为 [ 123456 ]');
    setView('reset');
  };

  const handleResetPassword = (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!isResetCodeValid(resetCode)) {
      setAlertType('error');
      setErrorMsg('安全核验码不正确，请核对或重新输入 demonstration key: 123456');
      return;
    }

    if (!isValidAuthPassword(newPassword)) {
      setAlertType('error');
      setErrorMsg('新密码过于简单，长度至少需要4位');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setAlertType('error');
      setErrorMsg('两次填写的密码不匹配，请重新核对');
      return;
    }

    setRegisteredUsers(prev => updateRegisteredUserPassword(prev, forgotEmail, newPassword));

    setLoginEmail(normalizeAuthEmail(forgotEmail));
    setLoginPassword(newPassword);

    setAlertType('success');
    setErrorMsg('您的同盟系统登录密码已被重置更新！请重新输入新密码登录。');
    setView('login');
  };

  const handleForgotClick = () => {
    setErrorMsg('');
    setForgotEmail(loginEmail);
    setView('forgot');
  };

  const handleRegisterClick = () => {
    setErrorMsg('');
    setView('register');
  };

  const handleBackToLogin = () => {
    setView('login');
    setErrorMsg('');
  };

  const handleBackToForgot = () => {
    setView('forgot');
    setErrorMsg('');
  };

  return {
    handleSubmit,
    handleRegister,
    handleRequestResetCode,
    handleResetPassword,
    handleForgotClick,
    handleRegisterClick,
    handleBackToLogin,
    handleBackToForgot,
  };
}
