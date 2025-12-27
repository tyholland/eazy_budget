import React, { useEffect, useState, JSX } from "react";
import BudgetInput from "../../components/BudgetInput/BudgetInput.tsx";
import EditIcon from "../../svg/EditIcon.tsx";
import SaveIcon from "../../svg/SaveIcon.tsx";
import CancelIcon from "../../svg/CancelIcon.tsx";
import DeleteIcon from "../../svg/DeleteIcon.tsx";
import {
  BudgetData,
  BudgetDataItem,
  InputOption,
  InputType,
} from "../../types.ts";
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
  getFormattedCurrency,
  getFrequencyContent,
  getFrequencyValue,
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
    data?: BudgetDataItem,
    paid?: boolean,
    frequency?: string,
    cadence?: string,
    category_id?: number,
    item?: BudgetData,
    index?: number,
  ) => void;
  index?: number;
  deleteEvent?: () => void;
  setValue?: UseFormSetValue<FieldValues>;
  inputName?: string;
  budgetItemData?: BudgetData;
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
  index,
  deleteEvent,
  setValue,
  inputName,
  budgetItemData,
}: BudgetItemProps) => {
  const { month, year } = useParams();
  const currentUser = useAtomValue(userAtom);
  const expenseCategory = currentUser?.categories?.filter(
    (category) => category.id === item?.category_id,
  )[0];
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
  const [selectedCategory, setSelectedCategory] = useState<string>(
    expenseCategory?.label || "",
  );
  const [errorMessage, setErrorMessage] = useState<string[]>([]);
  const [changeInputVal, setChangeInputVal] = useState<boolean>(false);
  const [modalLabel, setModalLabel] = useState<string>(
    item?.label || updatedLabel,
  );
  const [modalValue, setModalValue] = useState<number | string>(
    item?.value || inputValue,
  );
  const [totalAmount, setTotalAmount] = useState<string>("");
  const [frequencyContent, setFrequencyContent] = useState<string>("");
  const [triggerFrequencyChange, setTriggerFrequencyChange] =
    useState<boolean>(false);

  useEffect(() => {
    item && setInputValue(item.value);
    item && modalValue === "New Item"
      ? setModalValue(item.value)
      : setModalValue(
          revertAmountToOriginal(
            Number(item?.value),
            month,
            year,
            selectedFrequency,
          ),
        );
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

  useEffect(() => {
    const expenseCategory = currentUser?.categories?.filter(
      (category) => category.id === item?.category_id,
    )[0];
    item && setSelectedCategory(expenseCategory?.label || "");
  }, [item?.category_id]);

  const closeModal = () => {
    setIsOpen(false);
  };

  const showCadenceSelector =
    selectedFrequency !== "Yearly" && selectedFrequency !== "Quarterly";

  const showCategorySelector =
    currentUser && theType === "expense"
      ? currentUser.categories?.length > 0
      : false;

  const getTotalAmount = async () => {
    const amount = getFrequencyValue(
      Number(
        changeInputVal || triggerFrequencyChange
          ? modalValue
          : revertAmountToOriginal(
              Number(inputValue),
              month,
              year,
              selectedFrequency,
            ),
      ),
      month as string,
      Number(year),
      selectedFrequency,
    );

    const { currencyValue } = await getFormattedCurrency(amount, currentUser);
    const content = await getFrequencyContent(
      month,
      year,
      item?.value,
      selectedFrequency,
      currentUser,
    );

    setTotalAmount(currencyValue);
    setFrequencyContent(content);
    setTriggerFrequencyChange(false);
  };

  useEffect(() => {
    getTotalAmount();
  }, [changeInputVal, selectedFrequency, modalValue, inputValue]);

  window.onclick = (event: PointerEvent) => {
    const target = event.target;

    if (target instanceof Element && !target?.matches(".text")) {
      const dropdowns = document.getElementsByClassName("dropdownContent");

      for (let i = 0; i < dropdowns.length; i++) {
        const openDropdown = dropdowns[i];

        if (openDropdown.classList.contains("show")) {
          openDropdown.classList.remove("show");
        }
      }
    }
  };

  return (
    <S.ItemWrapper className="itemWrapper">
      <S.Item>
        <S.ItemTopRow>
          <BudgetInput
            inputLabel={updatedLabel}
            inputOption={theType}
            defaultValue={inputValue}
            labelPlaceHolder={labelPlaceHolder}
            valuePlaceHolder={valuePlaceHolder}
            type={inputType}
            inputSize="medium"
            frequencyContent={frequencyContent}
          />
          {!hideBtn && (
            <S.ItemRightSide>
              <span>
                <Button
                  classType="text"
                  handleClick={() => {
                    document
                      .querySelector(`#myDropdownContent-${index}`)
                      ?.classList.toggle("show");
                  }}
                >
                  ...
                </Button>
                <div
                  className="dropdownContent"
                  id={`myDropdownContent-${index}`}
                >
                  <button
                    onClick={() => {
                      setIsOpen(true);
                      setSelectedCadence(cadenceOptions[0].label);
                      setInputValue(item?.value || inputValue || 0);
                    }}
                  >
                    Edit
                  </button>
                  <button onClick={() => {}}>Delete</button>
                </div>
              </span>
              {!hidePaidContent && (
                <>
                  <CheckboxComponent
                    label="Mark as paid"
                    isDisabled
                    setCheckedVal={setCheckedVal}
                    isChecked={checkedVal}
                  />
                </>
              )}
              <ModalComponent
                isOpen={isOpen}
                title={`Edit ${theType} item`}
                size="medium"
              >
                <S.ModalItem>
                  <S.TimingSelects>
                    <SelectComponent
                      options={specificFrequency}
                      placeHolder="Frequency:"
                      defaultValue={
                        item?.frequency || specificFrequency[3].label
                      }
                      setOption={(val) => {
                        setSelectedFrequency(val);
                        setTriggerFrequencyChange(true);

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
                          placeHolder="Cadence:"
                          defaultValue={cadenceOptions[0].label}
                          setOption={setSelectedCadence}
                        />
                      )}
                    {showCategorySelector &&
                      getSubscriptionStatus(
                        "Pro",
                        currentUser?.subscription_id,
                      ) && (
                        <SelectComponent
                          options={
                            currentUser?.categories?.concat({
                              id: 0,
                              label: "None",
                            }) || []
                          }
                          placeHolder="Category:"
                          defaultValue={expenseCategory?.label || "None"}
                          setOption={setSelectedCategory}
                        />
                      )}
                  </S.TimingSelects>
                  {selectedFrequency === "Daily" && (
                    <S.Disclaimer>
                      *Daily frequency is calculated based on business days.
                    </S.Disclaimer>
                  )}
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
                  <S.Total>
                    <span>Total {theType} amount:</span> {totalAmount}
                  </S.Total>
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

                        const expenseCategory_id =
                          currentUser?.categories?.filter(
                            (item) => item.label === selectedCategory,
                          )[0]?.id;

                        if (setValue) {
                          setValue(inputName || "", {
                            label: modalLabel,
                            value: theValue,
                            checked: checkedVal,
                            frequency: selectedFrequency,
                            cadence: selectedCadence,
                            category_id: expenseCategory_id,
                          });

                          saveEvent && saveEvent(budgetItem);

                          setErrorMessage([]);
                          closeModal();
                          return;
                        }

                        saveEvent &&
                          saveEvent(
                            budgetItem,
                            item,
                            checkedVal,
                            selectedFrequency,
                            selectedCadence,
                            expenseCategory_id,
                            budgetItemData,
                            index,
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
            </S.ItemRightSide>
          )}
        </S.ItemTopRow>
      </S.Item>
      {children}
    </S.ItemWrapper>
  );
};

export default BudgetItem;
