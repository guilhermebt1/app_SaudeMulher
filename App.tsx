import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Notifications from "expo-notifications";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import { Calendar, DateData, LocaleConfig } from "react-native-calendars";

import { categories, details, diaryTypes, lifeStages, medicalNotice, violentometer } from "./src/content";
import type { CategoryId, DiaryEntry, DiaryTypeId, MainStackParamList, Reminder } from "./src/types";

LocaleConfig.locales["pt-br"] = {
  monthNames: [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro"
  ],
  monthNamesShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
  dayNames: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
  dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
  today: "Hoje"
};
LocaleConfig.defaultLocale = "pt-br";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true
  })
});

const Stack = createNativeStackNavigator<MainStackParamList>();
const Tabs = createBottomTabNavigator();

function HomeScreen({ navigation }: { navigation: any }) {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.screenContent}>
        <Text style={styles.greeting}>Olá! Como você está hoje?</Text>
        <Notice />
        <View style={styles.calendarWrap}>
          <Calendar
            theme={calendarTheme}
            onDayPress={(day: DateData) => navigation.navigate("Diario", { selectedDate: day.dateString })}
          />
        </View>
        <Text style={styles.sectionTitle}>Categorias</Text>
        <View style={styles.grid}>
          {categories.map((category) => (
            <Pressable
              key={category.id}
              style={({ pressed }) => [styles.categoryCard, pressed && styles.pressed]}
              onPress={() => navigation.navigate("Detalhe", { id: category.id })}
            >
              <MaterialCommunityIcons name={category.icon as any} size={28} color="#B6405A" />
              <Text style={styles.categoryTitle}>{category.title}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function DetailScreen({ route }: { route: { params: { id: CategoryId } } }) {
  const detail = details[route.params.id];

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={[styles.screenContent, detail.banner ? styles.withFooter : null]}>
        <View style={styles.detailHeader}>
          <MaterialCommunityIcons name={detail.icon as any} size={34} color="#B6405A" />
          <Text style={styles.detailTitle}>{detail.title}</Text>
        </View>
        {detail.sections.map((section) => (
          <View key={section.title} style={styles.infoBlock}>
            <Text style={styles.infoTitle}>{section.title}</Text>
            {section.items.map((item) => (
              <Text key={item} style={styles.bullet}>
                • {item}
              </Text>
            ))}
          </View>
        ))}
        {detail.specialAlert ? <Text style={styles.alertBox}>{detail.specialAlert}</Text> : null}
        {detail.id === "violencia" ? <Violentometer /> : null}
      </ScrollView>
      {detail.banner ? <FooterNotice /> : null}
    </SafeAreaView>
  );
}

function Violentometer() {
  return (
    <View style={styles.violentometer}>
      <Text style={styles.infoTitle}>Violentometro</Text>
      {violentometer.map((item, index) => (
        <View key={item} style={[styles.violenceRow, index > 11 ? styles.violenceSevere : index > 5 ? styles.violenceWarn : null]}>
          <Text style={styles.violenceNumber}>{index + 1}</Text>
          <Text style={styles.violenceText}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

function DiaryScreen({ route }: { route?: { params?: { selectedDate?: string } } }) {
  const today = new Date().toISOString().slice(0, 10);
  const [selectedDate, setSelectedDate] = useState(route?.params?.selectedDate ?? today);
  const [entries, setEntries] = useState<Record<string, DiaryEntry[]>>({});

  const markedDates = useMemo(() => {
    return Object.fromEntries(
      Object.entries(entries).map(([date, dayEntries]) => [
        date,
        {
          selected: date === selectedDate,
          selectedColor: "#B6405A",
          marked: dayEntries.length > 0,
          dotColor: "#2D8C7A"
        }
      ])
    );
  }, [entries, selectedDate]);

  const addEntry = (type: DiaryTypeId) => {
    setEntries((current) => {
      const dayEntries = current[selectedDate] ?? [];
      const alreadyExists = dayEntries.some((entry) => entry.type === type);
      return {
        ...current,
        [selectedDate]: alreadyExists
          ? dayEntries.filter((entry) => entry.type !== type)
          : [...dayEntries, { type, createdAt: new Date().toISOString() }]
      };
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.screenContent}>
        <Text style={styles.pageTitle}>Diário / Calendário</Text>
        <View style={styles.calendarWrap}>
          <Calendar
            markedDates={{
              ...markedDates,
              [selectedDate]: { ...(markedDates[selectedDate] ?? {}), selected: true, selectedColor: "#B6405A" }
            }}
            onDayPress={(day: DateData) => setSelectedDate(day.dateString)}
            theme={calendarTheme}
          />
        </View>
        <Text style={styles.sectionTitle}>Registrar em {selectedDate}</Text>
        <View style={styles.choiceGrid}>
          {diaryTypes.map((type) => {
            const active = entries[selectedDate]?.some((entry) => entry.type === type.id);
            return (
              <Pressable key={type.id} style={[styles.choiceButton, active && styles.choiceActive]} onPress={() => addEntry(type.id)}>
                <MaterialCommunityIcons name={type.icon as any} size={24} color={active ? "#FFFFFF" : "#B6405A"} />
                <Text style={[styles.choiceText, active && styles.choiceTextActive]}>{type.label}</Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function RemindersScreen() {
  const [title, setTitle] = useState("");
  const [kind, setKind] = useState("consulta");
  const [reminders, setReminders] = useState<Reminder[]>([]);

  useEffect(() => {
    Notifications.requestPermissionsAsync();
  }, []);

  const createReminder = async () => {
    if (!title.trim()) {
      Alert.alert("Informe um titulo", "Exemplo: consulta, exame, vacina ou medicamento.");
      return;
    }

    const reminder: Reminder = {
      id: String(Date.now()),
      title: title.trim(),
      kind,
      dateLabel: "Hoje",
      notificationId: undefined
    };

    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Lembrete de cuidado",
        body: `${reminder.kind}: ${reminder.title}`
      },
      trigger: { type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL, seconds: 5 }
    });

    setReminders((current) => [{ ...reminder, notificationId }, ...current]);
    setTitle("");
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.flex}>
        <ScrollView contentContainerStyle={styles.screenContent}>
          <Text style={styles.pageTitle}>Lembretes</Text>
          <View style={styles.formBlock}>
            <Text style={styles.label}>Novo lembrete</Text>
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="Ex.: Papanicolau, vacina, medicamento"
              placeholderTextColor="#8A7D78"
              style={styles.input}
            />
            <View style={styles.segment}>
              {["consulta", "exame", "vacina", "medicamento"].map((item) => (
                <Pressable key={item} onPress={() => setKind(item)} style={[styles.segmentButton, kind === item && styles.segmentActive]}>
                  <Text style={[styles.segmentText, kind === item && styles.segmentTextActive]}>{item}</Text>
                </Pressable>
              ))}
            </View>
            <Pressable style={styles.primaryButton} onPress={createReminder}>
              <Ionicons name="notifications-outline" size={20} color="#FFFFFF" />
              <Text style={styles.primaryButtonText}>Criar lembrete</Text>
            </Pressable>
          </View>
          <Text style={styles.sectionTitle}>Ativos</Text>
          {reminders.length === 0 ? <Text style={styles.emptyText}>Nenhum lembrete ativo.</Text> : null}
          {reminders.map((reminder) => (
            <View key={reminder.id} style={styles.reminderCard}>
              <Text style={styles.reminderTitle}>{reminder.title}</Text>
              <Text style={styles.reminderMeta}>{reminder.kind} • notificação local criada</Text>
            </View>
          ))}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function ProfileScreen() {
  const [stage, setStage] = useState(lifeStages[1]);
  const [saved, setSaved] = useState(false);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.screenContent}>
        <Text style={styles.pageTitle}>Perfil / Fase da Vida</Text>
        <View style={styles.listBlock}>
          {lifeStages.map((item) => (
            <Pressable key={item} style={[styles.stageRow, stage === item && styles.stageActive]} onPress={() => setStage(item)}>
              <Text style={[styles.stageText, stage === item && styles.stageTextActive]}>{item}</Text>
              {stage === item ? <Ionicons name="checkmark-circle" size={22} color="#2D8C7A" /> : null}
            </Pressable>
          ))}
        </View>
        <Pressable style={styles.primaryButton} onPress={() => setSaved(true)}>
          <Ionicons name="save-outline" size={20} color="#FFFFFF" />
          <Text style={styles.primaryButtonText}>Salvar</Text>
        </Pressable>
        {saved ? <Text style={styles.savedText}>Fase salva: {stage}</Text> : null}
      </ScrollView>
    </SafeAreaView>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#FFF8F4" },
        headerTintColor: "#4D3130",
        headerTitleStyle: { fontWeight: "700" },
        contentStyle: { backgroundColor: "#FFF8F4" }
      }}
    >
      <Stack.Screen name="Inicio" component={HomeScreen} options={{ title: "Saúde da Mulher" }} />
      <Stack.Screen
        name="Detalhe"
        component={DetailScreen}
        options={({ route }) => ({ title: details[(route.params as { id: CategoryId }).id].title })}
      />
      <Stack.Screen name="Diario" component={DiaryScreen} options={{ title: "Diário / Calendário" }} />
    </Stack.Navigator>
  );
}

function Notice() {
  return <Text style={styles.notice}>{medicalNotice}</Text>;
}

function FooterNotice() {
  return (
    <View style={styles.footerNotice}>
      <Text style={styles.footerNoticeText}>{medicalNotice}</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Tabs.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: "#B6405A",
          tabBarInactiveTintColor: "#7B6B67",
          tabBarStyle: { backgroundColor: "#FFF8F4", borderTopColor: "#E8D8D1" },
          tabBarIcon: ({ color, size }) => {
            const iconName =
              route.name === "Home" ? "home-outline" : route.name === "Diario" ? "calendar-outline" : route.name === "Lembretes" ? "alarm-outline" : "person-outline";
            return <Ionicons name={iconName as any} color={color} size={size} />;
          }
        })}
      >
        <Tabs.Screen name="Home" component={HomeStack} options={{ title: "Início" }} />
        <Tabs.Screen name="Diario" component={DiaryScreen} options={{ title: "Diário" }} />
        <Tabs.Screen name="Lembretes" component={RemindersScreen} />
        <Tabs.Screen name="Perfil" component={ProfileScreen} />
      </Tabs.Navigator>
    </NavigationContainer>
  );
}

const calendarTheme = {
  backgroundColor: "#FFF8F4",
  calendarBackground: "#FFFFFF",
  textSectionTitleColor: "#7B6B67",
  selectedDayBackgroundColor: "#B6405A",
  selectedDayTextColor: "#FFFFFF",
  todayTextColor: "#B6405A",
  dayTextColor: "#3C3030",
  arrowColor: "#B6405A",
  monthTextColor: "#4D3130",
  textMonthFontWeight: "700" as const
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#FFF8F4"
  },
  flex: {
    flex: 1
  },
  screenContent: {
    padding: 18,
    paddingBottom: 34,
    gap: 16
  },
  withFooter: {
    paddingBottom: 118
  },
  greeting: {
    fontSize: 26,
    lineHeight: 32,
    fontWeight: "800",
    color: "#4D3130"
  },
  pageTitle: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "800",
    color: "#4D3130"
  },
  notice: {
    backgroundColor: "#FDECEE",
    borderLeftWidth: 4,
    borderLeftColor: "#B6405A",
    borderRadius: 8,
    padding: 12,
    color: "#5F393A",
    lineHeight: 20
  },
  calendarWrap: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E8D8D1"
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#4D3130"
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12
  },
  categoryCard: {
    width: "47.8%",
    minHeight: 116,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E8D8D1",
    borderRadius: 8,
    padding: 12,
    justifyContent: "space-between"
  },
  pressed: {
    opacity: 0.75
  },
  categoryTitle: {
    color: "#4D3130",
    fontSize: 15,
    lineHeight: 19,
    fontWeight: "700"
  },
  detailHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  },
  detailTitle: {
    flex: 1,
    color: "#4D3130",
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "800"
  },
  infoBlock: {
    gap: 8
  },
  infoTitle: {
    color: "#4D3130",
    fontSize: 17,
    fontWeight: "800"
  },
  bullet: {
    color: "#4D3130",
    fontSize: 15,
    lineHeight: 22
  },
  alertBox: {
    backgroundColor: "#FFF0D7",
    borderRadius: 8,
    padding: 12,
    color: "#624018",
    lineHeight: 20,
    fontWeight: "700"
  },
  footerNotice: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#FDECEE",
    borderTopWidth: 1,
    borderTopColor: "#E8D8D1",
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 18
  },
  footerNoticeText: {
    color: "#5F393A",
    fontSize: 12,
    lineHeight: 17
  },
  violentometer: {
    gap: 6
  },
  violenceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#EAF6F2"
  },
  violenceWarn: {
    backgroundColor: "#FFF0D7"
  },
  violenceSevere: {
    backgroundColor: "#FDECEE"
  },
  violenceNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    textAlign: "center",
    lineHeight: 24,
    backgroundColor: "#FFFFFF",
    color: "#4D3130",
    fontWeight: "800"
  },
  violenceText: {
    flex: 1,
    color: "#4D3130",
    lineHeight: 20
  },
  choiceGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10
  },
  choiceButton: {
    width: "48%",
    minHeight: 84,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8D8D1",
    backgroundColor: "#FFFFFF",
    padding: 12,
    justifyContent: "space-between"
  },
  choiceActive: {
    backgroundColor: "#B6405A",
    borderColor: "#B6405A"
  },
  choiceText: {
    color: "#4D3130",
    fontWeight: "700"
  },
  choiceTextActive: {
    color: "#FFFFFF"
  },
  formBlock: {
    gap: 12
  },
  label: {
    color: "#4D3130",
    fontWeight: "800"
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E8D8D1",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    minHeight: 48,
    color: "#3C3030"
  },
  segment: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8
  },
  segmentButton: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8D8D1",
    backgroundColor: "#FFFFFF"
  },
  segmentActive: {
    backgroundColor: "#2D8C7A",
    borderColor: "#2D8C7A"
  },
  segmentText: {
    color: "#4D3130",
    fontWeight: "700"
  },
  segmentTextActive: {
    color: "#FFFFFF"
  },
  primaryButton: {
    minHeight: 48,
    borderRadius: 8,
    backgroundColor: "#B6405A",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingHorizontal: 16
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontWeight: "800"
  },
  emptyText: {
    color: "#7B6B67"
  },
  reminderCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8D8D1",
    padding: 12,
    gap: 4
  },
  reminderTitle: {
    color: "#4D3130",
    fontSize: 16,
    fontWeight: "800"
  },
  reminderMeta: {
    color: "#7B6B67"
  },
  listBlock: {
    gap: 10
  },
  stageRow: {
    minHeight: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8D8D1",
    backgroundColor: "#FFFFFF"
  },
  stageActive: {
    borderColor: "#2D8C7A",
    backgroundColor: "#EAF6F2"
  },
  stageText: {
    color: "#4D3130",
    fontWeight: "700"
  },
  stageTextActive: {
    color: "#1E6659"
  },
  savedText: {
    color: "#1E6659",
    fontWeight: "700"
  }
});
