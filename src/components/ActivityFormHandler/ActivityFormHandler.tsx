import { FunctionComponent } from "react";

import { DefaultForm } from "./DefaultForm";
import { SleepForm } from "./SleepForm";
import { ActivityFormHandlerProps, ActivityFormProps } from "./types";

import { ActivityType } from "src/services/database/models/ActivityModel";

const FormComponentMap: Partial<
  Record<ActivityType, FunctionComponent<ActivityFormProps>>
> = {
  [ActivityType.SLEEP]: SleepForm
};

export const ActivityFormHandler: FunctionComponent<
  ActivityFormHandlerProps
> = ({ payload, setPayload, type }) => {
  const FormComponent = FormComponentMap[type];

  return FormComponent ? (
    <FormComponent {...{ payload, setPayload }} />
  ) : (
    <DefaultForm {...{ payload, setPayload }} />
  );
};