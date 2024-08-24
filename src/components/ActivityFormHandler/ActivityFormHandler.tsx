import { FunctionComponent } from "react";

import { DefaultForm } from "./DefaultForm";
import { DiaperForm } from "./DiaperForm";
import { ExpressedForm } from "./ExpressedForm";
import { FormulaForm } from "./FormulaForm";
import { NursingForm } from "./NursingForm";
import { SleepForm } from "./SleepForm";
import { SupplementForm } from "./SupplementForm";
import { ActivityFormHandlerProps, ActivityFormProps } from "./types";

import { ActivityType } from "src/services/database/models/ActivityModel";

const FormComponentMap: Partial<
  Record<ActivityType, FunctionComponent<ActivityFormProps<any>>>
> = {
  [ActivityType.DIAPER]: DiaperForm,
  [ActivityType.EXPRESSED]: ExpressedForm,
  [ActivityType.FORMULA]: FormulaForm,
  [ActivityType.NURSING]: NursingForm,
  [ActivityType.SLEEP]: SleepForm,
  [ActivityType.SUPPLEMENT]: SupplementForm
};

export const ActivityFormHandler: FunctionComponent<
  ActivityFormHandlerProps
> = ({ activityId, baby, payload, setPayload, type }) => {
  const FormComponent = FormComponentMap[type];

  return FormComponent ? (
    <FormComponent {...{ activityId, baby, payload, setPayload, type }} />
  ) : (
    <DefaultForm {...{ activityId, baby, payload, setPayload, type }} />
  );
};
