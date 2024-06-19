import useLoading, { SetContentStateAction } from "@/hooks/useLoading";

import LogBuilder, { LogContext } from "@/services/builders/LogBuilder";

import LogContent from "@/components/log/LogContent";
import DefaultPage from "@/components/pages/DefaultPage";
import workoutDatabase from "@/services/database/Workouts";
import { Alert } from "react-native";
import { router } from "expo-router";

type WorkoutLogProps = {
  id: number;
  inProgress?: boolean;
};

function LogLoader(log: LogBuilder) {
  return (
    <LogContext.Provider value={log}>
      <LogContent log={log} />
    </LogContext.Provider>
  );
}

export default function Log({ id, inProgress }: WorkoutLogProps) {
  const content = useLoading(loadLog);

  function loadLog(setContent: SetContentStateAction) {
    const log = new LogBuilder();

    // TODO: load an incomplete log if it exists
    if (inProgress) {
      // load incomplete log
      return;
    }

    workoutDatabase
      .getWorkout(id)
      .then((workout) => {
        if (!workout) {
          throw new Error("Workout not found");
        }

        // create a new log, with the workout as the template
        log.newWorkout(workout);
        setContent(LogLoader(log));
      })
      .catch((error) => {
        Alert.alert("Not Found", `${error}`);
        router.back();
      });
  }

  return <DefaultPage title="Workout">{content}</DefaultPage>;
}
