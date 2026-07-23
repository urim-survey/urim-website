export type Category = { id: string; label: string };

export const CATEGORIES: Category[] = [
  { id: "development", label: "개발행위허가" },
  { id: "farmland", label: "농지전용" },
  { id: "forest", label: "산지전용" },
  { id: "solar", label: "태양광 인허가" },
  { id: "road", label: "도로점용" },
  { id: "survey", label: "현황측량" },
];

export function isValidCategory(id: string): boolean {
  return CATEGORIES.some((c) => c.id === id);
}

export function getCategoryLabel(id: string | null | undefined): string | null {
  return CATEGORIES.find((c) => c.id === id)?.label ?? null;
}
