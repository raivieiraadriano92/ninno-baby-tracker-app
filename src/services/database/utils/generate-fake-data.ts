import { addHours, setDate, setMonth } from "date-fns";
import random from "lodash.random";

import { database } from "..";
import {
  ActivityType,
  DiaperStatus,
  LengthUnit,
  NursingSide,
  TemperatureUnit,
  WeightUnit
} from "../models/ActivityModel";
import { BabyModel } from "../models/BabyModel";

import { ActivityPayload, createActivity } from "./activities";

import { initialMilestoneList } from "src/store/milestoneStore";
import { initialSupplementList } from "src/store/supplementStore";

type Item = ActivityPayload<any>;

// Utility function to generate a random date within the past 6 months
const randomDateWithinPastSixMonths = (): Date => {
  const now = new Date();

  // Get a random date within the past 6 months
  let sixMonthsAgo = setMonth(now, now.getMonth() - random(1, 6));

  // Set the day to a random day within the month
  sixMonthsAgo = setDate(sixMonthsAgo, random(1, 28));

  // Get a random time within the day
  const randomTime = new Date(
    sixMonthsAgo.getTime() +
      Math.random() * (Date.now() - sixMonthsAgo.getTime())
  );

  return randomTime;
};

// Utility function to generate a random list of items
const generateRandomItems = (length: number): Item[] => {
  const itemTypes = [
    "nursing",
    "expressed",
    "formula",
    "supplement",
    "diaper",
    "sleep",
    "growth",
    "milestone",
    "temperature"
  ];

  return Array.from({ length }, () => {
    const type = itemTypes[random(0, itemTypes.length - 1)] as ActivityType;

    const startedAt = randomDateWithinPastSixMonths();

    const commonFields = {
      typeMetadata: {},
      startedAt,
      notes: "Sample note"
    };

    switch (type) {
      case "nursing":
        return {
          ...commonFields,
          type,
          typeMetadata: {
            duration: {
              left: random(5, 30), // minutes
              right: random(5, 30) // minutes
            },
            startSide: random(0, 1) === 0 ? NursingSide.LEFT : NursingSide.RIGHT
          }
        };

      case "expressed":
        return {
          ...commonFields,
          type,
          typeMetadata: {
            amount: random(50, 200), // ml
            unit: "ml"
          }
        };

      case "formula":
        return {
          ...commonFields,
          type,
          typeMetadata: {
            amount: random(50, 200), // ml
            unit: "ml"
          }
        };

      case "supplement":
        return {
          ...commonFields,
          type,
          typeMetadata: {
            amount: random(10, 100), // arbitrary units
            unit: "ml",
            supplement:
              initialSupplementList[random(0, initialSupplementList.length - 1)]
          }
        };

      case "diaper":
        return {
          ...commonFields,
          type,
          typeMetadata: {
            status:
              random(0, 3) === 0
                ? DiaperStatus.WET
                : random(0, 3) === 1
                  ? DiaperStatus.DIRTY
                  : random(0, 3) === 2
                    ? DiaperStatus.MIXED
                    : DiaperStatus.DRY
          }
        };

      case "sleep":
        return {
          ...commonFields,
          type,
          endedAt: addHours(new Date(startedAt.getTime()), random(1, 10))
        };

      case "growth":
        return {
          ...commonFields,
          type,
          typeMetadata: {
            height: {
              value: random(40, 90), // cm
              unit: LengthUnit.CM
            },
            weight: {
              value: random(3, 15), // kg
              unit: WeightUnit.KG
            },
            head: {
              value: random(30, 50), // cm
              unit: LengthUnit.CM
            }
          }
        };

      case "milestone":
        return {
          ...commonFields,
          type,
          typeMetadata: {
            milestone:
              initialMilestoneList[random(0, initialMilestoneList.length - 1)]
          }
        };

      case "temperature":
        return {
          ...commonFields,
          type,
          typeMetadata: {
            temperature: random(35, 40), // degrees Celsius
            unit: TemperatureUnit.CELSIUS
          }
        };

      default:
        return commonFields as Item; // Fallback
    }
  });
};

export const writeFakeData = async (babyId: string, length = 10) => {
  if (!__DEV__) {
    return;
  }

  console.log(`🍉 Creating ${length} fake activities ...`);

  const items: Item[] = generateRandomItems(length);

  const baby = await database.get<BabyModel>("babies").find(babyId);

  const promises = items.map((item) => createActivity(baby, item));

  await Promise.all(promises);

  console.log(`🍉 ✅ Successfully created all items for ${baby.name}!`);
};
