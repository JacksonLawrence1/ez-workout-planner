import { useContext, useState } from "react";
import { useDispatch } from "react-redux";

import { WorkoutPickerContext } from "@/hooks/contexts/WorkoutPickerContext";

import { deleteWorkout } from "@/features/workouts";
import { gotoWorkoutEdit, gotoWorkoutHistory } from "@/features/routes";

import workoutDatabase from "@/services/database/Workouts";

import { AppDispatch } from "@/app/store";
import Alert from "@/components/primitives/Alert";
import ListItem from "@/components/primitives/ListItem";
import { Delete, Edit, History } from "@/components/primitives/PopoutMenus";

import { colors } from "@/constants/colors";
import DeleteAlert from "../primitives/DeleteAlert";

interface WorkoutItemProps {
  id: number;
  name: string;
  onPress?: (id: number) => void;
  edit?: boolean; // include edit option
  del?: boolean; // include delete option
  history?: boolean; // include history option
}

export default function WorkoutItem({ id, name, onPress, edit, del, history }: WorkoutItemProps) {
  const dispatch = useDispatch<AppDispatch>();
  const pickerSettings = useContext(WorkoutPickerContext);

  const [deleteAlert, setDeleteAlert] = useState(false);
  const [pickAlert, setPickAlert] = useState(false);

  async function onDelete() {
    try {
      await workoutDatabase.deleteWorkout(id);
      dispatch(deleteWorkout(id));
    } catch {
      setDeleteAlert(true);
    }
  }

  function handleOnPress() {
    if (pickerSettings.enabled) {
      setPickAlert(true);
    } else {
      onPress && onPress(id);
    }
  }
  
  // options on the popout menu 
  const popoutMenuOptions: React.ReactNode[] = [];

  if (edit) {
    popoutMenuOptions.unshift(<Edit onPress={() => gotoWorkoutEdit(id)} />);
  }

  if (history) {
    popoutMenuOptions.unshift(<History onPress={() => gotoWorkoutHistory(id)} />);
  }

  if (del) {
    popoutMenuOptions.unshift(<Delete onPress={() => setDeleteAlert(true)} />);
  }

  return (
    <>
      <ListItem 
        label={name}
        onPress={handleOnPress}
        backgroundColor={colors.primary}
        popoutMenuOptions={{ options: popoutMenuOptions }}
      />
      {pickerSettings.enabled && <Alert // alert for picking a workout
        {...pickerSettings}
        title={name}
        visible={pickAlert} 
        setVisible={setPickAlert}
        onSubmit={() => onPress && onPress(id)}
      />}
      {del && <DeleteAlert // alert for deleting workout
        visible={deleteAlert} 
        setVisible={setDeleteAlert}
        label="Workout"
        deleteFunction={onDelete}
      />}
    </>
  );
}
