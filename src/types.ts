export type CategoryId =
  | "corrimento"
  | "colica"
  | "atraso"
  | "sangramento"
  | "urinar"
  | "ciclo"
  | "tpm"
  | "colo"
  | "mama"
  | "violencia"
  | "climaterio"
  | "autocuidado";

export type MainStackParamList = {
  Inicio: undefined;
  Detalhe: { id: CategoryId };
  Diario: { selectedDate?: string } | undefined;
};

export type ContentSection = {
  title: string;
  items: string[];
};

export type Category = {
  id: CategoryId;
  title: string;
  icon: string;
};

export type DetailContent = Category & {
  sections: ContentSection[];
  specialAlert?: string;
  banner?: boolean;
};

export type DiaryTypeId = "menstruacao" | "corrimento" | "colica" | "humor" | "climaterio" | "consulta";

export type DiaryEntry = {
  type: DiaryTypeId;
  createdAt: string;
};

export type Reminder = {
  id: string;
  title: string;
  kind: string;
  dateLabel: string;
  notificationId?: string;
};
