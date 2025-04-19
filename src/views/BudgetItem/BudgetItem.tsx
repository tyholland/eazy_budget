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
import {
  getErrorMessage,
  getFrequencyContent,
  revertAmountToOriginal,
} from "../../functions/helper.ts";
import { useParams } from "react-router-dom";

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
  const { month, year } = useParams();
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
  const [errorMessage, setErrorMessage] = useState<string[]>([]);

  useEffect(() => {
    if (item) {
      setInputValue(item.value);
    }
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

  const showCadenceSelector =
    selectedFrequency !== "Yearly" && selectedFrequency !== "Quarterly";

  return (
    <S.ItemWrapper className="itemWrapper">
      <S.Item>
        <S.ItemTopRow>
          {!hideBtn && (
            <>
              <span data-tooltip-id="edit-tooltip">
                <Button
                  classType="text"
                  handleClick={() => {
                    setIsOpen(true);
                    setSelectedCadence(cadenceOptions[0].label);
                    setInputValue(item?.value || 0);
                  }}
                >
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
                      defaultValue={
                        item?.frequency || frequencyOptions[3].label
                      }
                      setOption={(val) => {
                        setSelectedFrequency(val);

                        if (val === "Yearly" || val === "Quarterly") {
                          setSelectedCadence(cadenceOptions[2].label);
                        }
                      }}
                    />
                    {showCadenceSelector && (
                      <SelectComponent
                        options={cadenceOptions}
                        placeHolder="Choose Cadence"
                        defaultValue={cadenceOptions[0].label}
                        setOption={setSelectedCadence}
                      />
                    )}
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
                  {errorMessage.length > 0 && (
                    <S.ErrorMsg>
                      {errorMessage.map((item: string) => {
                        return <li>{item}</li>;
                      })}
                    </S.ErrorMsg>
                  )}
                  <S.BtnWrapper className="btnWrapper">
                    <Button
                      handleClick={() => {
                        const errorMsg = getErrorMessage(
                          updatedLabel,
                          inputValue,
                        );

                        if (errorMsg.length) {
                          setErrorMessage(errorMsg);
                          return;
                        }

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
                        setErrorMessage([]);
                        closeModal();
                      }}
                    >
                      <>
                        Save <SaveIcon />
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
                          Cancel <CancelIcon />
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
                        Delete <DeleteIcon />
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
            {/* For Daily as a question mark tooltip to let the user know that amount doesn't reflect holidays */}
            <div>
              {getFrequencyContent(month, year, item?.value, item?.frequency)}
            </div>
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
