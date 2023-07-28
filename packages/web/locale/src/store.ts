import { computed } from "vue";
import { useLocalStorage } from "@celeris/hooks";
import { LOCALES_STORE_KEY } from "@celeris/constants";

const store = useLocalStorage(LOCALES_STORE_KEY, "en");

export function setLocale(locale: string) {
  store.value = locale;
}

export const getLocale = computed(() => store.value);
