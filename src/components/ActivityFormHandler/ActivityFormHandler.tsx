import { FunctionComponent } from "react";

import { DefaultForm } from "./DefaultForm";
import { DiaperForm } from "./DiaperForm";
import { ExpressedForm } from "./ExpressedForm";
import { FormulaForm } from "./FormulaForm";
import { SleepForm } from "./SleepForm";
import { ActivityFormHandlerProps, ActivityFormProps } from "./types";

import { ActivityType } from "src/services/database/models/ActivityModel";

const FormComponentMap: Partial<
  Record<ActivityType, FunctionComponent<ActivityFormProps<any>>>
> = {
  [ActivityType.DIAPER]: DiaperForm,
  [ActivityType.EXPRESSED]: ExpressedForm,
  [ActivityType.FORMULA]: FormulaForm,
  [ActivityType.SLEEP]: SleepForm
};

export const ActivityFormHandler: FunctionComponent<
  ActivityFormHandlerProps
> = ({ baby, payload, setPayload, type }) => {
  const FormComponent = FormComponentMap[type];

  return FormComponent ? (
    <FormComponent {...{ baby, payload, setPayload, type }} />
  ) : (
    <DefaultForm {...{ baby, payload, setPayload, type }} />
  );
};