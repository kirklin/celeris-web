import { request } from "@celeris/request";

// Define the API endpoint URLs as an enum
enum API {
  queryDataOverview = "/dashboard/data-overview",
  queryUserAnalysisData = "/dashboard/user-analysis-data",
}

export interface DataOverviewRes {
  xAxis: string[];
  data: Array<{ name: string; value: number[]; count: number }>;
}
export interface UserAnalysisDataRes {
  count: number;
  growth: number;
  chartData: {
    xAxis: string[];
    data: { name: string; value: number[] };
  };
}
export function queryDataOverview() {
  return request.post<DataOverviewRes>({ url: API.queryDataOverview });
}
export function queryUserAnalysisData(params: { quota: string }) {
  return request.post<UserAnalysisDataRes>({ url: API.queryUserAnalysisData, params });
}
