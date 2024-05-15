import { EventItem, RangeTime, TimelineCalendar } from "@howljs/calendar-kit";
import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

const EventCalender = () => {
  const item = useLocalSearchParams();
  const [events, setEvents] = useState<EventItem[]>([
    {
      id: "1",
      title: "Consultant Meeting",
      start: "2024-05-09T04:00:05.313Z",
      end: "2024-05-09T06:30:00.313Z",
      color: "#A3C7D6",
    },
    {
      id: "2",
      title: "Session 2",
      start: "2024-05-12T06:00:05.313Z",
      end: "2024-05-12T07:30:00.313Z",
      color: "#B1AFFF",
    },
    {
      id: "3",
      title: "Meeting 2",
      start: "2024-05-15T01:00:05.313Z",
      end: "2024-05-15T02:30:00.313Z",
      color: "#FBCCD6",
    },
    {
      id: "4",
      title: "Meeting 3",
      start: "2024-05-10T03:00:05.313Z",
      end: "2024-05-10T04:30:00.313Z",
      color: "#59AC5A",
    },
  ]);

  useEffect(() => {
    if (item.id && item.title && item.start && item.end) {
      setEvents((prevEvents) => [
        ...prevEvents,
        {
          id: item.id as string,
          title: item.title as string,
          start: item.start as string,
          end: item.end as string,
          color: "#A3C7D6",
          description: "Hello world",
        },
      ]);
    }
  }, []);

  // const _onDragCreateEnd = (event: RangeTime) => {
  //   console.log(event);
  //   const randomId = Math.random().toString(36).slice(2, 10);
  //   const newEvent = {
  //     id: randomId,
  //     title: randomId,
  //     start: event.start,
  //     end: event.end,
  //     color: "#A3C7D6",
  //   };
  //   setEvents((prev) => [...prev, newEvent]);
  // };

  return (
    <SafeAreaView style={styles.container}>
      <TimelineCalendar
        viewMode="week"
        events={events}
        allowDragToCreate
        // onDragCreateEnd={_onDragCreateEnd}
        dragCreateInterval={120}
        dragStep={20}
        theme={{
          dragHourContainer: {
            backgroundColor: "#FFF",
            borderColor: "#001253",
          },
          dragHourText: { color: "#001253" },
          dragCreateItemBackgroundColor: "rgba(0, 18, 83, 0.2)",
        }}
      />
    </SafeAreaView>
  );
};

export default EventCalender;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
});
