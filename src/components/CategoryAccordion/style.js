import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  right: clamp(20px, 3vw, 52px);
  display: flex;
  justify-content: flex-end;
  width: min(210px, 42vw);
  z-index: 30;

  @media (max-width: 700px) {
    right: 12px;
    width: min(128px, 34vw);
  }
`;

export const MenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 46px;
  padding: 0 16px;
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 24px;
  background: #111;
  color: #fff;
  cursor: pointer;

  > span {
    display: flex;
    align-items: baseline;
    gap: 9px;
  }

  &:focus-visible {
    outline: 2px solid #fff;
    outline-offset: 3px;
  }

  @media (max-width: 700px) {
    min-height: 38px;
    padding: 0 13px;
  }
`;

export const CurrentLabel = styled.span`
  font-family: var(--font-sansMedium);
  font-size: 14px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

export const CurrentCount = styled.span`
  color: rgba(255, 255, 255, 0.42);
  font-family: var(--font-sansRegular);
  font-size: 10px;
  letter-spacing: 0.12em;
`;

export const Chevron = styled.span`
  width: 8px;
  height: 8px;
  border-right: 1px solid currentColor;
  border-bottom: 1px solid currentColor;
  transform: ${({ $isOpen }) =>
    $isOpen ? "translateY(2px) rotate(225deg)" : "translateY(-2px) rotate(45deg)"};
  transition: transform 180ms ease;
`;

export const Menu = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.24);
  border-radius: 12px;
  background: rgba(12, 12, 12, 0.98);
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.45);
`;

export const Option = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 44px;
  padding: 0 16px;
  border: 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  background: ${({ $active }) =>
    $active ? "rgba(255, 255, 255, 0.12)" : "transparent"};
  color: ${({ $active }) => ($active ? "#fff" : "rgba(255, 255, 255, 0.62)")};
  font-family: var(--font-sansMedium);
  font-size: 13px;
  text-align: left;
  cursor: pointer;

  &:last-child {
    border-bottom: 0;
  }

  &:hover,
  &:focus-visible {
    background: rgba(255, 255, 255, 0.09);
    color: #fff;
    outline: none;
  }
`;

export const OptionCount = styled.span`
  font-size: 11px;
  color: rgba(255, 255, 255, 0.38);
`;
