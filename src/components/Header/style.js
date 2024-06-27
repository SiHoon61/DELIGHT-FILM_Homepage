import styled from 'styled-components';

export const MenuBar = styled.div`
    width: 600px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const IndexUL = styled.ul`
    display: flex;
    justify-content: center;
    align-items: center;
    list-style-type: none;
    padding: 0px;
`

export const IndexLI = styled.li`
    display: flex;
    align-items: center;
    position: relative;
    justify-content: center;
    margin: 0 20px;
    font-size: 20px;
    font-family: var(--font-sansMedium);
    color: white;
    cursor: pointer;
`