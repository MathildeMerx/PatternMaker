import { Login } from "@mui/icons-material";
import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { S_CommandsDropdown } from "./S_CommandsDropdown";
import { Button } from "./Theme/Button";

function LogIn({ credentials, setCredentials }) {
    const [clicked, setClicked] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const loginButtonRef = useRef();

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                loginButtonRef.current &&
                !loginButtonRef.current.contains(event.target)
            ) {
                setClicked(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [loginButtonRef, setClicked]);
    return (
        <S_LogIn ref={loginButtonRef}>
            <Login onClick={() => setClicked((clicked) => !clicked)} />
            <p>Log in</p>
            <S_CommandsDropdown clicked={clicked}>
                <form onSubmit={() => setCredentials([username, password])}>
                    <label htmlFor="username">Username</label>
                    <S_LoginInput
                        type="text"
                        id="username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    ></S_LoginInput>
                    <label htmlFor="password">Password</label>
                    <S_LoginInput
                        type="password"
                        id="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    ></S_LoginInput>
                    <Button type="submit">Submit</Button>
                </form>
            </S_CommandsDropdown>
        </S_LogIn>
    );
}

export { LogIn };

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
        outline: none;
    }
`;
