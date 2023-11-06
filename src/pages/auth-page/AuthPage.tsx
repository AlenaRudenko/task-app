import React from "react";
import { AppInput } from "../../components/app-input/AppInput";
import "./styles.scss";
import { TEvent } from "../../interfaces/TEvent";
import { AppButton } from "../../components/app-button/AppButton";
import { Header } from "../../components/header/Header";
import { Path, To, useLocation, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { Dispatch, RootState } from "../../store/store";
import { localStore } from "../../services/localStorage.service";

interface IState {
  loginValue: string;
  passwordValue: string;
  message: string;
}

interface RouterProps {
  navigate: NavigateFunction;
  location: Location;
}
interface Location extends Path {
  state: any;
}
interface NavigateFunction {
  (to: To, options?: NavigateOptions): void;
  (delta: number): void;
}

interface NavigateOptions {
  replace?: boolean;
  state?: any;
  preventScrollReset?: boolean;
  relative?: RelativeRoutingType;
}
type DispatchProps = ReturnType<typeof mapDispatch>;
type StateProps = ReturnType<typeof mapStateToProps>;
type RelativeRoutingType = "route" | "path";
type Props = RouterProps & DispatchProps & StateProps;

export class AuthPage extends React.Component<Props, IState> {
  state = {
    loginValue: "",
    passwordValue: "",
    message: "",
  };
  handleLoginInput(value: TEvent) {
    this.setState({ loginValue: value.target.value, message: "" });
  }

  handlePasswordInput(value: TEvent) {
    this.setState({ passwordValue: value.target.value, message: "" });
  }

  async handleClick() {
    if (this.state.loginValue && this.state.passwordValue) {
      const result = await this.props.login({
        login: this.state.loginValue,
        password: this.state.passwordValue,
      });
      if (result === "SUCCESS" && this.props.userId) {
        this.props.navigate("/tasks/shortView/");
        localStore.setUserId(this.props.userId);
      } else if (result === "INVALID DATA") {
        this.setState({ message: "Неверные данные" });
      } else {
        this.setState({ message: "Такого пользователя не существует" });
      }
    }
  }

  render() {
    const { loginValue, passwordValue, message } = this.state;
    const { handleLoginInput, handlePasswordInput, handleClick } = this;

    return (
      <div className='authPage'>
        <Header />
        <div className='authPage__container'>
          <div className='authPage__content'>
            <AppInput
              type='text'
              key={"login"}
              value={loginValue}
              onChangeValue={handleLoginInput.bind(this)}
              placeholder='login'
              label='Введите логин'
            />
            <AppInput
              type='password'
              key={"password"}
              value={passwordValue}
              onChangeValue={handlePasswordInput.bind(this)}
              label='Введите пароль'
              placeholder='password'
            />
            <AppButton
              text={"SEND"}
              isDisabled={!(passwordValue && loginValue)}
              onHandleClick={handleClick.bind(this)}
            />
            <div className='authPage__message'>
              <span>{message}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    userId: state.user?.id,
  };
};

const mapDispatch = (dispatch: Dispatch) => {
  return {
    login: dispatch.user.login,
  };
};

const AuthPageContainer = connect(mapStateToProps, mapDispatch)(AuthPage);

export const WithRouter = () => {
  let location = useLocation();
  let navigate: NavigateFunction = useNavigate();

  return <AuthPageContainer location={location} navigate={navigate} />;
};
