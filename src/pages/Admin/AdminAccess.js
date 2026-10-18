import React, { useEffect, useRef, useState } from "react";
import Admin from "./Admin";
import { ADMIN_AUTH_REQUIRED, fetchAdminSession, loginAdmin, logoutAdmin } from "../../data/adminAuth";
import { isLocalAdminPreview } from "../../data/adminLocalPreview";
import {
  ActionButton, AdminShell, Brand, BrandMark, Field, FormGrid, FormLabel,
  GhostButton, HelpText, Input, LoginPanel, LoginScreen, PageDescription, PageTitle, SiteLink,
} from "./style";

const AdminAccess = () => {
  const [auth, setAuth] = useState({ status: isLocalAdminPreview ? "authenticated" : "checking" });
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const pending = useRef(false);

  useEffect(() => {
    if (isLocalAdminPreview) return undefined;
    const controller = new AbortController();
    setAuth({ status: "checking" });
    fetchAdminSession(controller.signal).then((session) => {
      setAuth({ status: session.authenticated ? "authenticated" : "login", expiresAt: session.expiresAt });
    }).catch((error) => {
      if (error.name !== "AbortError") {
        setMessage(error.message);
        setAuth({ status: "error" });
      }
    });
    return () => controller.abort();
  }, [reloadKey]);

  useEffect(() => {
    if (isLocalAdminPreview) return undefined;
    const requireLogin = () => {
      setAuth({ status: "login" });
      setPassword("");
      setMessage("로그인이 만료되었습니다. 다시 로그인해주세요.");
    };
    window.addEventListener(ADMIN_AUTH_REQUIRED, requireLogin);
    return () => window.removeEventListener(ADMIN_AUTH_REQUIRED, requireLogin);
  }, []);

  useEffect(() => {
    if (isLocalAdminPreview || auth.status !== "authenticated") return undefined;
    const expires = Date.parse(auth.expiresAt);
    const expire = () => {
      setAuth({ status: "login" });
      setMessage("로그인이 만료되었습니다. 다시 로그인해주세요.");
    };
    if (!Number.isFinite(expires) || expires <= Date.now()) { expire(); return undefined; }
    const timer = window.setTimeout(expire, expires - Date.now());
    return () => window.clearTimeout(timer);
  }, [auth]);

  const submit = async (event) => {
    event.preventDefault();
    if (pending.current) return;
    pending.current = true;
    setBusy(true);
    setMessage("");
    try {
      const session = await loginAdmin(password);
      if (!session.authenticated) throw new Error("로그인을 확인하지 못했습니다.");
      setPassword("");
      setAuth({ status: "authenticated", expiresAt: session.expiresAt });
    } catch (error) {
      setMessage(error.message);
    } finally {
      pending.current = false;
      setBusy(false);
    }
  };

  const logout = async () => {
    if (pending.current) return;
    pending.current = true;
    setBusy(true);
    setMessage("");
    try {
      await logoutAdmin();
      setAuth({ status: "login" });
      setPassword("");
    } catch (error) {
      setMessage(error.message);
    } finally {
      pending.current = false;
      setBusy(false);
    }
  };

  if (auth.status === "authenticated") return (
    <Admin onLogout={isLocalAdminPreview ? undefined : logout} isLoggingOut={busy} logoutError={message} />
  );

  return (
    <AdminShell>
      <LoginScreen>
        <LoginPanel aria-labelledby="admin-login-title">
          <Brand><BrandMark>D</BrandMark><span>DELIGHT FILM</span></Brand>
          <div>
            <PageTitle id="admin-login-title">관리자 로그인</PageTitle>
            <PageDescription>관리자 비밀번호를 입력해주세요.</PageDescription>
          </div>
          {auth.status === "checking" ? <HelpText role="status">로그인 상태를 확인하는 중입니다.</HelpText> : (
            <FormGrid onSubmit={submit}>
              <Field>
                <FormLabel htmlFor="admin-password">비밀번호</FormLabel>
                <Input id="admin-password" name="password" type="password" autoComplete="current-password"
                  value={password} onChange={(event) => setPassword(event.target.value)}
                  maxLength={512} required autoFocus disabled={busy} />
              </Field>
              {message && <HelpText $error role="alert">{message}</HelpText>}
              <ActionButton type="submit" disabled={busy || !password}>{busy ? "확인 중..." : "로그인"}</ActionButton>
              {auth.status === "error" && <GhostButton type="button" disabled={busy} onClick={() => { setMessage(""); setReloadKey((key) => key + 1); }}>연결 다시 확인</GhostButton>}
            </FormGrid>
          )}
          <SiteLink href="/">홈페이지로 돌아가기 ↗</SiteLink>
        </LoginPanel>
      </LoginScreen>
    </AdminShell>
  );
};

export default AdminAccess;
