import React, { useEffect, useState, JSX } from "react";
import BudgetInput from "../../components/BudgetInput/BudgetInput.tsx";
import EditIcon from "../../svg/EditIcon.tsx";
import SaveIcon from "../../svg/SaveIcon.tsx";
import CancelIcon from "../../svg/CancelIcon.tsx";
import DeleteIcon from "../../svg/DeleteIcon.tsx";
import { BudgetDataItem, InputOption, InputType } from "../../types.ts";
import Button from "../../components/Button/Button.tsx";
import ModalComponent from "../../components/Modal/Modal.tsx";
import * as S from "./budgetItem.style.ts";
import { UseFormRegister } from "react-hook-form";
import CheckboxComponent from "../../components/Checkbox/Checkbox.tsx";
import SelectComponent from "../../components/Select/Select.tsx";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { cadenceOptions, frequencyOptions } from "../../constants.ts";

interface BudgetItemProps {
  theType: InputOption;
  children?: string | JSX.Element;
  register?: UseFormRegister<any>;
  item?: BudgetDataItem;
  openModal?: boolean;
  labelPlaceHolder?: string;
  valuePlaceHolder?: string;
  inputType?: InputType;
  hideBtn?: boolean;
  hidePaidContent?: boolean;
  saveEvent?: (
    val: Object,
    paid?: boolean,
    frequency?: string,
    cadence?: string,
  ) => void;
  deleteEvent?: () => void;
}

const BudgetItem = ({
  theType,
  children,
  item,
  openModal = false,
  valuePlaceHolder = "",
  labelPlaceHolder = "",
  inputType = "text",
  hideBtn = false,
  hidePaidContent = false,
  register,
  saveEvent,
  deleteEvent,
}: BudgetItemProps) => {
  const [inputValue, setInputValue] = useState<number | string>(
    item?.value || "",
  );
  const [updatedLabel, setUpdatedLabel] = useState<string>(item?.label || "");
  const [checkedVal, setCheckedVal] = useState<boolean>(item?.paid || false);
  const [isOpen, setIsOpen] = useState<boolean>(openModal);
  const [selectedFrequency, setSelectedFrequency] = useState<string>(
    item?.frequency || frequencyOptions[3].label,
  );
  const [selectedCadence, setSelectedCadence] = useState<string>(
    cadenceOptions[0].label,
  );

  useEffect(() => {
    item && setInputValue(item.value);
  }, [item?.value]);

  useEffect(() => {
    item && setUpdatedLabel(item.label);
  }, [item?.label]);

  useEffect(() => {
    item && setCheckedVal(item.paid || false);
  }, [item?.paid]);

  useEffect(() => {
    item && setSelectedFrequency(item.frequency || frequencyOptions[3].label);
  }, [item?.frequency]);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <S.ItemWrapper className="itemWrapper">
      <S.Item>
        <S.ItemTopRow>
          {!hideBtn && (
            <>
              <span data-tooltip-id="edit-tooltip">
                <Button classType="text" handleClick={() => setIsOpen(true)}>
                  <EditIcon />
                </Button>
              </span>
              <ReactTooltip
                id="edit-tooltip"
                place="top"
                variant="info"
                content={`Edit ${theType} item`}
                className="tooltip"
              />
              <ModalComponent
                isOpen={isOpen}
                title={`Edit ${theType} item`}
                size="medium"
              >
                <S.ModalItem>
                  <S.TimingSelects>
                    <SelectComponent
                      options={frequencyOptions}
                      placeHolder="Choose Frequency"
                      defaultValue={frequencyOptions[3].label}
                      setOption={setSelectedFrequency}
                    />
                    <SelectComponent
                      options={cadenceOptions}
                      placeHolder="Choose Cadence"
                      defaultValue={cadenceOptions[0].label}
                      setOption={setSelectedCadence}
                    />
                  </S.TimingSelects>
                  <BudgetInput
                    inputLabel={updatedLabel}
                    inputOption={theType}
                    defaultValue={inputValue}
                    isEditable
                    labelPlaceHolder={labelPlaceHolder}
                    valuePlaceHolder={valuePlaceHolder}
                    type={inputType}
                    inputSize="medium"
                    register={register}
                    setInputValue={setInputValue}
                    setUpdatedLabel={setUpdatedLabel}
                  />
                  {!hidePaidContent && (
                    <CheckboxComponent
                      label="Paid"
                      isDisabled={false}
                      register={register}
                      setCheckedVal={setCheckedVal}
                      isChecked={checkedVal}
                    />
                  )}
                  <S.BtnWrapper>
                    <Button
                      handleClick={() => {
                        const budgetItem = JSON.parse(
                          `{"${updatedLabel}": ${inputValue}}`,
                        );
                        saveEvent &&
                          saveEvent(
                            budgetItem,
                            checkedVal,
                            selectedFrequency,
                            selectedCadence,
                          );
                        closeModal();
                      }}
                    >
                      <>
                        Save Item <SaveIcon />
                      </>
                    </Button>
                    {!openModal && (
                      <Button
                        handleClick={() => {
                          setInputValue(item?.value || "");
                          setUpdatedLabel(item?.label || "");
                          setCheckedVal(item?.paid || false);
                          setSelectedFrequency(
                            item?.frequency || frequencyOptions[3].label,
                          );
                          closeModal();
                        }}
                      >
                        <>
                          Cancel Item <CancelIcon />
                        </>
                      </Button>
                    )}
                    <Button
                      handleClick={() => {
                        deleteEvent && deleteEvent();
                        closeModal();
                      }}
                    >
                      <>
                        Delete Item <DeleteIcon />
                      </>
                    </Button>
                  </S.BtnWrapper>
                </S.ModalItem>
              </ModalComponent>
            </>
          )}
          <BudgetInput
            inputLabel={updatedLabel}
            inputOption={theType}
            defaultValue={inputValue}
            labelPlaceHolder={labelPlaceHolder}
            valuePlaceHolder={valuePlaceHolder}
            type={inputType}
            inputSize="medium"
            register={register}
            setInputValue={setInputValue}
            setUpdatedLabel={setUpdatedLabel}
          />
        </S.ItemTopRow>
        {!hidePaidContent && (
          <>
            <div>paid monthly</div>
            <CheckboxComponent
              label="Paid"
              isDisabled
              setCheckedVal={setCheckedVal}
              isChecked={checkedVal}
            />
          </>
        )}
      </S.Item>
      {children}
    </S.ItemWrapper>
  );
};

export default BudgetItem;
