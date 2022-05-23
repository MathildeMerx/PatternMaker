import { Login } from "@mui/icons-material";
import { useState } from "react";
import styled from "styled-components";
import S_CommandsDropdown from "./S_CommandsDropdown";
import Button from "../Theme/Button";
import useCloseClickOutside from "../useCloseClickOutside";

//Login component (icon plus menu to log in)
function LogIn({ setCredentials }) {
    // Knowing whether the menu is open or not,
    // to close it when a user clicks outside of it
    const [[clicked, setClicked], loginButtonRef] = useCloseClickOutside();

    //username and password are stored in those states
    const [{ username, password }, setUsernamePassword] = useState({
        username: "",
        password: "",
    });

    return (
        <S_LogIn ref={loginButtonRef}>
            <Login onClick={() => setClicked((clicked) => !clicked)} />
            <p>Log in</p>
            <S_CommandsDropdown menuOpen={clicked}>
                <form
                    onSubmit={() =>
                        setCredentials({
                            username: username,
                            password: password,
                            loggedIn: true,
                        })
                    }
                >
                    <label htmlFor="username">Username</label>
                    <S_LoginInput
                        type="text"
                        id="username"
                        value={username}
                        onChange={(event) =>
                            setUsernamePassword(({ password }) => {
                                return {
                                    password: password,
                                    username: event.target.value,
                                };
                            })
                        }
                    />

                    <label htmlFor="password">Password</label>
                    <S_LoginInput
                        type="password"
                        id="password"
                        value={password}
                        onChange={(event) =>
                            setUsernamePassword(({ username }) => {
                                return {
                                    username: username,
                                    password: event.target.value,
                                };
                            })
                        }
                    />

                    <Button type="submit">Submit</Button>
                </form>
            </S_CommandsDropdown>
        </S_LogIn>
    );
}

const S_LogIn = styled.div`
    cursor: pointer;
    position: relative;
`;

const S_LoginInput = styled.input`
    background-color: ${({ theme }) => theme.colours.background};
    border: none;
    border-bottom: 3px solid;
    color: ${({ theme }) => theme.colours.contrast};
    margin-bottom: 3px;
    text-align: center;

    &:focus-visible {
        border-style: none none solid;
        border-color: ${({ theme }) => theme.colours.bright};
        outline: none;
    }
`;

export default LogIn;
