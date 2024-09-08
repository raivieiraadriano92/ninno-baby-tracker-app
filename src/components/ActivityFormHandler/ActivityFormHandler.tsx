import { FunctionComponent } from "react";

import { DefaultForm } from "./DefaultForm";
import { DiaperForm } from "./DiaperForm";
import { ExpressedForm } from "./ExpressedForm";
import { FormulaForm } from "./FormulaForm";
import { GrowthForm } from "./GrowthForm";
import { MilestoneForm } from "./MilestoneForm";
import { NursingForm } from "./NursingForm";
import { SleepForm } from "./SleepForm";
import { SupplementForm } from "./SupplementForm";
import { TemperatureForm } from "./TemperatureForm";
import { ActivityFormHandlerProps, ActivityFormProps } from "./types";

import { ActivityType } from "src/services/database/models/ActivityModel";

const FormComponentMap: Partial<
  Record<ActivityType, FunctionComponent<ActivityFormProps<any>>>
> = {
  [ActivityType.DIAPER]: DiaperForm,
  [ActivityType.EXPRESSED]: ExpressedForm,
  [ActivityType.FORMULA]: FormulaForm,
  [ActivityType.GROWTH]: GrowthForm,
  [ActivityType.MILESTONE]: MilestoneForm,
  [ActivityType.NURSING]: NursingForm,
  [ActivityType.SLEEP]: SleepForm,
  [ActivityType.SUPPLEMENT]: SupplementForm,
  [ActivityType.TEMPERATURE]: TemperatureForm
};

export const ActivityFormHandler: FunctionComponent<
  ActivityFormHandlerProps
> = (props) => {
  const FormComponent = FormComponentMap[props.type];

  return FormComponent ? (
    <FormComponent {...props} />
  ) : (
    <DefaultForm {...props} />
  );
};
