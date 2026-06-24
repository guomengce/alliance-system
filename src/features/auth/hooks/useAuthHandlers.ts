import type { FormEvent } from 'react';

import { useAppContext } from '../../../context/AppContext';
import {
  loginWithBackend,
  registerWithBackend,
  requestBackendResetCode,
  resetBackendPassword,
  toRegisteredUser,
} from '../actions';
import type { LoginViewProps } from '../types';
import {
  isValidAuthEmail,
  isValidAuthPassword,
  normalizeAuthEmail,
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
  const { setRegisteredUsers, setAdminRole } = useAppContext();
  const {
    setView,
    setErrorMsg,
    setAlertType,
    rememberMe,
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

  const showRequestError = (error: unknown, fallback: string) => {
    setAlertType('error');
    setErrorMsg(error instanceof Error ? error.message : fallback);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const trimmedEmail = normalizeAuthEmail(loginEmail);

    if (!isValidAuthEmail(trimmedEmail)) {
      setAlertType('error');
      setErrorMsg('请输入合法的登录邮箱账号');
      return;
    }

    if (!loginPassword || !isValidAuthPassword(loginPassword)) {
      setAlertType('error');
      setErrorMsg('密码长度不足，请重试');
      return;
    }

    try {
      const result = await loginWithBackend({
        email: trimmedEmail,
        password: loginPassword,
        remember: rememberMe,
      });

      setPortalMode(result.user.portalMode);
      setAdminRole(result.user.role);
      setNickname(result.user.nickname);
      setEmail(result.user.email);

      onSuccess(result.user.portalMode);
    } catch (error) {
      showRequestError(error, '登录失败，请检查账号或密码');
    }
  };

  const handleRegister = async (e: FormEvent) => {
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
      setErrorMsg('请输入昵称');
      return;
    }

    if (!isValidAuthPassword(regPassword)) {
      setAlertType('error');
      setErrorMsg('密码长度至少需要 4 位');
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setAlertType('error');
      setErrorMsg('两次输入的密码不一致');
      return;
    }

    try {
      const result = await registerWithBackend({
        email: trimmedEmail,
        nickname: trimmedNick,
        password: regPassword,
        remember: rememberMe,
      });

      setRegisteredUsers(prev => [...prev, toRegisteredUser(result.user, regPassword)]);
      setPortalMode(result.user.portalMode);
      setAdminRole(result.user.role);
      setNickname(result.user.nickname);
      setEmail(result.user.email);
      setLoginEmail(result.user.email);
      setLoginPassword(regPassword);

      onSuccess(result.user.portalMode);
    } catch (error) {
      showRequestError(error, '注册失败，请检查账号信息');
    }
  };

  const handleRequestResetCode = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const trimmedForgot = normalizeAuthEmail(forgotEmail);

    if (!isValidAuthEmail(trimmedForgot)) {
      setAlertType('error');
      setErrorMsg('请输入用于验证的登录邮箱');
      return;
    }

    try {
      const result = await requestBackendResetCode({ email: trimmedForgot });
      setResetCode(result.resetToken ?? '');
      setNewPassword('');
      setConfirmNewPassword('');
      setAlertType('success');
      setErrorMsg(result.resetToken ? `${result.message} [ ${result.resetToken} ]` : result.message);
      setView('reset');
    } catch (error) {
      showRequestError(error, '重置密码申请失败，请检查邮箱');
    }
  };

  const handleResetPassword = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!resetCode.trim()) {
      setAlertType('error');
      setErrorMsg('请输入后端发放的重置验证码');
      return;
    }

    if (!isValidAuthPassword(newPassword)) {
      setAlertType('error');
      setErrorMsg('新密码长度至少需要 4 位');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setAlertType('error');
      setErrorMsg('两次填写的密码不匹配');
      return;
    }

    try {
      const result = await resetBackendPassword({
        email: forgotEmail,
        code: resetCode,
        newPassword,
      });

      setLoginEmail(normalizeAuthEmail(forgotEmail));
      setLoginPassword(newPassword);
      setAlertType('success');
      setErrorMsg(result.message);
      setView('login');
    } catch (error) {
      showRequestError(error, '密码重置失败，请检查验证码');
    }
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
