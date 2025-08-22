import { CloseRounded, Visibility, VisibilityOff } from "@mui/icons-material";
import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const ChipWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const Chip = styled.div`
  padding: 5px 10px;
  border-radius: 8px;
  background: ${({ theme }) => theme.primary + 10};
  color: ${({ theme }) => theme.primary};
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
`;

// Fancy OutlinedInput styling
const OutlinedInput = styled.div`
  border-radius: 14px;
  border: 1.5px solid ${({ theme, error }) => (error ? theme.red : "#e6e8f1")};
  background: rgba(255, 255, 255, 0.47);
  color: ${({ theme }) => theme.text_primary};
  box-shadow: 0 3px 20px rgba(33, 138, 255, 0.09);
  outline: none;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
  transition: border 0.3s, box-shadow 0.3s, background 0.3s;

  &:focus-within {
    border: 2px solid ${({ theme, error }) => (error ? theme.red : "#218aff")};
    box-shadow: 0 5px 32px #218aff2a;
    background: rgba(239, 248, 255, 0.94);
  }
  ${({ chipableInput, height, theme }) =>
    chipableInput &&
    `
      background: ${theme.card || "#f8fbff"};
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
      min-height: ${height};
    `}
  ${({ small }) =>
    small &&
    `
      border-radius: 8px;
      padding: 10px 12px;
    `}
  ${({ popup, theme }) =>
    popup &&
    `
      color: ${theme.popup_text_secondary};
      border: 0.5px solid ${theme.popup_text_secondary + 60};
    `}
`;

// Fancy Input styling
const Input = styled.input`
  width: 100%;
  font-size: 16px;
  font-weight: 500;
  outline: none;
  border: none;
  background: transparent;
  color: ${({ theme, side }) => theme[`text_primary_${side}`]};
  letter-spacing: 0.2px;
  padding: 0 4px;
  transition: color 0.2s, font-size 0.2s;

  &::placeholder {
    color: ${({ theme, side }) => theme[`text_input_placeholder_${side}`]};
    font-weight: 400;
    font-size: 15px;
    opacity: 0.88;
  }

  &:focus {
    color: #218aff;
    font-size: 17px;
    outline: none;
  }
  ${({ small }) =>
    small &&
    `
      font-size: 13px;
    `}
  ${({ popup, theme }) =>
    popup &&
    `
      color: ${theme.popup_text_secondary};
    `}
`;

const Label = styled.label`
  font-size: 15px;
  font-weight: 700;
  color: ${({ theme, error, side }) =>
    error ? theme.red : theme[`text_input_label_${side}`]};
  padding: 0 4px;
  margin-bottom: 5px;
  letter-spacing: 0.03em;
`;

// Error styling (keep as is, but improve color if desired)
const Error = styled.p`
  font-size: 12px;
  margin: 2px 4px 0 4px;
  color: ${({ theme }) => theme.red || "#e12d39"};
  font-weight: 600;
`;

const TextInput = ({
  label,
  placeholder,
  name,
  value,
  error,
  handelChange,
  textArea,
  rows,
  columns,
  chipableInput,
  chipableArray,
  removeChip,
  height,
  small,
  popup,
  password,
  side,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Container small={small}>
      <Label small={small} popup={popup} error={error} side={side}>
        {label}
      </Label>
      <OutlinedInput
        small={small}
        popup={popup}
        error={error}
        chipableInput={chipableInput}
        height={height}
      >
        {chipableInput ? (
          <ChipWrapper>
            {chipableArray.map((chip, index) => (
              <Chip key={index}>
                <span>{chip}</span>
                <CloseRounded
                  sx={{ fontSize: "14px" }}
                  onClick={() => removeChip(name, index)}
                />
              </Chip>
            ))}
            <Input
              placeholder={placeholder}
              name={name}
              value={value}
              side={side}
              onChange={(e) => handelChange(e)}
            />
          </ChipWrapper>
        ) : (
          <>
            <Input
              popup={popup}
              small={small}
              as={textArea ? "textarea" : "input"}
              name={name}
              rows={rows}
              columns={columns}
              placeholder={placeholder}
              value={value}
              onChange={(e) => handelChange(e)}
              side={side}
              type={password && !showPassword ? "password" : "text"}
            />
            {password && (
              <>
                {showPassword ? (
                  <>
                    <Visibility onClick={() => setShowPassword(false)} />
                  </>
                ) : (
                  <>
                    <VisibilityOff onClick={() => setShowPassword(true)} />
                  </>
                )}
              </>
            )}
          </>
        )}
      </OutlinedInput>
      {error && (
        <Error small={small} popup={popup}>
          {error}
        </Error>
      )}
    </Container>
  );
};

export default TextInput;
