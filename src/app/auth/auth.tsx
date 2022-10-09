import { ChangeEvent, FormEvent, useCallback } from "react";
import Spinner from "../../components/spinner";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";

export const Auth = () => {
  const lang = useTranslate().lang();
  const store = useStore();
  const select = useSelector((state: any) => ({
    waiting: state.auth.waiting,
    token: state.auth.token,
    email: state.auth.email,
    password: state.auth.password,
  }));

  const callbacks = {
    onSubmit: useCallback((e: FormEvent) => {
      e.preventDefault();
      store.get("auth").auth();
    }, []),
    onChange: useCallback((e: ChangeEvent<HTMLInputElement>) => store.get("auth").setForm(e.target.name, e.target.value), []),
    onCancelChange: useCallback(() => store.get("auth").clearForm(), []),
  };

  return (
    <div style={{ maxWidth: 320 }}>
      <Spinner active={select.waiting}>
        <form onSubmit={callbacks.onSubmit} style={{ display: "flex", flexDirection: "column", margin: "inherit", gap: 10 }}>
          <input name="email" placeholder={`${lang.auth.testEmail} - alex@alex.ru`} onChange={callbacks.onChange} value={select.email} />
          <input name="password" placeholder={`${lang.auth.testPass} - 111`} onChange={callbacks.onChange} value={select.password} />
          <button type="submit">{lang.auth.send}</button>
        </form>
        <button onClick={callbacks.onCancelChange}>{lang.auth.cancel}</button>
        <div style={{ maxWidth: 320, width: "100%" }}>token - {select.token}</div>
      </Spinner>
    </div>
  );
};
