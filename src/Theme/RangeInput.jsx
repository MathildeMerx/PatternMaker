import styled from "styled-components";

//A range input with the colors of this project
const RangeInput = styled.input`
    display: block;
    -webkit-appearance: none;
    width: 50%;
    min-width: 150px;
    height: 10px;
    margin: 10px 0;
    border-radius: 6px;
    outline: 0;
    background: ${({ theme }) => theme.colours.backgroundLight};

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        height: 18px;
        width: 18px;
        border-radius: 3px;
        background: ${({ theme }) => theme.colours.bright};
        border-radius: 50%;
        border: 0;
        cursor: pointer;
    }

    &::-moz-range-thumb {
        height: 18px;
        width: 18px;
        border-radius: 3px;
        background: ${({ theme }) => theme.colours.bright};
        border: 0;
        border-radius: 50%;
        cursor: pointer;
    }

    &::-ms-thumb {
        height: 18px;
        width: 18px;
        border-radius: 3px;
        background: ${({ theme }) => theme.colours.bright};
        border-radius: 50%;
        border: 0;
        cursor: pointer;
    }
`;

export { RangeInput };
