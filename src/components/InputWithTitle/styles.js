import styled from 'styled-components';

export const Wrapper = styled.div`
    align-self:stretch;
    display:flex;
    flex-direction:column;
`;

export const Title = styled.div`
    font-size: 14px;
    font-weight: 700;
    color: rgba(0,0,0,0.75);
    margin-bottom: 4px;
`;

export const InputArea = styled.input`
    font-size: 18px;
    background-color: #FFD54F;
    outline: none;
    border: none;
    box-shadow: none;
    border-radius: 8px;
    padding: 8px 16px;
    color: rgba(0,0,0,0.75);

    &:focus {
        box-shadow: inset 0 5px #FFB300;
    }
`;