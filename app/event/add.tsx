// import React, { useEffect, useState } from "react";
// import { View, TextInput, Pressable, Text } from "react-native";
// import DateTimePicker from "react-native-ui-datepicker";
// import dayjs from "dayjs";
// import { DateType } from "react-native-ui-datepicker";
// import { EventItem } from "@howljs/calendar-kit";
// import { router } from "expo-router";

// const Add = () => {
//   const [title, setTitle] = useState("");
//   const [startClicked, setStartClicked] = useState<boolean>(false);
//   const [endClicked, setEndClicked] = useState<boolean>(false);
//   const [startDate, setStartDate] = useState<DateType>();
//   const [endDate, setEndDate] = useState<DateType>();
//   const [events, setEvents] = useState<EventItem[]>([]);

//   let event: EventItem;
//   useEffect(() => {
//     console.log("start date: ", startDate);
//     console.log("end date: ", endDate);
//     if (title !== "" && startDate && endDate) {
//       event = {
//         id: String(events.length + 1),
//         start: startDate.toLocaleString(),
//         end: endDate.toLocaleString(),
//         title: title,
//       };
//       console.log("event local", event);
//       events.push(event);
//     }
//   }, [startDate, endDate, title]);

//   return (
//     <View
//       style={{
//         backgroundColor: "#FF92",
//         borderBottomColor: "#000000",
//         borderBottomWidth: 1,
//         paddingLeft: 10,
//         paddingRight: 10,
//         paddingTop: 10,
//         paddingBottom: 10,
//         height: "100%",
//       }}
//     >
//       <Text>Title</Text>
//       <TextInput
//         editable
//         onChangeText={(text) => setTitle(text)}
//         value={title}
//         style={{ padding: 10, borderWidth: 1 }}
//       />
//       <Pressable
//         style={{ backgroundColor: "#0101", borderRadius: 10, padding: 10 }}
//         onPress={() => {
//           setStartClicked(true);
//           setEndClicked(false);
//         }}
//       >
//         <Text>Start Date</Text>
//       </Pressable>
//       <Pressable
//         style={{
//           backgroundColor: "#0101",
//           borderRadius: 10,
//           padding: 10,
//           marginTop: 10,
//         }}
//         onPress={() => {
//           setStartClicked(false);
//           setEndClicked(true);
//         }}
//       >
//         <Text>End Date</Text>
//       </Pressable>
//       {startClicked || endClicked ? (
//         <View style={{ backgroundColor: "#F5FCFF" }}>
//           <DateTimePicker
//             mode="single"
//             timePicker
//             date={startClicked ? startDate : endDate}
//             onChange={(params) => {
//               if (startClicked) {
//                 setStartDate(params.date);
//               }
//               if (endClicked) {
//                 setEndDate(params.date);
//               }
//             }}
//           />
//         </View>
//       ) : null}
//       <View>
//         {(startClicked || endClicked) && (
//           <Pressable
//             onPress={() => {
//               setStartClicked(false);
//               setEndClicked(false);
//             }}
//           >
//             <Text style={{ fontSize: 20 }}>Close</Text>
//           </Pressable>
//         )}
//         <Pressable
//           onPress={() =>{}
//             // router.push({
//             //   pathname: "event/[event]",
//             //   params: event,
//             // })
//           }
//         >
//           <Text style={{ fontSize: 20 }}>Save</Text>
//         </Pressable>
//       </View>
//     </View>
//   );
// };

// export default Add;
