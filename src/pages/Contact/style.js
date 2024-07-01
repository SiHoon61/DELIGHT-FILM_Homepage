import styled from 'styled-components';

//img
import triangle from '../../assets/Contact/triangle.png'

export const HeaderContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
`

export const BigText = styled.div`
    color: white;
    font-size: 90px;
    font-family: var(--font-sansMedium);
    margin:60px 0 0 80px;
`

export const FormContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 60%;
    margin: 50px auto;
    flex-wrap: wrap;
    
`

export const InputBox = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 40px;
    width: 47%;
`

export const AreaBox = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 40px;
    width: 100%;

`

export const KeyText = styled.div`
    display: flex;
    align-items: center;
    color: white;
    font-family: var(--font-sansMedium);
    font-size: 18px;
    margin-bottom: 3px;
`

export const TextInput = styled.input`
    display: flex;
    align-items: center;
    padding-left: 15px;
    background-color: black;
    border: 1px solid white;
    color: white;
    font-size: 18px;
    font-family: var(--font-sansMedium);
    width: 100% - 20px;
    height: 60px;
    &:focus {
        outline: none;
    }
`

export const SelectCost = styled.div`
    display: flex;
    align-items: center;
    padding-left: 15px;
    background-color: black;
    border: 1px solid white;
    color: white;
    font-size: 18px;
    font-family: var(--font-sansMedium);
    width: 100% - 20px;
    height: 60px;
    position: relative;
`
export const CostBox = styled.div`
    display: flex;
    font-size: 16px;
    color: white;
    border: 1px solid white;
    background-color: #1E1E1E;
    flex-direction: column;
    align-items: center;
    padding: 10px 0;
    box-shadow: 0px 2px 5px rgba(49,49,63,0.4);
    border-radius: 5px;
    width: 100%;
    position: absolute;
    top: ${props => props.$isClick ? 110 : 105}%;
    opacity: ${props => props.$isClick ? 1 : 0};
    pointer-events: ${props => props.$isClick ? 'auto' : 'none'};
    transition: all 0.3s ease;
    left: 0;
    margin-top: 2px;
    cursor: pointer;
`

export const CostOption = styled.div`
    margin: 5px 0;
`


export const Triangle = styled.img.attrs({
    src: triangle,
    alt: 'triangle'
})`
    position: absolute;
    right: 15px;
    width: 13px;
    transform: ${props => props.$isClick ? 'rotate(180deg)' : 'rotate(0deg)'};
    transition: all 0.3s ease;
`

export const BodyTextarea = styled.textarea`
    resize: none;
    width: 100% - 20px;
    height: 200px;
    padding: 10px;
    font-size: 16px;
    background-color: black;
    border: 1px solid white;
    color: white;
    &:focus {
        outline: none;
    }
`

export const Submit = styled.div`
    margin: 10px auto;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    color: ${props => props.$isFilled ? 'white' : '#505050'};
    width: 280px;
    height: 60px;
    background-color: black;
    border: ${props => props.$isFilled ? '1px solid white' : '1px solid #505050'};
    pointer-events: ${props => props.$isFilled ? 'auto' : 'none'};
    transition: all 0.2s ease;
    font-family: var(--font-sansMedium);

    cursor: pointer;
    &:hover{
        background-color: white;
        color: black;
    }
`