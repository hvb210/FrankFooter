import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "🌭 Home",
        }}
      />

      <Tabs.Screen
        name="log"
        options={{
          title: "➕ Log a Dog",
        }}
      />

      <Tabs.Screen
        name="history"
        options={{
          title: "⌛ History",
        }}
      />
    </Tabs>
  );
}
