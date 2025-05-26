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
import { FieldValues, UseFormRegister, UseFormSetValue } from "react-hook-form";
import CheckboxComponent from "../../components/Checkbox/Checkbox.tsx";
import SelectComponent from "../../components/Select/Select.tsx";
import { Tooltip as ReactTooltip } from "react-tooltip";
import {
  cadenceOptions,
  frequencyOptions,
  proPlanFrequencyOptions,
} from "../../constants.ts";
import {
  getErrorMessage,
  getFrequencyContent,
  getSubscriptionStatus,
  revertAmountToOriginal,
} from "../../functions/helper.ts";
import { useParams } from "react-router-dom";
import { useAtomValue } from "jotai";
import { userAtom } from "../../hook/UserAtom.ts";

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
  setValue?: UseFormSetValue<FieldValues>;
  inputName?: string;
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
  setValue,
  inputName,
}: BudgetItemProps) => {
  const { month, year } = useParams();
  const currentUser = useAtomValue(userAtom);
  const specificFrequency = getSubscriptionStatus(
    "Pro",
    currentUser?.subscription_id,
  )
    ? proPlanFrequencyOptions
    : frequencyOptions;
  const [inputValue, setInputValue] = useState<number | string>(
    item?.value || "",
  );
  const [updatedLabel, setUpdatedLabel] = useState<string>(
    item?.label || "New Item",
  );
  const [checkedVal, setCheckedVal] = useState<boolean>(item?.paid || false);
  const [isOpen, setIsOpen] = useState<boolean>(openModal);
  const [selectedFrequency, setSelectedFrequency] = useState<string>(
    item?.frequency || specificFrequency[3].label,
  );
  const [selectedCadence, setSelectedCadence] = useState<string>(
    cadenceOptions[0].label,
  );
  const [errorMessage, setErrorMessage] = useState<string[]>([]);
  const [changeInputVal, setChangeInputVal] = useState<boolean>(false);
  const [modalLabel, setModalLabel] = useState<string>(item?.label || "");
  const [modalValue, setModalValue] = useState<number | string>(
    item?.value || "",
  );

  useEffect(() => {
    item && setInputValue(item.value);
    item && modalValue === "" && setModalValue(item.value);
  }, [item?.value]);

  useEffect(() => {
    item && setUpdatedLabel(item.label);
    item && modalLabel === "" && setModalLabel(item.label);
  }, [item?.label]);

  useEffect(() => {
    item && setCheckedVal(item.paid || false);
  }, [item?.paid]);

  useEffect(() => {
    item && setSelectedFrequency(item.frequency || specificFrequency[3].label);
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
                    setInputValue(item?.value || inputValue || 0);
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
                      options={specificFrequency}
                      placeHolder="Choose Frequency"
                      defaultValue={
                        item?.frequency || specificFrequency[3].label
                      }
                      setOption={(val) => {
                        setSelectedFrequency(val);

                        if (val === "Yearly" || val === "Quarterly") {
                          setSelectedCadence(cadenceOptions[2].label);
                        }
                      }}
                    />
                    {showCadenceSelector &&
                      getSubscriptionStatus(
                        "Pro",
                        currentUser?.subscription_id,
                      ) && (
                        <SelectComponent
                          options={cadenceOptions}
                          placeHolder="Choose Cadence"
                          defaultValue={cadenceOptions[0].label}
                          setOption={setSelectedCadence}
                        />
                      )}
                  </S.TimingSelects>
                  <BudgetInput
                    inputLabel={changeInputVal ? modalLabel : updatedLabel}
                    inputOption={theType}
                    defaultValue={changeInputVal ? modalValue : inputValue}
                    isEditable
                    labelPlaceHolder={labelPlaceHolder}
                    valuePlaceHolder={valuePlaceHolder}
                    type={inputType}
                    inputSize="medium"
                    setInputValue={setModalValue}
                    setUpdatedLabel={setModalLabel}
                    frequency={item?.frequency}
                    setChangeInputVal={setChangeInputVal}
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
                      {errorMessage.map((item: string, index: number) => {
                        return <li key={index}>{item}</li>;
                      })}
                    </S.ErrorMsg>
                  )}
                  <S.BtnWrapper className="btnWrapper">
                    <Button
                      handleClick={() => {
                        const theValue = changeInputVal
                          ? modalValue
                          : item
                            ? revertAmountToOriginal(
                                item.value,
                                month,
                                year,
                                item?.frequency,
                              )
                            : inputValue;

                        const errorMsg = getErrorMessage(modalLabel, theValue);

                        if (errorMsg.length) {
                          setErrorMessage(errorMsg);
                          return;
                        }

                        const budgetItem = JSON.parse(
                          `{"${modalLabel}": ${theValue}}`,
                        );

                        setInputValue(theValue);
                        setUpdatedLabel(modalLabel);
                        setChangeInputVal(false);

                        if (setValue) {
                          setValue(inputName || "", {
                            label: modalLabel,
                            value: theValue,
                            checked: checkedVal,
                            frequency: selectedFrequency,
                            cadence: selectedCadence,
                          });

                          saveEvent && saveEvent(budgetItem);

                          setErrorMessage([]);
                          closeModal();
                          return;
                        }

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
                          setInputValue(item?.value || inputValue || "");
                          setUpdatedLabel(item?.label || updatedLabel || "");
                          setCheckedVal(item?.paid || false);
                          setSelectedFrequency(
                            item?.frequency || specificFrequency[3].label,
                          );
                          setChangeInputVal(false);
                          setErrorMessage([]);
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
