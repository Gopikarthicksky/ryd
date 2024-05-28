import React, { useState } from "react";
import { Button, TextInput, View, StyleSheet } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Ionicons from "@expo/vector-icons/Ionicons";
import { format } from "date-fns";

const DateTime = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [timeStamp, setTimeStamp] = useState(new Date());

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = (date) => {
    const formattedTimeStamp = format(date, "dd-MM-yyyy'T'HH:mm:ss.SSS'Z'");
    setTimeStamp(formattedTimeStamp);
    console.log(timeStamp);
    setDate(
      date.toLocaleDateString("en-GB", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
    hideDatePicker();
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirmTime = (time) => {
    setTime(
      time.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    );
    hideTimePicker();
  };

  return (
    <View style={DateTimeStyles.container}>
      <View style={DateTimeStyles.dateBox}>
        <TextInput
          style={DateTimeStyles.input}
          placeholder="Date"
          value={date}
        />
        <Ionicons
          name="calendar"
          size={30}
          color="grey"
          onPress={showDatePicker}
          style={{ position: "relative", right: 40, top: 4 }}
        />
      </View>

      <View style={DateTimeStyles.timeBox}>
        <TextInput
          style={DateTimeStyles.input}
          placeholder="Time"
          value={time}
        />
        <Ionicons
          name="time"
          size={30}
          color="grey"
          onPress={showTimePicker}
          style={{ position: "relative", right: 40, top: 4 }}
        />
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmDate}
        onCancel={hideDatePicker}
      />
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleConfirmTime}
        onCancel={hideTimePicker}
      />
    </View>
  );
};

const DateTimeStyles = StyleSheet.create({
  container: {
    bottom: "15%",
  },
  input: {
    height: 40,
    width: 200,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 10,
    position: "relative",
    marginLeft: 30,
  },
  dateBox: {
    flexDirection: "row",
  },
  timeBox: {
    flexDirection: "row",
  },
});

export default DateTime;
