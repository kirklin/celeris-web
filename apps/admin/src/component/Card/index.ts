import { withInstall } from "@celeris/utils";
import dataCard from "./src/DataCard.vue";
import dataInsightCard from "./src/DataInsightCard.vue";

export const DataInsightCard = withInstall(dataInsightCard);
export const DataCard = withInstall(dataCard);
