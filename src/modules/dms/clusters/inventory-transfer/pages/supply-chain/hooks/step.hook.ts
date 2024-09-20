/* eslint-disable @typescript-eslint/no-unused-vars */
// import { useState, useEffect } from 'react'
import { useAtom } from 'jotai'
import router from 'next/router'
import { StepState } from '../constant/step.constant'
import { activeStepAtom, stepDataAtom } from '../stores/step.store'
import { useNavigate } from 'react-router-dom'

export const useStepAction = () => {
  const navigate = useNavigate();

  const [stepData, setStepData] = useAtom(stepDataAtom)
  const [activeStep, setActiveStep] = useAtom(activeStepAtom)
  // const [currentDocId, setcurrentDocId] = useAtom(currentDocIdAtom)
  const handleBackFrom = (stepDocument: StepState) => {
    const copyStepData = [...stepData]
    const newStepData = copyStepData.map((el, i) => {
      el.active = stepDocument === i

      return el
    })
    setActiveStep(stepDocument)
    setStepData(newStepData)
  }

  const handleNextFrom = (stepDocument: StepState) => {
    const copyStepData = [...stepData]
    const newStepData = copyStepData.map((el, i) => {
      el.active = stepDocument === i

      return el
    })

    setActiveStep(stepDocument)
    setStepData(newStepData)
  }

  // const resetStep = (documentId: string) => {
  //   if (currentDocId !== documentId) {
  //     setActiveStep(StepDocument.GENERAL_INFORMATION_0)
  //     setStepData(StepData)
  //   }
  // }

  const handleCancel = () => {
    navigate(`/solutions/dms/inventory-transfer`)
  }

  return {
    stepData,
    handleCancel,
    // resetStep,
    // currentDocId,
    // setcurrentDocId,
    handleBackFrom,
    handleNextFrom
  }
}
