import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Fab, Stack, TextField } from "@mui/material";
import styled from "styled-components";
import LoginIcon from "@mui/icons-material/Login";
import { T } from "../../../libs/types/common";
import { Messages } from "../../../libs/config";
import { LoginInput, MemberInput } from "../../../libs/types/member";
import MemberService from "../../services/MemberService";
import { sweetErrorHandling } from "../../../libs/sweetAlerts";
import { useGlobals } from "../../hooks/useGlobals";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 2, 2),
  },
}));

const ModalImg = styled.img`
  width: 62%;
  height: 100%;
  border-radius: 10px;
  background: #000;
  margin-top: 9px;
  margin-left: 10px;
`;

interface AuthenticationModalProps {
  signupOpen: boolean;
  loginOpen: boolean;
  handleSignupClose: () => void;
  handleLoginClose: () => void;
}

export default function AuthenticationModal(props: AuthenticationModalProps) {
  const { signupOpen, loginOpen, handleSignupClose, handleLoginClose } = props;
  const classes = useStyles();
  const [memberNick, setMemberNick] = useState<string>("");
  const [memberEmail, setMemberEmail] = useState<string>("");
  const [memberPassword, setMemberPassword] = useState<string>("");
  const { setAuthMember } = useGlobals();

  /** HANDLERS **/
  const usernameHandler = (e: T) => {
    setMemberNick(e.target.value);
  };
  const EmailNumberHandler = (e: T) => {
    setMemberEmail(e.target.value);
  };
  const passwordHandler = (e: T) => {
    setMemberPassword(e.target.value);
  };

  const handlePasswordKeyDown = (e: T) => {
    if (e.key === "Enter" && signupOpen) {
      signupRequestHandler().then();
    } else if (e.key === "Enter" && loginOpen) {
      loginRequestHandler().then();
    }
  };
  const signupRequestHandler = async () => {
    try {
      const match =
        memberNick !== "" && memberEmail !== "" && memberPassword !== "";
      if (!match) throw new Error(Messages.error3);

      const signupInput: MemberInput = {
        memberNick: memberNick,
        memberEmail: memberEmail,
        memberPassword: memberPassword,
      };

      const member = new MemberService();
      const res = await member.signup(signupInput);
      //here
      setAuthMember(res);
      handleSignupClose();
    } catch (error) {
      console.log(error);
      sweetErrorHandling(error).then();
      handleSignupClose();
    }
  };

  const loginRequestHandler = async () => {
    try {
      const match = memberNick !== "" && memberPassword !== "";
      if (!match) throw new Error(Messages.error3);

      const loginInput: LoginInput = {
        memberNick: memberNick,
        memberPassword: memberPassword,
      };

      const member = new MemberService();
      const res = await member.login(loginInput);
      console.log("this is ", res);

      //here
      setAuthMember(res);
      handleLoginClose();
    } catch (error) {
      console.log(error);
      sweetErrorHandling(error).then();
      handleLoginClose();
    }
  };
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={signupOpen}
        onClose={handleSignupClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={signupOpen}>
          <Stack
            className={classes.paper}
            direction={"row"}
            sx={{ width: "400px" }}
          >
            <Stack sx={{ width: "100%", alignItems: "center" }}>
              <h1>Signup Form</h1>

              <TextField
                sx={{ width: "100%", marginTop: "7px" }}
                id="outlined-basic"
                label="username"
                variant="outlined"
                onChange={usernameHandler}
              />
              <TextField
                sx={{ width: "100%", my: "17px" }}
                id="outlined-basic"
                label="Email"
                variant="outlined"
                onChange={EmailNumberHandler}
              />
              <TextField
                id="outlined-basic"
                label="password"
                variant="outlined"
                sx={{ width: "100%" }}
                onChange={passwordHandler}
              />
              <Fab
                sx={{ marginTop: "30px", width: "100%", marginBottom: "20px" }}
                variant="extended"
                color="primary"
                onClick={signupRequestHandler}
                onKeyDown={handlePasswordKeyDown}
              >
                <LoginIcon sx={{ mr: 1 }} />
                Signup
              </Fab>
            </Stack>
          </Stack>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={loginOpen}
        onClose={handleLoginClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={loginOpen}>
          <Stack
            className={classes.paper}
            direction={"row"}
            sx={{ width: "400px" }}
          >
            <Stack
              sx={{
                marginTop: "25px",
                alignItems: "center",
                width: "100%",
              }}
            >
              <h1>Login Form</h1>
              <TextField
                id="outlined-basic"
                label="username"
                variant="outlined"
                sx={{ my: "10px", width: "100%" }}
                onChange={usernameHandler}
              />
              <TextField
                id={"outlined-basic"}
                label={"password"}
                variant={"outlined"}
                type={"password"}
                sx={{ width: "100%" }}
                onChange={passwordHandler}
                onKeyDown={handlePasswordKeyDown}
              />
              <Fab
                sx={{ marginTop: "27px", width: "100%", marginBottom: "20px" }}
                variant={"extended"}
                color={"primary"}
                onClick={loginRequestHandler}
              >
                <LoginIcon sx={{ mr: 1 }} />
                Login
              </Fab>
            </Stack>
          </Stack>
        </Fade>
      </Modal>
    </div>
  );
}
