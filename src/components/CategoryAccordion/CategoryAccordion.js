import React, { useEffect, useRef, useState } from "react";

import {
  Chevron,
  Container,
  CurrentCount,
  CurrentLabel,
  Menu,
  MenuButton,
  Option,
  OptionCount,
} from "./style";

const CategoryAccordion = ({ categories, selected, onSelect, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, []);

  const countFor = (category) =>
    category === "All"
      ? items.length
      : items.filter((item) => item.category === category).length;

  return (
    <Container ref={containerRef}>
      <MenuButton
        type="button"
        aria-expanded={isOpen}
        aria-controls="work-category-menu"
        onClick={() => setIsOpen((open) => !open)}
      >
        <span>
          <CurrentLabel>{selected}</CurrentLabel>
          <CurrentCount>{String(countFor(selected)).padStart(2, "0")}</CurrentCount>
        </span>
        <Chevron $isOpen={isOpen} aria-hidden="true" />
      </MenuButton>

      <Menu id="work-category-menu" $isOpen={isOpen}>
        {categories.map((category) => (
          <Option
            type="button"
            key={category}
            $active={category === selected}
            onClick={() => {
              onSelect(category);
              setIsOpen(false);
            }}
          >
            <span>{category}</span>
            <OptionCount>{String(countFor(category)).padStart(2, "0")}</OptionCount>
          </Option>
        ))}
      </Menu>
    </Container>
  );
};

export default CategoryAccordion;
