import styled from 'styled-components';

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
    @media (max-width: 1000px){
      font-size: 62px;
      margin:20px 0 0 40px;
    }
    @media (max-width: 600px){
      font-size: 48px;
      margin:10px 0 0 20px;
    }
`

export const MainContainer = styled.div`
    display: flex;
    justify-content: space-around;
    margin: 100px 0;
    word-break: keep-all;
    @media (max-width: 600px){
        margin: 50px 0;
    }
`

export const AboutImg = styled.img`
    width: 30%;
    max-width: 400px;
    margin-left: 70px;
    @media (max-width: 1000px){
        display: none;
    }
`

export const AboutText = styled.div`
    height: 500px;
    color: white;
    font-family: var(--font-sansRegular);
    font-size: 18px;
    line-height: 50px;
    width: 700px;
    padding: 10px 50px;
    @media (max-width: 1100px){
        font-size: 16px;
    }
    @media (max-width: 600px){
        font-size: 14px;
        padding: 0 15px;
        height: auto;
        line-height: 35px;
    }
`

export const BoldText = styled.div`
    font-size: 32px;
    margin-bottom: 30px;
    @media (max-width: 1100px){
        font-size: 28px;
        margin-bottom: 15px;
    }
    @media (max-width: 600px){
        font-size: 24px;
        margin-bottom: 10px;
    }
`